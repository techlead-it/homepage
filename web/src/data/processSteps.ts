import type { ProcessStep } from "../types";

export const processSteps: ProcessStep[] = [
  {
    id: "vision",
    title: "ビジョン策定",
    description:
      "顧客と共にプロダクトの理想の姿を描き、ビジネス価値と成功指標を明確にします。本質的な課題を見極めます。",
    deliverables: ["プロダクトビジョン", "成功指標定義", "初期見積り"],
  },
  {
    id: "backlog",
    title: "バックログ作成",
    description:
      "実現したい機能をユーザーストーリーとして整理し、ビジネス価値に基づいて優先順位を付けます。",
    deliverables: [
      "プロダクトバックログ",
      "ユーザーストーリー",
      "優先順位マップ",
    ],
  },
  {
    id: "sprint-planning",
    title: "スプリント計画",
    description:
      "1〜2週間のスプリントで実現する機能を選定し、開発タスクに分解します。実現可能なゴールを設定します。",
    deliverables: ["スプリントバックログ", "タスク分解", "スプリントゴール"],
  },
  {
    id: "development",
    title: "開発・テスト",
    description:
      "小さく始めて段階的に機能を実装します。テスト駆動開発（TDD）で品質を担保し、定期的に進捗を共有します。",
    deliverables: ["動作するソフトウェア", "自動テスト", "デイリー進捗報告"],
  },
  {
    id: "review",
    title: "スプリントレビュー",
    description:
      "スプリントで完成した機能を顧客にデモし、フィードバックを得ます。次のスプリントの方向性を調整します。",
    deliverables: ["デモ実施", "フィードバック収集", "バックログ更新"],
  },
  {
    id: "release",
    title: "リリース",
    description:
      "完成した機能を段階的に本番環境へリリースします。継続的デリバリーで素早く価値を届けます。",
    deliverables: ["本番リリース", "リリースノート", "監視・アラート設定"],
  },
  {
    id: "retrospective",
    title: "振り返り・改善",
    description:
      "スプリントを振り返り、プロセスやチームワークを改善します。学びを次のスプリントに活かします。",
    deliverables: ["振り返り実施", "改善アクション", "プロセス最適化"],
  },
];
