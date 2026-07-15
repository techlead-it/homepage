import { Navigate, useParams } from "react-router-dom";
import Card from "../components/ui/Card";
import Section from "../components/ui/Section";
import { slideCategories as defaultCategories } from "../data/slides";
import type { SlideCategory as SlideCategoryType } from "../types";

interface SlideCategoryProps {
  categories?: SlideCategoryType[];
}

export default function SlideCategory({
  categories = defaultCategories,
}: SlideCategoryProps) {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    return <Navigate to="/slides" replace />;
  }

  return (
    <>
      {/* ヒーローセクション */}
      <Section background="gray">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {category.name}
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            {category.description}
          </p>
        </div>
      </Section>

      {/* 資料一覧セクション */}
      <Section background="white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.docs.map((doc) => (
            <a key={doc.id} href={doc.path} className="block">
              <Card hover>
                <h2 className="text-xl font-bold mb-2 text-gray-900 hover:text-blue-600 transition-colors">
                  {doc.title}
                </h2>
                <p className="text-gray-600">{doc.description}</p>
              </Card>
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
