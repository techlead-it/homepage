import { PainDataUnusedIcon } from "../components/icons/PainDataUnusedIcon";
import { PainNoDirectionIcon } from "../components/icons/PainNoDirectionIcon";
import { PainPocStalledIcon } from "../components/icons/PainPocStalledIcon";
import { PainSiloedIcon } from "../components/icons/PainSiloedIcon";
import { PainToolNotUsedIcon } from "../components/icons/PainToolNotUsedIcon";
import type { PainPoint } from "../types";

export const painPoints: PainPoint[] = [
  {
    title: "ツールは入れたが、現場で使われていない",
    description: "結局これまでのやり方に戻ってしまった",
    icon: PainToolNotUsedIcon,
  },
  {
    title: "業務が属人化している",
    description: "担当者不在で止まる、引き継げない",
    icon: PainSiloedIcon,
  },
  {
    title: "データはあるが、改善に繋がっていない",
    description: "集計はしているが見られていない",
    icon: PainDataUnusedIcon,
  },
  {
    title: "試しに導入したが、そこで止まった",
    description: "検証段階で終わり、本番運用まで進まなかった",
    icon: PainPocStalledIcon,
  },
  {
    title: "何から手をつければいいか分からない",
    description: "投資対効果が見えず踏み出せない",
    icon: PainNoDirectionIcon,
  },
];
