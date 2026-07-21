import Button from "../ui/Button";
import Section from "../ui/Section";
import type { SectionProps } from "./types";

export default function CtaSection({ background }: SectionProps) {
  return (
    <Section background={background}>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          まずは30分、無料相談から
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          準備は不要です。現状の悩みを話すだけで大丈夫です。
        </p>
        <Button to="/contact" size="lg">
          30分無料相談を申し込む
        </Button>
      </div>
    </Section>
  );
}
