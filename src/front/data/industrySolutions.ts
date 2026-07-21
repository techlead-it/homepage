import type { IndustrySolution } from "../types";

export const industrySolutions: IndustrySolution[] = [
  {
    id: "construction",
    industry: "建設業",
    title: "現場れんらく帳",
    description:
      "協力会社とのLINE・FAX・電話でのやり取りを、いまの手段のまま自動で記録。現場の入力を増やさず、台帳への転記をなくします。",
    href: "/solutions/construction",
    image: {
      src: "/images/solutions/construction/hero.webp",
      alt: "現場監督のスマホに届いたLINE・FAX・電話の連絡が、1本の流れになって台帳に記録されていくイラスト",
    },
  },
  {
    id: "logistics",
    industry: "運輸・物流業",
    title: "運行れんらく帳",
    description:
      "配車連絡・紙の運転日報をいまの手段のまま自動で記録。日報は写真を撮るだけで、請求書のもとになる記録を作ります。",
    href: "/solutions/logistics",
    image: {
      src: "/images/solutions/logistics/hero.webp",
      alt: "配車係のスマホに届いた連絡と紙の運転日報が、1本の流れになって台帳に記録されていくイラスト",
    },
  },
  {
    id: "food",
    industry: "食品業",
    title: "受注れんらく帳",
    description:
      "FAX・電話での受注をいまの手段のまま自動で記録。取引先には迷惑をかけず、入力と原価の見える化だけを進めます。",
    href: "/solutions/food",
    image: {
      src: "/images/solutions/food/hero.webp",
      alt: "FAXと電話で届いた注文が、1本の流れになって受注台帳に記録されていくイラスト",
    },
  },
];
