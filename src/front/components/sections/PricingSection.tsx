import { pricing } from "../../data/pricing";
import Card from "../ui/Card";
import Section from "../ui/Section";
import type { SectionProps } from "./types";

export default function PricingSection({ background }: SectionProps) {
  return (
    <Section id="pricing" background={background}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">料金の目安</h2>
        <p className="text-lg text-gray-600">
          状況に合わせて3段階から。まずはご相談ください。
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {pricing.map((tier) => (
          <Card key={tier.name}>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {tier.name}
            </h3>
            <p className="text-lg font-semibold text-blue-600 mb-4">
              {tier.priceRange}
            </p>
            <p className="text-sm text-gray-600">{tier.description}</p>
          </Card>
        ))}
      </div>
      <p className="text-xs text-gray-500 text-center mt-8">
        ※ 金額はあくまで目安です。ご要望・要件の範囲により変動します。
      </p>
    </Section>
  );
}
