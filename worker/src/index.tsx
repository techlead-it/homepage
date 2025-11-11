import { vValidator } from "@hono/valibot-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { renderToStaticMarkup } from "react-dom/server";
import { Resend } from "resend";
import * as v from "valibot";
import { ContactNotification } from "../emails/contact-notification";

type Bindings = {
	RESEND_API_KEY: string;
	TO_EMAIL: string;
	ALLOWED_ORIGIN: string;
	WORKER_ENV?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

const contactSchema = v.object({
	name: v.pipe(v.string(), v.minLength(1, "お名前を入力してください")),
	email: v.pipe(v.string(), v.email("有効なメールアドレスを入力してください")),
	company: v.optional(v.string()),
	subject: v.pipe(
		v.string(),
		v.minLength(1, "お問い合わせ種別を選択してください"),
	),
	message: v.pipe(
		v.string(),
		v.minLength(10, "お問い合わせ内容は10文字以上で入力してください"),
	),
});

app.use("/api/*", async (c, next) => {
	const corsMiddleware = cors({
		origin: c.env.ALLOWED_ORIGIN || "http://localhost:5173",
		allowMethods: ["POST", "OPTIONS"],
		allowHeaders: ["Content-Type"],
	});
	return corsMiddleware(c, next);
});

app.get("/", (c) => {
	return c.text("Contact Form Worker is running");
});

app.get("/preview/contact", (c) => {
	if (c.env.WORKER_ENV !== "development") {
		return c.text("Not Found", 404);
	}

	const sampleData = {
		name: "山田太郎",
		email: "taro.yamada@example.com",
		company: "株式会社サンプル",
		subject: "サービスについてのお問い合わせ",
		message:
			"お世話になっております。\n\n貴社のサービスについて詳しくお聞きしたく、ご連絡いたしました。\n特に以下の点について教えていただけますでしょうか。\n\n・料金体系について\n・導入までの期間\n・サポート体制\n\nお手数ですが、ご回答いただけますと幸いです。\nよろしくお願いいたします。",
	};

	const html = renderToStaticMarkup(<ContactNotification {...sampleData} />);
	return c.html(html);
});

app.post("/api/contact", vValidator("json", contactSchema), async (c) => {
	try {
		const formData = c.req.valid("json");

		const resend = new Resend(c.env.RESEND_API_KEY);

		const { data, error } = await resend.emails.send({
			from: "onboarding@resend.dev",
			to: c.env.TO_EMAIL,
			subject: `【お問い合わせ】${formData.subject}`,
			react: (
				<ContactNotification
					name={formData.name}
					email={formData.email}
					company={formData.company}
					subject={formData.subject}
					message={formData.message}
				/>
			),
		});

		if (error) {
			console.error("Resend error:", error);
			return c.json({ error: "Failed to send email" }, 500);
		}

		return c.json({ success: true, messageId: data?.id }, 200);
	} catch (error) {
		console.error("Server error:", error);
		return c.json({ error: "Internal server error" }, 500);
	}
});

export default app;
