import type { Slide } from "../types";

/**
 * スライドHTMLの <head> から <meta name="..."> の content を抽出する。
 * name→content の順（一般的な記法）を対象とする。
 */
const extractMetaContent = (html: string, name: string): string | undefined => {
  const pattern = new RegExp(
    `<meta\\s+name=["']${name}["']\\s+content=["']([^"']*)["']`,
    "i"
  );
  return html.match(pattern)?.[1];
};

/**
 * スライドHTMLの <title> テキストを抽出する（前後空白は除去）。
 */
const extractTitle = (html: string): string | undefined => {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  return match?.[1].trim();
};

/**
 * ファイル名(id)とスライドHTMLから一覧エントリ(Slide)を構築する。
 * メタが無い場合: title→id / description→"" / context→"その他"。
 */
export const parseSlideEntry = (id: string, html: string): Slide => ({
  id,
  title: extractTitle(html) ?? id,
  description: extractMetaContent(html, "description") ?? "",
  context: extractMetaContent(html, "slide-context") ?? "その他",
});
