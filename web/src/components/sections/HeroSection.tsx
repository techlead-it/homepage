import Section from "../ui/Section";
import type { SectionProps } from "./types";

export default function HeroSection({ background }: SectionProps) {
  return (
    <Section background={background}>
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          技術で"思い"を形にする
          <br />
          システム開発
        </h1>
        <p className="text-2xl text-gray-600">利益より誠実、声より本質</p>
        <p className="text-2xl text-gray-600">顧客の未来をともに作る</p>
      </div>
    </Section>
  );
}
