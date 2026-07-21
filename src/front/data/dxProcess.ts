import { DxStepEmbedIcon } from "../components/icons/DxStepEmbedIcon";
import { DxStepExpandIcon } from "../components/icons/DxStepExpandIcon";
import { DxStepGrowIcon } from "../components/icons/DxStepGrowIcon";
import { DxStepStartSmallIcon } from "../components/icons/DxStepStartSmallIcon";
import type { DxProcessStep } from "../types";

export const dxProcess: DxProcessStep[] = [
  {
    step: "STEP 01",
    title: "小さく始める",
    description: "現場の声を聞き、最小構成で手応えを掴む",
    icon: DxStepStartSmallIcon,
  },
  {
    step: "STEP 02",
    title: "定着させる",
    description: "本番運用に耐え、現場で使われ続ける状態に",
    icon: DxStepEmbedIcon,
  },
  {
    step: "STEP 03",
    title: "広げる",
    description: "やり方を標準化して、他部署・他拠点へ展開",
    icon: DxStepExpandIcon,
  },
  {
    step: "STEP 04",
    title: "育て続ける",
    description: "改善を全体に反映し続ける仕組みへ",
    icon: DxStepGrowIcon,
  },
];
