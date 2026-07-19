import { services } from "../../data/services";
import Card from "../ui/Card";
import Section from "../ui/Section";
import type { SectionProps } from "./types";

export default function ServicesSection({ background }: SectionProps) {
  return (
    <Section id="services" background={background}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          支援できること
        </h2>
        <p className="text-lg text-gray-600">
          現場の課題整理から、定着・横展開まで一緒に伴走します
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <Card key={service.id} hover>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {service.title}
            </h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <ul className="text-sm text-gray-500 space-y-1">
              {service.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}
