import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Section from "../components/ui/Section";
import { newsArticles } from "../data/news";
import type { NewsCategory } from "../types";

const categoryLabels: Record<NewsCategory, string> = {
  announcement: "お知らせ",
  "tech-blog": "技術ブログ",
};

const categoryStyles: Record<NewsCategory, string> = {
  announcement: "bg-blue-100 text-blue-800",
  "tech-blog": "bg-green-100 text-green-800",
};

/**
 * カテゴリーラベルを日本語で返す
 */
const getCategoryLabel = (category: NewsCategory): string =>
  categoryLabels[category];

/**
 * カテゴリーバッジのスタイルを返す
 */
const getCategoryStyle = (category: NewsCategory): string =>
  categoryStyles[category];

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

export default function News() {
  return (
    <>
      {/* ヒーローセクション */}
      <Section background="gray">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ニュース</h1>
          <p className="text-lg md:text-xl text-gray-600">
            株式会社テックリードの最新情報をお届けします
          </p>
        </div>
      </Section>

      {/* ニュース一覧セクション */}
      <Section background="white">
        <div className="space-y-6">
          {newsArticles.length === 0 ? (
            <p className="text-center text-gray-600">
              現在、お知らせはありません。
            </p>
          ) : (
            newsArticles.map((article) => (
              <Link
                key={article.id}
                to={`/news/${article.id}`}
                className="block"
              >
                <Card hover>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryStyle(article.category)}`}
                        >
                          {getCategoryLabel(article.category)}
                        </span>
                        <time className="text-sm text-gray-500">
                          {formatDate(article.date)}
                        </time>
                      </div>
                      <h2 className="text-xl font-bold mb-2 text-gray-900 hover:text-blue-600 transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-gray-600 line-clamp-2">
                        {article.summary}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center text-blue-600 font-medium">
                        詳しく見る
                        <svg
                          className="w-5 h-5 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <title>詳細を見る</title>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </Section>
    </>
  );
}
