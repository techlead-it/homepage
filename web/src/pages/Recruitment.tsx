import Card from "../components/ui/Card";
import Section from "../components/ui/Section";
import { recruitment } from "../data/recruitment";

export default function Recruitment() {
  return (
    <div>
      {/* ページヘッダー */}
      <Section background="gray">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">採用情報</h1>
          <p className="text-lg text-gray-600">Recruitment</p>
        </div>
      </Section>

      {/* 採用情報 */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <Card>
            <div className="space-y-6">
              <p className="text-gray-700 whitespace-pre-line leading-relaxed text-lg">
                {recruitment.description}
              </p>
              <div className="mt-8">
                <a
                  href={`mailto:${recruitment.email}`}
                  className="inline-block bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md text-lg font-medium transition-colors"
                >
                  {recruitment.email}
                </a>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
}
