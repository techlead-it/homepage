import { strengths } from "../../data/strengths";
import Card from "../ui/Card";
import Section from "../ui/Section";
import type { SectionProps } from "./types";

export default function StrengthsSection({ background }: SectionProps) {
  return (
    <Section background={background}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">私たちの強み</h2>
        <p className="text-lg text-gray-600">テックリードが選ばれる4つの理由</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {strengths.map((strength) => (
          <Card key={strength.id}>
            <div className="flex items-start">
              <div className="text-4xl mr-4">{strength.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {strength.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {strength.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
