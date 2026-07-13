import Card from "../components/ui/Card";
import Section from "../components/ui/Section";
import { slides as defaultSlides } from "../data/slides";
import type { Slide } from "../types";

interface SlidesProps {
  slides?: Slide[];
}

/**
 * 文脈（context）ごとにスライドをグルーピングする。
 * 挿入順を保持するため Map を使う。
 */
const groupByContext = (slides: Slide[]): Map<string, Slide[]> => {
  const groups = new Map<string, Slide[]>();
  for (const slide of slides) {
    const group = groups.get(slide.context) ?? [];
    group.push(slide);
    groups.set(slide.context, group);
  }
  return groups;
};

export default function Slides({ slides = defaultSlides }: SlidesProps) {
  const groups = groupByContext(slides);

  return (
    <>
      {/* ヒーローセクション */}
      <Section background="gray">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">会社紹介資料</h1>
          <p className="text-lg md:text-xl text-gray-600">
            業界・課題ごとの会社紹介資料をご覧いただけます
          </p>
        </div>
      </Section>

      {/* 資料一覧セクション */}
      <Section background="white">
        {0 === slides.length ? (
          <p className="text-center text-gray-600">
            現在、公開中の資料はありません。
          </p>
        ) : (
          <div className="space-y-12">
            {[...groups.entries()].map(([context, contextSlides]) => (
              <section key={context} role="group" aria-label={context}>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  {context}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contextSlides.map((slide) => (
                    <a
                      key={slide.id}
                      href={`/slides/${slide.id}.html`}
                      className="block"
                    >
                      <Card hover>
                        <h3 className="text-xl font-bold mb-2 text-gray-900 hover:text-blue-600 transition-colors">
                          {slide.title}
                        </h3>
                        <p className="text-gray-600">{slide.description}</p>
                      </Card>
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
