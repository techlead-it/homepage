import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Section from "../components/ui/Section";
import { cases } from "../data/cases";

export default function Cases() {
  return (
    <div>
      <Section background="gray">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">導入事例</h1>
          <p className="text-lg text-gray-600">
            業種を問わず、現場の課題に寄り添ってきました
          </p>
        </div>
      </Section>

      <Section background="white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((caseStudy) => (
            <Link key={caseStudy.id} to={`/cases/${caseStudy.id}`}>
              <Card hover className="h-full">
                <p className="text-sm font-semibold text-blue-600 mb-2">
                  {caseStudy.industry}
                </p>
                <p className="text-xs text-gray-500 mb-4">{caseStudy.scale}</p>
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  {caseStudy.title}
                </h2>
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
    </div>
  );
}
