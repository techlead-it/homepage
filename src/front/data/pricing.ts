import type { PricingTier } from "../types";

export const pricing: PricingTier[] = [
  {
    name: "エントリー",
    priceRange: "月20万円〜 / プロジェクト一括30万円〜",
    description:
      "まず小さく試したい方向け。現状整理・課題棚卸しのスポット相談や、単一業務の小規模開発、AI研修から始められます。",
  },
  {
    name: "スタンダード",
    priceRange: "月40万円〜 / プロジェクト一括150万円〜",
    description:
      "バランス重視。1テーマの検証から小規模伴走、複数業務の連携システム、中規模Webアプリまで対応します。",
  },
  {
    name: "フル",
    priceRange: "月80万円〜 / プロジェクト一括400万円〜",
    description:
      "拡張・全社展開向け。全社DXの継続伴走や基幹システム構築、大規模なアプリ開発まで対応します。",
  },
];
