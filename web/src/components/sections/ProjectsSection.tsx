import { projects } from "../../data/projects";
import Card from "../ui/Card";
import Section from "../ui/Section";
import type { SectionProps } from "./types";

export default function ProjectsSection({ background }: SectionProps) {
  return (
    <Section background={background}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">実績紹介</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} hover>
            <div className="mb-3 flex flex-wrap gap-2">
              {project.category.map((cat) => (
                <span
                  key={cat}
                  className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
