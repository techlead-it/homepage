import { describe, expect, it } from "vite-plus/test";
import { generateOgpImage } from "./ogp-generator";

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
