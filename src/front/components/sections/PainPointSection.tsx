import { painPoints } from "../../data/painPoints";
import Card from "../ui/Card";
import Section from "../ui/Section";
import type { SectionProps } from "./types";

export default function PainPointSection({ background }: SectionProps) {
  return (
    <Section background={background}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          こんな悩み、思い当たりませんか?
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {painPoints.map((painPoint) => {
          const Icon = painPoint.icon;
          return (
            <Card key={painPoint.title}>
              <Icon
                className="w-10 h-10 text-blue-600 mb-3"
                aria-hidden="true"
              />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {painPoint.title}
              </h3>
              <p className="text-gray-600">{painPoint.description}</p>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
