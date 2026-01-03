import type { NewsArticle, NewsCategory } from "../types";

/**
 * シンプルなフロントマター解析（ブラウザ対応）
 */
function parseFrontmatter(content: string): {
  data: { [key: string]: string };
  content: string;
} {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content };
  }

  const [, frontmatter, markdown] = match;
  const data: { [key: string]: string } = {};

  // フロントマターの各行を解析
  for (const line of frontmatter.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (-1 === colonIndex) {
      continue;
    }

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // 引用符を削除
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return { data, content: markdown };
}

// Markdownファイルを動的にインポート
const newsFiles = import.meta.glob("../content/news/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

/**
 * Markdownファイルからニュース記事データを生成
 */
export const newsArticles: NewsArticle[] = Object.entries(newsFiles)
  .map(([filepath, content]) => {
    const { data, content: markdown } = parseFrontmatter(content as string);

    // ファイル名からIDを生成（例: 2025-01-15-company-launch.md → 2025-01-15-company-launch）
    const filename = filepath.split("/").pop() || "";
    const id = filename.replace(/\.md$/, "");

    return {
      id,
      title: data.title,
      date: data.date,
      category: data.category as NewsCategory, // TODO: validation
      summary: data.summary,
      content: markdown,
    };
  })
  // 日付の新しい順にソート
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

/**
 * IDで記事を検索
 */
export const getNewsArticleById = (id: string): NewsArticle | undefined => {
  return newsArticles.find((article) => article.id === id);
};

/**
 * 最新のニュース記事を取得
 */
export const getLatestNews = (count: number): NewsArticle[] => {
  return newsArticles.slice(0, count);
};
