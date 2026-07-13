type NewsCategory = "announcement" | "tech-blog";

export interface OgpCardProps {
  title: string;
  summary?: string;
  category: NewsCategory;
  date: string;
  logoSrc: string;
}

function getCategoryLabel(category: NewsCategory): string {
  return category === "announcement" ? "お知らせ" : "技術ブログ";
}

function getCategoryStyle(category: NewsCategory): {
  backgroundColor: string;
  color: string;
} {
  return category === "announcement"
    ? { backgroundColor: "#dbeafe", color: "#1e40af" }
    : { backgroundColor: "#dcfce7", color: "#166534" };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function OgpCard({
  title,
  summary,
  category,
  date,
  logoSrc,
}: OgpCardProps) {
  const categoryStyle = getCategoryStyle(category);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8fafc",
        padding: "40px",
        fontFamily: "Noto Sans JP",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          padding: "48px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
            height: "48px",
          }}
        >
          <img
            src={logoSrc}
            width={48}
            height={48}
            style={{
              marginRight: "16px",
              borderRadius: "8px",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: "24px",
              color: "#64748b",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            株式会社テックリード
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "8px 16px",
              backgroundColor: categoryStyle.backgroundColor,
              color: categoryStyle.color,
              borderRadius: "20px",
              fontSize: "18px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {getCategoryLabel(category)}
          </div>
          <span
            style={{
              fontSize: "18px",
              color: "#94a3b8",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {formatDate(date)}
          </span>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              fontWeight: 700,
              lineHeight: 1.3,
              color: "#1e293b",
              margin: 0,
              textOverflow: "ellipsis",
              lineClamp: 3,
            }}
          >
            {title}
          </h1>
          {summary && (
            <p
              style={{
                fontSize: "24px",
                lineHeight: 1.5,
                color: "#64748b",
                marginTop: "16px",
                textOverflow: "ellipsis",
                lineClamp: 2,
              }}
            >
              {summary}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
