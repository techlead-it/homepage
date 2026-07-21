import { recruitment } from "../../data/recruitment";
import Card from "../ui/Card";
import Section from "../ui/Section";
import type { SectionProps } from "./types";

export default function RecruitmentSection({ background }: SectionProps) {
  return (
    <Section background={background}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">採用情報</h2>
      </div>
      <div className="max-w-2xl mx-auto">
        <Card>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed mb-4">
            {recruitment.description}
          </p>
          <p className="text-gray-900 font-semibold">{recruitment.email}</p>
        </Card>
      </div>
    </Section>
  );
}
