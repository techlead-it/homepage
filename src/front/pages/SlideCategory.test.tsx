import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it } from "vite-plus/test";
import type { SlideCategory as SlideCategoryType } from "../types";
import SlideCategory from "./SlideCategory";
import Slides from "./Slides";

const categories: SlideCategoryType[] = [
  {
    id: "company",
    name: "会社紹介",
    description: "会社紹介資料です",
    docs: [
      {
        id: "dx",
        title: "作って終わりにしない。現場に根付くDXを、一緒に。",
        description: "DXで、日本の競争力を底上げする",
        path: "/slides/company/dx.html",
      },
    ],
  },
  {
    id: "ai-training",
    name: "AI研修",
    description: "AI研修資料です",
    docs: [
      {
        id: "sales",
        title: "営業向け AI 研修",
        description: "AIの現在地から要件ヒアリングの実践までを扱う研修スライド",
        path: "/slides/sales/index.html",
      },
      {
        id: "claude-code-beginner",
        title: "Claude Code 研修 初級",
        description: "基本ワークフローを半日で",
        path: "/slides/claude-code/beginner/index.html",
      },
    ],
  },
];

function renderAtPath(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/slides" element={<Slides categories={categories} />} />
        <Route
          path="/slides/:categoryId"
          element={<SlideCategory categories={categories} />}
        />
      </Routes>
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
});

describe("SlideCategory", () => {
  it("shows the category name and each doc title", () => {
    renderAtPath("/slides/ai-training");

    expect(screen.getByRole("heading", { name: "AI研修" })).toBeInTheDocument();
    expect(screen.getByText("営業向け AI 研修")).toBeInTheDocument();
    expect(screen.getByText("Claude Code 研修 初級")).toBeInTheDocument();
  });

  it("links each doc card to its static html path", () => {
    renderAtPath("/slides/company");

    const link = screen.getByRole("link", {
      name: /作って終わりにしない。現場に根付くDXを、一緒に。/,
    });
    expect(link).toHaveAttribute("href", "/slides/company/dx.html");
  });

  it("redirects to the slides top page for an unknown category", () => {
    renderAtPath("/slides/unknown");

    expect(screen.getByText("資料")).toBeInTheDocument();
    expect(screen.getByText("会社紹介")).toBeInTheDocument();
  });
});
