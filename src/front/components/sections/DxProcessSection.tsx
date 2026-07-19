import { dxProcess } from "../../data/dxProcess";
import Card from "../ui/Card";
import Section from "../ui/Section";
import type { SectionProps } from "./types";

export default function DxProcessSection({ background }: SectionProps) {
  return (
    <Section id="process" background={background}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          現場DXを、段階的に定着させる
        </h2>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {dxProcess.map((step, index) => (
          <Card key={step.step}>
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-3">
              {index + 1}
            </div>
            <p className="text-xs text-gray-500 mb-1">{step.step}</p>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600">{step.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
