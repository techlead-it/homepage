import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import Section from "../components/ui/Section";
import { getNewsArticleById } from "../data/news";
import type { NewsCategory } from "../types";

/**
 * カテゴリーラベルを日本語で返す
 */
const getCategoryLabel = (category: NewsCategory): string => {
  switch (category) {
    case "announcement":
      return "お知らせ";
    case "tech-blog":
      return "技術ブログ";
  }
};

/**
 * カテゴリーバッジのスタイルを返す
 */
const getCategoryStyle = (category: NewsCategory): string => {
  switch (category) {
    case "announcement":
      return "bg-blue-100 text-blue-800";
    case "tech-blog":
      return "bg-green-100 text-green-800";
  }
};

/**
 * 日付をフォーマット（YYYY-MM-DD → YYYY年MM月DD日）
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const article = id ? getNewsArticleById(id) : undefined;

  if (!article) {
    return (
      <Section background="white">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">記事が見つかりません</h1>
          <p className="text-gray-600 mb-8">
            お探しの記事は存在しないか、削除された可能性があります。
          </p>
        </div>
      </Section>
    );
  }

  return (
    <>
      {/* 記事ヘッダー */}
      <Section background="white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryStyle(article.category)}`}
              >
                {getCategoryLabel(article.category)}
              </span>
              <time className="text-sm text-gray-500">
                {formatDate(article.date)}
              </time>
            </div>
          </div>

          {/* Markdown本文 */}
          <article className="prose max-w-none">
            <ReactMarkdown rehypePlugins={[rehypeHighlight, remarkGfm]}>
              {article.content}
            </ReactMarkdown>
          </article>
        </div>
      </Section>
    </>
  );
}
