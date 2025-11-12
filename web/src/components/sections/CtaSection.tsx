import Button from "../ui/Button";
import Section from "../ui/Section";
import type { SectionProps } from "./types";

export default function CtaSection({ background }: SectionProps) {
  return (
    <Section background={background}>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          まずはお気軽にご相談ください
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          無料相談・簡易見積りを承っております
        </p>
        <Button to="/contact" size="lg">
          お問い合わせはこちら
        </Button>
      </div>
    </Section>
  );
}
