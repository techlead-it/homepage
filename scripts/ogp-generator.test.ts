import { describe, expect, it } from "vite-plus/test";
import { generateOgpImage, parseNewsArticleFrontmatter } from "./ogp-generator";

describe("generateOgpImage", () => {
  it("お知らせ記事の情報から有効なPNG画像を生成する", async () => {
    const buffer = await generateOgpImage({
      title: "テスト記事タイトル",
      summary: "テストの概要文",
      category: "announcement",
      date: "2026-01-01",
    });

    const pngSignature = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ]);
    expect(buffer.subarray(0, 8)).toEqual(pngSignature);
  });
});

describe("parseNewsArticleFrontmatter", () => {
  it("有効なフロントマターをそのまま返す", () => {
    const frontmatter = parseNewsArticleFrontmatter({
      title: "テスト記事タイトル",
      date: "2026-01-01",
      category: "announcement",
      summary: "テストの概要文",
    });

    expect(frontmatter).toEqual({
      title: "テスト記事タイトル",
      date: "2026-01-01",
      category: "announcement",
      summary: "テストの概要文",
    });
  });

  it("未知のcategoryの場合はエラーを投げる", () => {
    expect(() =>
      parseNewsArticleFrontmatter({
        title: "テスト記事タイトル",
        date: "2026-01-01",
        category: "invalid-category",
      })
    ).toThrow();
  });
});
