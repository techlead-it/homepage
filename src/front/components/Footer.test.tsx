import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Footer from "./Footer";

function renderFooter() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Footer />
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
});

describe("Footer", () => {
  it("研修・資料、エンジニアの方へ、zenn技術ブログ、会社名・住所を表示する", () => {
    renderFooter();

    const links = screen.getAllByRole("link");
    const hrefs = links.map((link) => link.getAttribute("href"));

    expect(hrefs).toContain("/slides");
    expect(hrefs).toContain("/engineers");
    expect(hrefs).toContain("https://zenn.dev/p/techlead");

    expect(screen.getAllByText(/株式会社テックリード/).length).toBeGreaterThan(
      0
    );
    expect(screen.getByText(/埼玉県川口市原町/)).toBeInTheDocument();
  });

  it("ヘッダーと同一の経営者向けリンクも含む", () => {
    renderFooter();

    const links = screen.getAllByRole("link");
    const hrefs = links.map((link) => link.getAttribute("href"));

    expect(hrefs).toContain("/cases");
    expect(hrefs).toContain("/#services");
    expect(hrefs).toContain("/#process");
    expect(hrefs).toContain("/#pricing");
    expect(hrefs).toContain("/about");
    expect(hrefs).toContain("/news");
    expect(hrefs).toContain("/contact");
  });
});
