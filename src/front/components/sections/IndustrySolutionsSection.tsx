import { Link } from "react-router-dom";
import { industrySolutions } from "../../data/industrySolutions";
import Card from "../ui/Card";
import Section from "../ui/Section";
import type { SectionProps } from "./types";

export default function IndustrySolutionsSection({ background }: SectionProps) {
  return (
    <Section id="solutions" background={background}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          業界別ソリューション
        </h2>
        <p className="text-lg text-gray-600">
          業種ごとのよくある困りごとから、業務に合わせた仕組みをつくっています
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {industrySolutions.map((solution) => (
          <Link key={solution.id} to={solution.href}>
            <Card hover className="h-full">
              <img
                src={solution.image.src}
                alt={solution.image.alt}
                className="w-full h-40 object-cover object-top rounded-md mb-4"
              />
              <p className="text-sm font-semibold text-blue-600 mb-2">
                {solution.industry}
              </p>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {solution.title}
              </h3>
              <p className="text-sm text-gray-600">{solution.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
