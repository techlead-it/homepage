import Card from "../components/ui/Card";
import Section from "../components/ui/Section";
import { philosophy } from "../data/philosophy";

export default function Introduction() {
  return (
    <div>
      {/* ページヘッダー */}
      <Section background="gray">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">企業理念</h1>
          <p className="text-lg text-gray-600">Our Philosophy</p>
        </div>
      </Section>

      {/* ミッション */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <Card>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ミッション
            </h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed text-lg">
              {philosophy.mission}
            </p>
          </Card>
        </div>
      </Section>

      {/* ビジョン */}
      <Section background="gray">
        <div className="max-w-4xl mx-auto">
          <Card>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">ビジョン</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed text-lg">
              {philosophy.vision}
            </p>
          </Card>
        </div>
      </Section>

      {/* バリュー */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <Card>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">バリュー</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed text-lg">
              {philosophy.values}
            </p>
          </Card>
        </div>
      </Section>

      {/* フィロソフィー */}
      <Section background="gray">
        <div className="max-w-4xl mx-auto">
          <Card>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">フィロソフィー</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed text-lg">
              {philosophy.philosophy}
            </p>
          </Card>
        </div>
      </Section>

      {/* アイデンティティ */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <Card>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              アイデンティティ
            </h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed text-lg">
              {philosophy.identity}
            </p>
          </Card>
        </div>
      </Section>
    </div>
  );
}
