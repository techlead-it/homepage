import type { SlideCategory } from "../types";

// 会社紹介資料（スライド）のカテゴリ一覧。
// 実体は public/slides/ 配下に静的 HTML として配置し、ここに手動で登録する。
export const slideCategories: SlideCategory[] = [
  {
    id: "company",
    name: "会社紹介",
    description: "会社の取り組みや実績を紹介する資料です",
    docs: [
      {
        id: "dx",
        title: "作って終わりにしない。現場に根付くDXを、一緒に。",
        description: "DXで、日本の競争力を底上げする",
        path: "/slides/dx.html",
      },
    ],
  },
  {
    id: "ai-training",
    name: "AI研修",
    description: "AI活用・Claude Code研修の資料です",
    docs: [
      {
        id: "sales",
        title: "営業向け AI 研修",
        description:
          "AIの現在地から要件ヒアリングの実践までを扱う営業担当者向け研修スライド",
        path: "/slides/sales/index.html",
      },
      {
        id: "claude-code-beginner",
        title: "Claude Code 研修 初級",
        description:
          "AIコーディングエージェントの基本ワークフローを半日で。機能追加から本番デプロイまでを一人で回せるように。",
        path: "/slides/claude-code/beginner/index.html",
      },
      {
        id: "claude-code-intermediate",
        title: "Claude Code 研修 中級",
        description:
          "Subagent・Skill・Hook・MCPを自作し、チームで再利用できる仕組みを作る半日ハンズオン。",
        path: "/slides/claude-code/intermediate/index.html",
      },
      {
        id: "claude-code-advanced",
        title: "Claude Code 研修 上級",
        description:
          "検証器・権限・停止条件をプロジェクトのハーネスとして統合設計する半日ハンズオン。",
        path: "/slides/claude-code/advanced/index.html",
      },
    ],
  },
];

export const getSlideCategoryById = (id: string): SlideCategory | undefined => {
  return slideCategories.find((category) => category.id === id);
};
