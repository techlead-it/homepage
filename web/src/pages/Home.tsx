import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Section from "../components/ui/Section";
import { philosophy } from "../data/philosophy";
import { processSteps } from "../data/processSteps";
import { projects } from "../data/projects";
import { services } from "../data/services";
import { strengths } from "../data/strengths";
import { techStack } from "../data/techStack";

export default function Home() {
	return (
		<div>
			{/* ヒーローセクション */}
			<Section background="gray">
				<div className="text-center py-12">
					<h1 className="text-5xl font-bold text-gray-900 mb-6">
						<h1 className="text-5xl font-bold text-gray-900 mb-6">
							利益より誠実、声より本質
						</h1>
						顧客の未来をともに作る
					</h1>
				</div>
			</Section>

			{/* 会社紹介セクション */}
			<Section background="white">
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							私たちについて
						</h2>
						<p className="text-lg text-gray-600">
							テックリードが大切にしている想い
						</p>
					</div>
					<div className="space-y-8">
						<div className="bg-gray-50 p-8 rounded-lg">
							<p className="text-gray-700 whitespace-pre-line leading-relaxed">
								{philosophy.mission}
							</p>
						</div>
						<div className="text-center">
							<Button to="/introduction" variant="outline">
								詳しく見る
							</Button>
						</div>
					</div>
				</div>
			</Section>

			{/* サービス紹介セクション */}
			<Section background="gray">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						提供サービス
					</h2>
					<p className="text-lg text-gray-600">
						お客様のニーズに合わせた最適なソリューションを提供します
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

			{/* 実績・プロジェクト紹介セクション */}
			<Section background="white">
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
							<p className="text-sm text-gray-600 mb-3">
								{project.description}
							</p>
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

			{/* 強み・特徴セクション */}
			<Section background="gray">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						私たちの強み
					</h2>
					<p className="text-lg text-gray-600">
						テックリードが選ばれる4つの理由
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{strengths.map((strength) => (
						<Card key={strength.id}>
							<div className="flex items-start">
								<div className="text-4xl mr-4">{strength.icon}</div>
								<div>
									<h3 className="text-xl font-bold text-gray-900 mb-3">
										{strength.title}
									</h3>
									<p className="text-gray-600 leading-relaxed">
										{strength.description}
									</p>
								</div>
							</div>
						</Card>
					))}
				</div>
			</Section>

			{/* 開発プロセスセクション */}
			<Section background="white">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						開発プロセス
					</h2>
				</div>
				<div className="max-w-4xl mx-auto space-y-6">
					{processSteps.map((step, index) => (
						<Card key={step.id}>
							<div className="flex items-start">
								<div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
									{index + 1}
								</div>
								<div className="flex-1">
									<h3 className="text-xl font-bold text-gray-900 mb-2">
										{step.title}
									</h3>
									<p className="text-gray-600 mb-3">{step.description}</p>
									{step.deliverables && step.deliverables.length > 0 && (
										<div className="mt-3">
											<p className="text-sm font-semibold text-gray-700 mb-2">
												成果物:
											</p>
											<div className="flex flex-wrap gap-2">
												{step.deliverables.map((deliverable) => (
													<span
														key={deliverable}
														className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
													>
														{deliverable}
													</span>
												))}
											</div>
										</div>
									)}
								</div>
							</div>
						</Card>
					))}
				</div>
			</Section>

			{/* 技術スタックセクション */}
			<Section background="gray">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						技術スタック
					</h2>
					<p className="text-lg text-gray-600 mb-8">
						豊富な技術力で最適なソリューションを提供
					</p>

					{/* 熟練度の凡例 */}
					<div className="max-w-6xl mx-auto bg-white rounded-lg p-8 shadow-sm">
						<h3 className="text-base font-bold text-gray-900 mb-6 text-center">
							熟練度レベルについて
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
							<div>
								<div className="flex items-center gap-2 mb-2">
									<div className="w-3 h-3 rounded-full bg-blue-600" />
									<span className="text-sm font-semibold text-gray-900">
										レベル1: 基礎知識
									</span>
								</div>
								<p className="text-sm text-gray-600 leading-relaxed">
									基本的な文法や概念を理解し、ドキュメントを参照しながら簡単なタスクを実装できる
								</p>
							</div>
							<div>
								<div className="flex items-center gap-2 mb-2">
									<div className="flex gap-0.5">
										<div className="w-3 h-3 rounded-full bg-blue-600" />
										<div className="w-3 h-3 rounded-full bg-blue-600" />
									</div>
									<span className="text-sm font-semibold text-gray-900">
										レベル2: 実装可能
									</span>
								</div>
								<p className="text-sm text-gray-600 leading-relaxed">
									既存のコードを理解し、機能追加や修正、標準的なパターンを使った実装ができる
								</p>
							</div>
							<div>
								<div className="flex items-center gap-2 mb-2">
									<div className="flex gap-0.5">
										<div className="w-3 h-3 rounded-full bg-blue-600" />
										<div className="w-3 h-3 rounded-full bg-blue-600" />
										<div className="w-3 h-3 rounded-full bg-blue-600" />
									</div>
									<span className="text-sm font-semibold text-gray-900">
										レベル3: 自立開発
									</span>
								</div>
								<p className="text-sm text-gray-600 leading-relaxed">
									要件から設計・実装まで一人で完結でき、パフォーマンスやセキュリティを考慮した実装ができる
								</p>
							</div>
							<div>
								<div className="flex items-center gap-2 mb-2">
									<div className="flex gap-0.5">
										<div className="w-3 h-3 rounded-full bg-blue-600" />
										<div className="w-3 h-3 rounded-full bg-blue-600" />
										<div className="w-3 h-3 rounded-full bg-blue-600" />
										<div className="w-3 h-3 rounded-full bg-blue-600" />
									</div>
									<span className="text-sm font-semibold text-gray-900">
										レベル4: 設計・最適化
									</span>
								</div>
								<p className="text-sm text-gray-600 leading-relaxed">
									システム全体の設計やアーキテクチャ選定ができ、複雑な課題を技術的に解決できる
								</p>
							</div>
							<div>
								<div className="flex items-center gap-2 mb-2">
									<div className="flex gap-0.5">
										<div className="w-3 h-3 rounded-full bg-blue-600" />
										<div className="w-3 h-3 rounded-full bg-blue-600" />
										<div className="w-3 h-3 rounded-full bg-blue-600" />
										<div className="w-3 h-3 rounded-full bg-blue-600" />
										<div className="w-3 h-3 rounded-full bg-blue-600" />
									</div>
									<span className="text-sm font-semibold text-gray-900">
										レベル5: エキスパート
									</span>
								</div>
								<p className="text-sm text-gray-600 leading-relaxed">
									技術的リーダーシップを取り、ベストプラクティスの策定や技術的な意思決定ができる
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
					{techStack.map((category) => (
						<Card key={category.category}>
							<h3 className="text-xl font-bold text-gray-900 mb-4">
								{category.category}
							</h3>
							<div className="space-y-3">
								{category.items.map((item) => (
									<div
										key={item.name}
										className="flex items-center justify-between"
									>
										<span className="text-gray-700 font-medium">
											{item.name}
										</span>
										{item.proficiency && (
											<div className="flex gap-1">
												{[...Array(5)].map((v, i) => (
													<div
														key={v}
														className={`w-3 h-3 rounded-full ${
															i < item.proficiency
																? "bg-blue-600"
																: "bg-gray-300"
														}`}
													/>
												))}
											</div>
										)}
									</div>
								))}
							</div>
						</Card>
					))}
				</div>
			</Section>

			{/* CTAセクション */}
			<Section background="white">
				<div className="text-center">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						まずはお気軽にご相談ください
					</h2>
					<p className="text-lg text-gray-600 mb-8">
						無料相談・簡易見積りを承っております
					</p>
					<Button to="/contact" size="lg">
						お問い合わせはこちら
					</Button>
				</div>
			</Section>
		</div>
	);
}
