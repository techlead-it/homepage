import CtaSection from "../components/sections/CtaSection";
import HeroSection from "../components/sections/HeroSection";
import NewsSection from "../components/sections/NewsSection";
import ProcessSection from "../components/sections/ProcessSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import ServicesSection from "../components/sections/ServicesSection";
import StrengthsSection from "../components/sections/StrengthsSection";
import TechStackSection from "../components/sections/TechStackSection";

const sections = [
  { name: "hero", Component: HeroSection },
  { name: "news", Component: NewsSection },
  { name: "services", Component: ServicesSection },
  { name: "projects", Component: ProjectsSection },
  { name: "strengths", Component: StrengthsSection },
  { name: "process", Component: ProcessSection },
  { name: "techstack", Component: TechStackSection },
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
