import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vite-plus/test";
import type { SlideCategory } from "../types";
import Slides from "./Slides";

function renderSlides(categories: SlideCategory[]) {
  return render(
    <MemoryRouter initialEntries={["/slides"]}>
      <Slides categories={categories} />
    </MemoryRouter>
  );
}

const companyCategory: SlideCategory = {
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
};

const aiTrainingCategory: SlideCategory = {
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
  ],
};

afterEach(() => {
  cleanup();
});

describe("Slides", () => {
  it("shows empty state message when there are no categories", () => {
    renderSlides([]);

    expect(
      screen.getByText("現在、公開中の資料はありません。")
    ).toBeInTheDocument();
  });

  it("shows the name and description of each category as a card", () => {
    renderSlides([companyCategory, aiTrainingCategory]);

    expect(screen.getByText("会社紹介")).toBeInTheDocument();
    expect(screen.getByText("会社紹介資料です")).toBeInTheDocument();
    expect(screen.getByText("AI研修")).toBeInTheDocument();
    expect(screen.getByText("AI研修資料です")).toBeInTheDocument();
  });

  it("links each category card to its category page", () => {
    renderSlides([companyCategory]);

    const link = screen.getByRole("link", { name: /会社紹介/ });
    expect(link).toHaveAttribute("href", "/slides/company");
  });
});
