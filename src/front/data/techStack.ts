import type { TechStack } from "../types";

export const techStack: TechStack[] = [
  {
    category: "フロントエンド",
    items: [
      { name: "React", proficiency: 5 },
      { name: "Next.js", proficiency: 3 },
      { name: "TypeScript", proficiency: 5 },
      { name: "Node.js", proficiency: 5 },
      { name: "Deno", proficiency: 5 },
    ],
  },
  {
    category: "バックエンド",
    items: [
      { name: "Go", proficiency: 5 },
      { name: "Rust", proficiency: 5 },
      { name: "Node.js", proficiency: 5 },
      { name: "TypeScript", proficiency: 5 },
      { name: "Deno", proficiency: 5 },
    ],
  },
  {
    category: "データベース",
    items: [
      { name: "MySQL", proficiency: 5 },
      { name: "PostgreSQL", proficiency: 4 },
      { name: "Redis", proficiency: 3 },
      { name: "MongoDB", proficiency: 3 },
      { name: "DynamoDB", proficiency: 3 },
    ],
  },
  {
    category: "CI/CD・クラウド",
    items: [
      { name: "GitHub Actions", proficiency: 5 },
      { name: "AWS", proficiency: 4 },
      { name: "Google Cloud", proficiency: 4 },
      { name: "Docker", proficiency: 5 },
      { name: "Kubernetes", proficiency: 3 },
      { name: "Terraform", proficiency: 3 },
    ],
  },
  {
    category: "AI",
    items: [
      { name: "OpenAI API", proficiency: 3 },
      { name: "RAG", proficiency: 3 },
      { name: "DeepResearch", proficiency: 3 },
    ],
  },
];
