import { cleanup, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vite-plus/test";
import type { Slide } from "../types";
import Slides from "./Slides";

function renderSlides(slides: Slide[]) {
  return render(
    <MemoryRouter initialEntries={["/slides"]}>
      <Slides slides={slides} />
    </MemoryRouter>
  );
}

const dxSlide: Slide = {
  id: "dx",
  title: "DX推進のご提案",
  description: "現場の業務をどう変えるか",
  context: "DX",
};

const efficiencySlide: Slide = {
  id: "efficiency",
  title: "業務効率化のご提案",
  description: "手作業を自動化して工数を削減",
  context: "業務効率化",
};

afterEach(() => {
  cleanup();
});

describe("Slides", () => {
  it("shows empty state message when there are no slides", () => {
    renderSlides([]);

    expect(
      screen.getByText("現在、公開中の資料はありません。")
    ).toBeInTheDocument();
  });

  it("shows the title of each slide", () => {
    renderSlides([dxSlide, efficiencySlide]);

    expect(screen.getByText("DX推進のご提案")).toBeInTheDocument();
    expect(screen.getByText("業務効率化のご提案")).toBeInTheDocument();
  });

  it("links each slide card to its html file under /slides", () => {
    renderSlides([dxSlide]);

    const link = screen.getByRole("link", { name: /DX推進のご提案/ });
    expect(link).toHaveAttribute("href", "/slides/dx.html");
  });

  it("groups slides by context and shows a heading per context", () => {
    renderSlides([dxSlide, efficiencySlide]);

    const dxHeading = screen.getByRole("heading", { name: "DX" });
    const efficiencyHeading = screen.getByRole("heading", {
      name: "業務効率化",
    });

    expect(dxHeading).toBeInTheDocument();
    expect(efficiencyHeading).toBeInTheDocument();
  });

  it("shows slides with the same context under one heading group", () => {
    const dxSlide2: Slide = {
      id: "dx-detail",
      title: "DX事例集",
      description: "導入事例のまとめ",
      context: "DX",
    };
    renderSlides([dxSlide, dxSlide2]);

    const dxGroup = screen.getByRole("group", { name: "DX" });
    expect(within(dxGroup).getByText("DX推進のご提案")).toBeInTheDocument();
    expect(within(dxGroup).getByText("DX事例集")).toBeInTheDocument();
  });
});
