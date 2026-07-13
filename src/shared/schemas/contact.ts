import * as v from "valibot";

export const contactSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, "お名前を入力してください")),
  email: v.pipe(
    v.string(),
    v.minLength(1, "メールアドレスを入力してください"),
    v.email("有効なメールアドレスを入力してください")
  ),
  company: v.optional(v.string()),
  subject: v.pipe(
    v.string(),
    v.minLength(1, "お問い合わせ種別を選択してください")
  ),
  message: v.pipe(
    v.string(),
    v.minLength(10, "お問い合わせ内容は10文字以上で入力してください")
  ),
});
