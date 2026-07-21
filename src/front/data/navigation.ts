export interface NavLink {
  to: string;
  label: string;
}

export const primaryNavLinks: NavLink[] = [
  { to: "/#cases", label: "事例" },
  { to: "/#services", label: "サービス" },
  { to: "/#process", label: "支援の進め方" },
  { to: "/#pricing", label: "料金" },
];

export const secondaryNavLinks: NavLink[] = [
  { to: "/about", label: "会社概要" },
  { to: "/news", label: "お知らせ" },
  { to: "/slides", label: "研修・資料" },
];
