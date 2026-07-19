import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Cases from "./Cases";

function renderCases() {
  return render(
    <MemoryRouter initialEntries={["/cases"]}>
      <Cases />
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
});

describe("Cases ページ", () => {
  it("匿名事例3件のカードを業種+規模感・課題見出し・数値ハイライトつきで表示し、詳細ページへリンクする", () => {
    renderCases();

    expect(screen.getByText("リゾートホテル")).toBeInTheDocument();
    expect(
      screen.getByText("管理者・スタッフ・ゲストの3者が関わる宿泊施設")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "紙と口頭に頼った引き継ぎで、情報の取りこぼしが起きていた"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("約50%削減")).toBeInTheDocument();

    expect(screen.getByText("食品を扱う事業者")).toBeInTheDocument();
    expect(screen.getByText("約70%削減")).toBeInTheDocument();

    expect(screen.getByText("運送会社")).toBeInTheDocument();
    expect(screen.getByText("約80%削減")).toBeInTheDocument();

    const links = screen.getAllByRole("link");
    const hrefs = links.map((link) => link.getAttribute("href"));
    expect(hrefs).toContain("/cases/resort-hotel");
    expect(hrefs).toContain("/cases/allergen-check");
    expect(hrefs).toContain("/cases/transport-documents");
  });

  it("ページ別のdocument.titleを設定する", () => {
    renderCases();

    expect(document.title).toBe("導入事例 | 株式会社テックリード");
  });
});
