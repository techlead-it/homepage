import { contactSchema } from "@homepage/shared/schemas";
import type {
  ContactErrorResponse,
  ContactFormData,
} from "@homepage/shared/types";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Section from "../components/ui/Section";

export default function Contact() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: valibotResolver(contactSchema),
    mode: "onBlur",
  });

  const onSubmit = useCallback(
    async (data: ContactFormData) => {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;
        if (!endpoint) {
          throw new Error("Contact form endpoint is not configured");
        }

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          try {
            const errorData = (await response.json()) as ContactErrorResponse;
            if ("errors" in errorData) {
              // Multiple field errors
              let hasErrors = false;
              for (const [field, message] of Object.entries(errorData.errors)) {
                if (field in data) {
                  setError(field as keyof ContactFormData, {
                    type: "server",
                    message,
                  });
                  hasErrors = true;
                }
              }
              if (hasErrors) {
                return;
              }
            } else if ("error" in errorData) {
              // Single error message
              throw new Error(errorData.error);
            }
          } catch (error) {
            // If error is already thrown from above, re-throw it
            if (error instanceof Error) {
              throw error;
            }
            // JSON parse error - use default message
          }
          throw new Error("送信に失敗しました");
        }

        navigate("/contact/thanks");
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Form submission error:", error);
        setSubmitError(
          error instanceof Error
            ? error.message
            : "送信中にエラーが発生しました。しばらく経ってから再度お試しください。"
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [navigate, setError]
  );

  return (
    <div>
      <Section background="gray">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            お問い合わせ
          </h1>
          <p className="text-lg text-gray-600">Contact Us</p>
        </div>
      </Section>

      <Section background="white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-gray-600 leading-relaxed">
              ご相談・お見積りは無料です。お気軽にお問い合わせください。
              <br />
              通常、2営業日以内にご返信いたします。
            </p>
          </div>

          <Card>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {submitError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600 text-sm">{submitError}</p>
                </div>
              )}

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  会社名・団体名
                </label>
                <input
                  type="text"
                  id="company"
                  {...register("company")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  お問い合わせ種別 <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  {...register("subject")}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.subject ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">選択してください</option>
                  <option value="サービスについて">サービスについて</option>
                  <option value="お見積り依頼">お見積り依頼</option>
                  <option value="採用について">採用について</option>
                  <option value="その他">その他</option>
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  お問い合わせ内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={6}
                  {...register("message")}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 font-semibold rounded-md transition-colors ${
                    isSubmitting
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? "送信中..." : "送信する"}
                </button>
              </div>
            </form>
          </Card>
        </div>
      </Section>
    </div>
  );
}
