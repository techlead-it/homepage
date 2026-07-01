import { describe, expect, it } from "vite-plus/test";
import type { Slide } from "../types";
import { parseSlideEntry } from "./slideParser";

describe("parseSlideEntry", () => {
  it("extracts title, description and context from html head meta", () => {
    const html = `<!doctype html>
<html lang="ja">
  <head>
    <title>DX推進のご提案</title>
    <meta name="description" content="現場の業務をどう変えるか" />
    <meta name="slide-context" content="DX" />
  </head>
  <body></body>
</html>`;

    const expected: Slide = {
      id: "dx",
      title: "DX推進のご提案",
      description: "現場の業務をどう変えるか",
      context: "DX",
    };
    expect(parseSlideEntry("dx", html)).toEqual(expected);
  });

  it("falls back title to id when title tag is missing", () => {
    const html = `<head>
      <meta name="description" content="説明" />
      <meta name="slide-context" content="DX" />
    </head>`;

    const expected: Slide = {
      id: "sample",
      title: "sample",
      description: "説明",
      context: "DX",
    };
    expect(parseSlideEntry("sample", html)).toEqual(expected);
  });

  it("defaults description to empty string when meta is missing", () => {
    const html = `<head>
      <title>タイトル</title>
      <meta name="slide-context" content="DX" />
    </head>`;

    const expected: Slide = {
      id: "sample",
      title: "タイトル",
      description: "",
      context: "DX",
    };
    expect(parseSlideEntry("sample", html)).toEqual(expected);
  });

  it("defaults context to 'その他' when slide-context meta is missing", () => {
    const html = `<head>
      <title>タイトル</title>
      <meta name="description" content="説明" />
    </head>`;

    const expected: Slide = {
      id: "sample",
      title: "タイトル",
      description: "説明",
      context: "その他",
    };
    expect(parseSlideEntry("sample", html)).toEqual(expected);
  });

  it("trims surrounding whitespace of the title", () => {
    const html = `<head>
      <title>
        余白ありタイトル
      </title>
    </head>`;

    const expected: Slide = {
      id: "sample",
      title: "余白ありタイトル",
      description: "",
      context: "その他",
    };
    expect(parseSlideEntry("sample", html)).toEqual(expected);
  });
});
