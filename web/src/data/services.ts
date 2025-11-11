import type { Service } from "../types";

export const services: Service[] = [
	{
		id: "web-app-development",
		title: "Webアプリ開発",
		description:
			"モダンな技術スタックを使用した、高品質なWebアプリケーション開発",
		features: ["React / Next.js", "TypeScript", "Go", "Rust"],
		technologies: ["React", "Next.js", "TypeScript", "AWS"],
	},
	{
		id: "business-system-development",
		title: "業務システム構築",
		description: "業務の効率化を実現する、カスタマイズ可能なシステム構築",
		features: [
			"要件定義から保守まで",
			"既存システム連携",
			"スケーラブル設計",
			"ハイパフォーマンス",
			"セキュリティ対策",
		],
		technologies: ["Go", "Python", "PostgreSQL", "Docker", "Kubernetes"],
	},
	{
		id: "ai-automation-support",
		title: "AI自動化支援",
		description: "AIを活用した、業務プロセスの最適化",
		features: ["RAGシステム構築", "AIチャット構築"],
		technologies: ["OpenAI API", "LangChain"],
	},
];
