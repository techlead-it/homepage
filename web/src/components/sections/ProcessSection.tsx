import { processSteps } from "../../data/processSteps";
import Card from "../ui/Card";
import Section from "../ui/Section";
import type { SectionProps } from "./types";

export default function ProcessSection({ background }: SectionProps) {
  return (
    <Section background={background}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">開発プロセス</h2>
      </div>
      <div className="max-w-4xl mx-auto space-y-6">
        {processSteps.map((step, index) => (
          <Card key={step.id}>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-3">{step.description}</p>
                {step.deliverables && 0 < step.deliverables.length && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      成果物:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {step.deliverables.map((deliverable) => (
                        <span
                          key={deliverable}
                          className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                        >
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
