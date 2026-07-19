export interface NavLink {
  to: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { to: "/cases", label: "事例" },
  { to: "/#services", label: "支援内容" },
  { to: "/#process", label: "支援の進め方" },
  { to: "/#pricing", label: "料金" },
  { to: "/about", label: "会社概要" },
  { to: "/news", label: "お知らせ" },
];
