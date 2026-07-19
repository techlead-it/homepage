import CaseSummarySection from "../components/sections/CaseSummarySection";
import CtaSection from "../components/sections/CtaSection";
import DxProcessSection from "../components/sections/DxProcessSection";
import HeroSection from "../components/sections/HeroSection";
import PainPointSection from "../components/sections/PainPointSection";
import PricingSection from "../components/sections/PricingSection";
import ServicesSection from "../components/sections/ServicesSection";
import StrengthsSection from "../components/sections/StrengthsSection";

const sections = [
  { name: "hero", Component: HeroSection },
  { name: "painpoint", Component: PainPointSection },
  { name: "services", Component: ServicesSection },
  { name: "cases", Component: CaseSummarySection },
  { name: "process", Component: DxProcessSection },
  { name: "pricing", Component: PricingSection },
  { name: "strengths", Component: StrengthsSection },
  { name: "cta", Component: CtaSection },
];

export default function Home() {
  return (
    <div>
      {sections.map((section, index) => {
        const { name, Component } = section;
        const background = index % 2 === 0 ? "gray" : "white";
        return <Component key={name} background={background} />;
      })}
    </div>
  );
}
