import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "mail-dispatcher",
    title: "メール配信サービス開発",
    description:
      "Amazon SESを使用したgRPCベースのメール送信サービスの設計・開発。非同期処理、送信履歴管理、送信状態追跡機能を実装し、スケーラブルなメール配信基盤を構築",
    category: ["業務システム構築"],
    technologies: [
      "Rust",
      "gRPC",
      "PostgreSQL",
      "AWS",
      "OpenTelemetry",
      "GitHub Actions",
    ],
  },
  {
    id: "iot-platform",
    title: "IoT基盤システム開発",
    description:
      "全世界で使用するIoT基盤システムの開発。アーキテクチャの検討・決定、コードレビュー、設計検討、機能実装、テストまで幅広く担当",
    category: ["業務システム構築"],
    technologies: [
      "Go",
      "TypeScript",
      "React",
      "MySQL",
      "AWS",
      "OpenTelemetry",
      "Terraform",
      "GitHub Actions",
    ],
  },
  {
    id: "edge-platform",
    title: "エッジデバイス向けゼロトラストプラットフォーム開発",
    description:
      "エッジデバイス向けゼロトラストプラットフォームの構築。フロントエンド・バックエンド実装、負荷試験を担当。",
    category: ["Webアプリ開発"],
    technologies: [
      "Rust",
      "TypeScript",
      "React",
      "PostgreSQL",
      "OpenTelemetry",
    ],
  },
  {
    id: "btob-btoc-system",
    title: "BtoB・BtoCシステム開発",
    description:
      "BtoBのシステムバックエンド～フロントエンド開発、BtoCのスマホアプリ開発を担当。バックエンドAPI設計・開発からフロントエンド設計・開発まで担当",
    category: ["Webアプリ開発", "スマホアプリ開発"],
    technologies: [
      "Go",
      "TypeScript",
      "Rust",
      "React",
      "React Native",
      "MySQL",
      "GitHub Actions",
    ],
  },
  {
    id: "document-workspace",
    title: "クラウドドキュメントワークスペースシステム開発",
    description:
      "toB向けクラウドドキュメントワークスペースシステムの開発。バックエンドAPIの開発（設計・調査・実装・テスト）とSREを担当",
    category: ["業務システム構築"],
    technologies: [
      "Rust",
      "TypeScript",
      "DynamoDB",
      "MongoDB",
      "AWS",
      "GitHub Actions",
      "OpenTelemetry",
    ],
  },
];
