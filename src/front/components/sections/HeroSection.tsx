import { Link } from "react-router-dom";
import { HeroIllustration } from "../icons/HeroIllustration";
import Section from "../ui/Section";
import type { SectionProps } from "./types";

export default function HeroSection({ background }: SectionProps) {
  return (
    <Section background={background}>
      <div className="py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            作って終わりにしない。現場に根付くDXを、一緒に。
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            紙とExcel、属人化した業務プロセス。
          </p>
          <p className="text-xl text-gray-600 mb-4">
            現場の"当たり前"を、一緒に変えていきます。
          </p>
          <p className="text-lg text-gray-500 mb-8">
            業種を問わずご相談ください
          </p>
          <Link
            to="/contact"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            30分無料相談を申し込む
          </Link>
        </div>
        <HeroIllustration
          role="img"
          aria-label="紙とExcelに頼った現場が、デジタルで定着する現場に変わるイメージ図"
          className="w-full h-auto max-w-md mx-auto text-blue-600"
        />
      </div>
    </Section>
  );
}
