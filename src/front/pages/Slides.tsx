import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Section from "../components/ui/Section";
import { slideCategories as defaultCategories } from "../data/slides";
import type { SlideCategory } from "../types";

interface SlidesProps {
  categories?: SlideCategory[];
}

export default function Slides({
  categories = defaultCategories,
}: SlidesProps) {
  return (
    <>
      {/* ヒーローセクション */}
      <Section background="gray">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">資料</h1>
          <p className="text-lg md:text-xl text-gray-600">
            カテゴリごとの資料をご覧いただけます
          </p>
        </div>
      </Section>

      {/* カテゴリ一覧セクション */}
      <Section background="white">
        {0 === categories.length ? (
          <p className="text-center text-gray-600">
            現在、公開中の資料はありません。
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/slides/${category.id}`}
                className="block h-full"
              >
                <Card hover className="h-full">
                  <h2 className="text-xl font-bold mb-2 text-gray-900 hover:text-blue-600 transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-gray-600">{category.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
