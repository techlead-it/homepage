import { Link, Navigate, useParams } from "react-router-dom";
import Card from "../components/ui/Card";
import Section from "../components/ui/Section";
import { cases } from "../data/cases";
import { usePageTitle } from "../hooks/usePageTitle";
import type { CaseStudy } from "../types";

function BeforeAfterFlow({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">導入前</h3>
        <ol className="space-y-3">
          {caseStudy.flowBefore.map((step) => (
            <li
              key={step}
              className="text-gray-700 bg-gray-100 rounded-md px-4 py-3"
            >
              {step}
            </li>
          ))}
        </ol>
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">導入後</h3>
        <ol className="space-y-3">
          {caseStudy.flowAfter.map((step) => (
            <li
              key={step}
              className="text-gray-700 bg-blue-50 rounded-md px-4 py-3"
            >
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function CaseDetail() {
  const { id } = useParams<{ id: string }>();
  const caseStudy = cases.find((c) => c.id === id);
  usePageTitle(caseStudy?.title ?? "事例が見つかりません");

  if (!caseStudy) {
    return <Navigate to="/cases" replace />;
  }

  return (
    <div>
      <Section background="gray">
        <div className="text-center py-8">
          <p className="text-sm font-semibold text-blue-600 mb-2">
            {caseStudy.industry}
          </p>
          <h1 className="text-3xl font-bold text-gray-900">
            {caseStudy.title}
          </h1>
        </div>
      </Section>

      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <dt className="text-sm font-semibold text-gray-500">業種</dt>
                <dd className="text-gray-900">{caseStudy.industry}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-500">規模感</dt>
                <dd className="text-gray-900">{caseStudy.scale}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-500">
                  支援範囲
                </dt>
                <dd className="text-gray-900">{caseStudy.supportScope}</dd>
              </div>
            </dl>
          </Card>

          <div className="space-y-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                導入前の課題
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {caseStudy.problem}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                支援内容
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {caseStudy.approach}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                現場の変化
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {caseStudy.outcome}
              </p>
              <div className="flex flex-wrap gap-6">
                {caseStudy.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="text-3xl font-bold text-blue-600">
                      {metric.value}
                    </p>
                    <p className="text-sm text-gray-600">{metric.label}</p>
                    {metric.note && (
                      <p className="text-xs text-gray-500">{metric.note}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <BeforeAfterFlow caseStudy={caseStudy} />
        </div>
      </Section>

      <Section background="gray">
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-4">
            同じような悩みがあれば、まずは30分無料相談から
          </p>
          <Link
            to="/contact"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            30分無料相談を申し込む
          </Link>
        </div>
      </Section>
    </div>
  );
}
