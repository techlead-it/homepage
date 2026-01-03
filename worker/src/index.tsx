import { contactSchema } from "@homepage/shared/schemas";
import { vValidator } from "@hono/valibot-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { renderToStaticMarkup } from "react-dom/server";
import { Resend } from "resend";
import { ContactNotification } from "../emails/contact-notification";

interface Bindings {
  RESEND_API_KEY: string;
  TO_EMAIL: string;
  ALLOWED_ORIGIN: string;
  WORKER_ENV?: string;
}

const app = new Hono<{ Bindings: Bindings }>();

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
  if ("development" !== c.env.WORKER_ENV) {
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

app.post(
  "/api/contact",
  vValidator("json", contactSchema, (result, c) => {
    if (!result.success) {
      const errors: { [key: string]: string } = {};
      for (const issue of result.issues) {
        const path = issue.path
          // biome-ignore lint/suspicious/noExplicitAny: Valibot path types are complex
          ?.map((p: any) => p.key)
          .filter(Boolean)
          .join(".");
        if (path && issue.message) {
          errors[path] = issue.message;
        }
      }
      return c.json({ errors }, 400);
    }
  }),
  async (c) => {
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
        // eslint-disable-next-line no-console
        console.error("Resend error:", error);
        return c.json({ error: "Failed to send email" }, 500);
      }

      return c.json({ success: true, messageId: data?.id }, 200);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Server error:", error);
      return c.json({ error: "Internal server error" }, 500);
    }
  }
);

export default app;
