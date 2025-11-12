import Section from "../ui/Section";
import type { SectionProps } from "./types";

export default function HeroSection({ background }: SectionProps) {
  return (
    <Section background={background}>
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          利益より誠実、声より本質
          <br />
          顧客の未来をともに作る
        </h1>
      </div>
    </Section>
  );
}
