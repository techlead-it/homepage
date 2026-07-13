import { techStack } from "../../data/techStack";
import Card from "../ui/Card";
import ProficiencyLevelItem from "../ui/ProficiencyLevelItem";
import Section from "../ui/Section";
import type { SectionProps } from "./types";

export default function TechStackSection({ background }: SectionProps) {
  return (
    <Section background={background}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">技術スタック</h2>
        <p className="text-lg text-gray-600 mb-8">
          豊富な技術力で最適なソリューションを提供
        </p>

        {/* 熟練度の凡例 */}
        <div className="max-w-6xl mx-auto bg-white rounded-lg p-8 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-6 text-center">
            熟練度レベルについて
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            <ProficiencyLevelItem
              level={1}
              title="レベル1: 基礎知識"
              description="基本的な文法や概念を理解し、ドキュメントを参照しながら簡単なタスクを実装できる"
            />
            <ProficiencyLevelItem
              level={2}
              title="レベル2: 実装可能"
              description="既存のコードを理解し、機能追加や修正、標準的なパターンを使った実装ができる"
            />
            <ProficiencyLevelItem
              level={3}
              title="レベル3: 自立開発"
              description="要件から設計・実装まで一人で完結でき、パフォーマンスやセキュリティを考慮した実装ができる"
            />
            <ProficiencyLevelItem
              level={4}
              title="レベル4: 設計・最適化"
              description="システム全体の設計やアーキテクチャ選定ができ、複雑な課題を技術的に解決できる"
            />
            <ProficiencyLevelItem
              level={5}
              title="レベル5: エキスパート"
              description="技術的リーダーシップを取り、ベストプラクティスの策定や技術的な意思決定ができる"
            />
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
                  <span className="text-gray-700 font-medium">{item.name}</span>
                  {item.proficiency && (
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={`${item.name}-proficiency-${i}`}
                          className={`w-3 h-3 rounded-full ${
                            i < item.proficiency ? "bg-blue-600" : "bg-gray-300"
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
  );
}
