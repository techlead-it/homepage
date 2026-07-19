import type { Service } from "../types";

export const services: Service[] = [
  {
    id: "dx-support",
    title: "DX伴走・相談",
    description:
      "課題の整理から小さく試す検証、本番運用、定着・横展開まで一緒に伴走します。",
    features: ["課題の整理", "小さく試す(検証)", "本番運用", "定着・横展開"],
  },
  {
    id: "ai-training",
    title: "AI活用・研修",
    description:
      "社内文書にすぐ聞けるAI、資料づくりや事務作業の自動化、AIの使い方研修を提供します。",
    features: ["社内問い合わせAI", "資料作成の自動化支援", "AI活用研修"],
  },
  {
    id: "business-system-development",
    title: "業務システム構築",
    description:
      "現場の業務に合わせた仕組みづくりを、要件の整理から運用・保守まで担います。",
    features: ["要件の整理", "現場に合わせた設計・開発", "運用・保守"],
  },
];
