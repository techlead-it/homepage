import { StrengthContinuousIcon } from "../components/icons/StrengthContinuousIcon";
import { StrengthQualityIcon } from "../components/icons/StrengthQualityIcon";
import { StrengthSecurityIcon } from "../components/icons/StrengthSecurityIcon";
import { StrengthStableTechIcon } from "../components/icons/StrengthStableTechIcon";
import type { Strength } from "../types";

export const strengths: Strength[] = [
  {
    id: "proven-quality",
    title: "実績に裏打ちされた品質",
    description:
      "さまざまな業界のDXを手がけた経験を活かし、現場の運用に本当にフィットする形で提供します。",
    icon: StrengthQualityIcon,
  },
  {
    id: "stable-technology",
    title: "安定した技術で、長く使える",
    description:
      "流行りを追わず、実績のある安定した技術を選びます。壊れにくく、長く使い続けられるシステムに。",
    icon: StrengthStableTechIcon,
  },
  {
    id: "security-first",
    title: "セキュリティを最初から",
    description:
      "情報漏洩や不正アクセスを防ぐことを前提に設計します。大切な情報を安心して預けられます。",
    icon: StrengthSecurityIcon,
  },
  {
    id: "no-build-and-forget",
    title: "作って終わりにしない",
    description: "導入後も一緒に改善し、現場に定着するまで伴走します。",
    icon: StrengthContinuousIcon,
  },
];
