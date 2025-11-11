export interface ContactNotificationProps {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

interface FieldSectionProps {
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
}

function FieldSection({ title, children, isLast = false }: FieldSectionProps) {
  return (
    <div
      style={{
        marginBottom: isLast ? "0" : "32px",
        paddingBottom: isLast ? "0" : "24px",
        borderBottom: isLast ? "none" : "1px solid #e5e7eb",
      }}
    >
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "600",
          color: "#374151",
          marginBottom: isLast ? "12px" : "8px",
          marginTop: "0",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

export function ContactNotification({
  name,
  email,
  company,
  subject,
  message,
}: ContactNotificationProps) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          lineHeight: "1.7",
          color: "#1f2937",
          backgroundColor: "#f3f4f6",
          margin: "0",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "40px 30px" }}>
            <FieldSection title="お名前">
              <p
                style={{
                  margin: "0",
                  fontSize: "16px",
                  color: "#1f2937",
                  fontWeight: "500",
                }}
              >
                {name}
              </p>
            </FieldSection>

            <FieldSection title="メールアドレス">
              <p style={{ margin: "0", fontSize: "16px" }}>
                <a
                  href={`mailto:${email}`}
                  style={{
                    color: "#3b82f6",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                >
                  {email}
                </a>
              </p>
            </FieldSection>

            {company && (
              <FieldSection title="会社名">
                <p
                  style={{
                    margin: "0",
                    fontSize: "16px",
                    color: "#1f2937",
                    fontWeight: "500",
                  }}
                >
                  {company}
                </p>
              </FieldSection>
            )}

            <FieldSection title="お問い合わせ種別">
              <p
                style={{
                  margin: "0",
                  fontSize: "16px",
                  color: "#1f2937",
                  fontWeight: "500",
                }}
              >
                {subject}
              </p>
            </FieldSection>

            <FieldSection title="お問い合わせ内容" isLast>
              <div
                style={{
                  backgroundColor: "#f9fafb",
                  padding: "20px",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  whiteSpace: "pre-wrap",
                  fontSize: "15px",
                  color: "#374151",
                  lineHeight: "1.8",
                }}
              >
                {message}
              </div>
            </FieldSection>
          </div>

          <div
            style={{
              backgroundColor: "#f9fafb",
              padding: "20px 30px",
              textAlign: "center",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <p
              style={{
                margin: "0",
                fontSize: "13px",
                color: "#6b7280",
              }}
            >
              このメールはお問い合わせフォームから自動送信されました
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
