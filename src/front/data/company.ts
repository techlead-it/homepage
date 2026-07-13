import type { Client, CompanyInfo } from "../types";

export const companyInfo: CompanyInfo = {
  name: "株式会社テックリード",
  ceo: "兼平 松",
  founded: "2022年09月13日",
  businesses: ["システム開発"],
  address: {
    postalCode: "332-0025",
    prefecture: "埼玉県",
    city: "川口市",
    street: "原町４番１４号",
    building: "ライオンズマンション川口原町２０１",
  },
};

export const clients: Client[] = [
  { name: "FRAIM株式会社", url: "https://fraim.co.jp" },
  { name: "株式会社UKIYOcreate", url: "https://ukiyo-create.com" },
  { name: "株式会社Waitinglist", url: "https://waitinglist.co.jp" },
  {
    name: "株式会社ティー・エス・イー",
    url: "https://estrella.co.jp/company_tse/",
  },
  { name: "KAPFILM", url: "http://kapfilm.com" },
  { name: "NodeX 株式会社", url: "https://nodex.inc" },
  { name: "株式会社アットマーク", url: "https://attm.co.jp" },
];
