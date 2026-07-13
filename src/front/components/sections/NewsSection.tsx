import { Link } from "react-router-dom";
import { getLatestNews } from "../../data/news";
import type { NewsCategory } from "../../types";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Section from "../ui/Section";
import type { SectionProps } from "./types";

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

export default function NewsSection({ background }: SectionProps) {
  return (
    <Section background={background}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">お知らせ</h2>
        </div>
        <div className="space-y-4">
          {getLatestNews(3).map((article) => (
            <Link key={article.id} to={`/news/${article.id}`} className="block">
              <Card hover>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <time className="text-sm text-gray-500">
                        {new Date(article.date).toLocaleDateString("ja-JP", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                        {getCategoryLabel(article.category)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center text-blue-600 font-medium text-sm">
                      詳しく見る
                      <svg
                        className="w-4 h-4 ml-1"
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
          ))}
        </div>
        <div className="text-center mt-8">
          <Button to="/news" variant="outline">
            すべてのお知らせを見る
          </Button>
        </div>
      </div>
    </Section>
  );
}
