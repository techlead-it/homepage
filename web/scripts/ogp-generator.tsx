import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fromJsx } from "takumi-js/helpers/jsx";
import { Renderer } from "takumi-js/node";
import matter from "gray-matter";
import { OgpCard, type OgpCardProps } from "./ogp-card";

type NewsCategory = "announcement" | "tech-blog";

interface NewsArticleFrontmatter {
  title: string;
  date: string;
  category: NewsCategory;
  summary?: string;
}

const NEWS_DIR = path.join(process.cwd(), "src", "content", "news");
const OUTPUT_DIR = path.join(process.cwd(), "public", "og", "news");
const CACHE_DIR = path.join(process.cwd(), "cache", "ogp");
const FONT_PATH = path.join(process.cwd(), "fonts", "NotoSansJP-Bold.ttf");
const LOGO_PATH = path.join(process.cwd(), "public", "logo.webp");
const LOGO_KEY = "logo";

const OGP_WIDTH = 1200;
const OGP_HEIGHT = 630;

const NOTO_SANS_JP_BOLD_URL =
  "https://github.com/notofonts/noto-cjk/raw/main/Sans/OTF/Japanese/NotoSansCJKjp-Bold.otf";

let rendererPromise: Promise<{ renderer: Renderer; logo: Buffer }> | null =
  null;

async function loadFont(): Promise<Buffer> {
  try {
    return await fs.readFile(FONT_PATH);
  } catch {
    console.log("[OGP] Downloading Noto Sans JP font...");
    const response = await fetch(NOTO_SANS_JP_BOLD_URL);
    const fontData = Buffer.from(await response.arrayBuffer());
    await fs.mkdir(path.dirname(FONT_PATH), { recursive: true });
    await fs.writeFile(FONT_PATH, fontData);
    return fontData;
  }
}

async function getRenderer(): Promise<{ renderer: Renderer; logo: Buffer }> {
  if (!rendererPromise) {
    rendererPromise = (async () => {
      const [font, logo] = await Promise.all([
        loadFont(),
        fs.readFile(LOGO_PATH),
      ]);
      const renderer = new Renderer();
      await renderer.registerFont(font);
      return { renderer, logo };
    })();
  }
  return rendererPromise;
}

export async function generateOgpImage(
  props: Omit<OgpCardProps, "logoSrc">
): Promise<Buffer> {
  const { renderer, logo } = await getRenderer();
  const { node, stylesheets } = await fromJsx(
    <OgpCard {...props} logoSrc={LOGO_KEY} />
  );
  return renderer.render(node, {
    width: OGP_WIDTH,
    height: OGP_HEIGHT,
    format: "png",
    stylesheets,
    images: [{ src: LOGO_KEY, data: logo }],
  });
}

function getCachePath(articleId: string, content: string): string {
  const hash = createHash("md5")
    .update(`${articleId}:${content}`)
    .digest("hex");
  return path.join(CACHE_DIR, `${hash}.png`);
}

async function exists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function generateOgpForArticle(filePath: string): Promise<void> {
  const content = await fs.readFile(filePath, "utf-8");
  const { data } = matter(content);
  const frontmatter = data as NewsArticleFrontmatter;

  const articleId = path.basename(filePath, ".md");
  const cachePath = getCachePath(articleId, content);
  const outputPath = path.join(OUTPUT_DIR, `${articleId}.png`);

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  if (await exists(cachePath)) {
    console.log(`[OGP] Skip: ${articleId} (cached)`);
    await fs.copyFile(cachePath, outputPath);
    return;
  }

  console.log(`[OGP] Generate: ${articleId}`);

  const buffer = await generateOgpImage({
    title: frontmatter.title,
    summary: frontmatter.summary,
    category: frontmatter.category,
    date: frontmatter.date,
  });

  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.writeFile(cachePath, buffer);
  await fs.copyFile(cachePath, outputPath);
}

export async function generateAllOgpImages(): Promise<void> {
  const files = await fs.readdir(NEWS_DIR);
  const mdFiles = files.filter((file) => file.endsWith(".md"));

  console.log(`[OGP] Found ${mdFiles.length} news articles`);

  for (const file of mdFiles) {
    await generateOgpForArticle(path.join(NEWS_DIR, file));
  }

  console.log("[OGP] Done!");
}

export const OGP_NEWS_DIR = NEWS_DIR;
