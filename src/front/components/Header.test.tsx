import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Header from "./Header";

function renderHeader() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Header />
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
});

describe("Header (経営者向けナビゲーション)", () => {
  it("経営者向けリンクと右端のエンジニア向けリンクを表示する", () => {
    renderHeader();

    const links = screen.getAllByRole("link");
    const hrefs = links.map((link) => link.getAttribute("href"));

    expect(hrefs).toContain("/#cases");
    expect(hrefs).toContain("/#services");
    expect(hrefs).toContain("/#process");
    expect(hrefs).toContain("/#pricing");
    expect(hrefs).toContain("/about");
    expect(hrefs).toContain("/news");
    expect(hrefs).toContain("/contact");
    expect(hrefs).toContain("/engineers");
  });

  it("研修・資料へのリンクを含み、zenn技術ブログへのリンクは含まない", () => {
    renderHeader();

    const links = screen.getAllByRole("link");
    const hrefs = links.map((link) => link.getAttribute("href"));

    expect(hrefs).toContain("/slides");
    expect(hrefs).not.toContain("https://zenn.dev/p/techlead");
  });
});
