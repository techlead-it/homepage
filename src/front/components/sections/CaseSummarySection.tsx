import { Link } from "react-router-dom";
import { cases } from "../../data/cases";
import Card from "../ui/Card";
import Section from "../ui/Section";
import type { SectionProps } from "./types";

export default function CaseSummarySection({ background }: SectionProps) {
  return (
    <Section background={background}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">導入事例</h2>
        <p className="text-lg text-gray-600">
          業種を問わず、現場の課題に寄り添ってきました
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cases.map((caseStudy) => (
          <Link key={caseStudy.id} to={`/cases/${caseStudy.id}`}>
            <Card hover className="h-full">
              <p className="text-sm font-semibold text-blue-600 mb-2">
                {caseStudy.industry}
              </p>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {caseStudy.title}
              </h3>
              {caseStudy.metrics.map((metric) => (
                <div key={metric.label} className="mt-2">
                  <p className="text-2xl font-bold text-blue-600">
                    {metric.value}
                  </p>
                  <p className="text-xs text-gray-500">{metric.label}</p>
                </div>
              ))}
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
