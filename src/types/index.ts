// 会社情報
export interface CompanyInfo {
	name: string;
	ceo: string;
	founded: string;
	businesses: string[];
	address: {
		postalCode: string;
		prefecture: string;
		city: string;
		street: string;
		building: string;
	};
}

// サービス
export interface Service {
	id: string;
	title: string;
	description: string;
	features: string[];
	technologies?: string[];
}

// プロジェクト/実績
export interface Project {
	id: string;
	title: string;
	description: string;
	category: string[];
	technologies: string[];
	period?: string;
}

// 強み
export interface Strength {
	id: string;
	title: string;
	description: string;
	icon?: string;
}

// 開発プロセスのステップ
export interface ProcessStep {
	id: string;
	title: string;
	description: string;
	deliverables?: string[];
}

// 技術スタック
export interface TechStack {
	category: string;
	items: TechItem[];
}

export interface TechItem {
	name: string;
	icon?: string;
	proficiency: number;
}

// 取引先
export interface Client {
	name: string;
	url: string;
}

// 企業理念
export interface Philosophy {
	mission: string;
	vision: string;
	values: string;
	philosophy: string;
	identity: string;
}
