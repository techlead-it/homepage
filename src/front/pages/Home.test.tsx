import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Home from "./Home";

function renderHome() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Home />
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
});

describe("Home ページ (経営者向けトップ)", () => {
  it("課題語彙・業種不問・キーメッセージ・料金目安・30分無料相談CTAを表示する", () => {
    renderHome();

    expect(
      screen.getByText("作って終わりにしない。現場に根付くDXを、一緒に。")
    ).toBeInTheDocument();

    const bodyText = document.body.textContent ?? "";
    expect(bodyText).toMatch(/紙/);
    expect(bodyText).toMatch(/Excel/);
    expect(bodyText).toMatch(/属人/);
    expect(bodyText).toMatch(/業種を問わず/);

    expect(screen.getAllByText(/30分無料相談/).length).toBeGreaterThan(0);

    expect(screen.getByText("エントリー")).toBeInTheDocument();
    expect(
      screen.getByText("月20万円〜 / プロジェクト一括30万円〜")
    ).toBeInTheDocument();
  });

  it("匿名事例3件のサマリを表示し、各カードが事例詳細ページへリンクする", () => {
    renderHome();

    expect(
      screen.getByText(
        "紙と口頭に頼った引き継ぎで、情報の取りこぼしが起きていた"
      )
    ).toBeInTheDocument();

    const links = screen.getAllByRole("link");
    const hrefs = links.map((link) => link.getAttribute("href"));
    expect(hrefs).toContain("/cases/resort-hotel");
    expect(hrefs).toContain("/cases/allergen-check");
    expect(hrefs).toContain("/cases/transport-documents");
  });

  it("事例サマリの各カードにデモ画面の画像を表示する", () => {
    renderHome();

    expect(
      screen.getByAltText("Resort DX 業務管理システム デモ画面")
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("アレルゲンチェックシステム デモ画面")
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("元請ダイレクト 書類提出DX デモ画面")
    ).toBeInTheDocument();
  });

  it("支援の進め方(段階的定着プロセス)を表示する", () => {
    renderHome();

    expect(screen.getByText("小さく始める")).toBeInTheDocument();
    expect(screen.getByText("育て続ける")).toBeInTheDocument();
  });

  it("ギークなエンジニアの楽園などエンジニア向け採用訴求を表示しない", () => {
    renderHome();

    expect(
      screen.queryByText(/ギークなエンジニアの楽園/)
    ).not.toBeInTheDocument();
  });

  it("ページ別のdocument.titleを設定する", () => {
    renderHome();

    expect(document.title).toBe("現場に根付くDX支援 | 株式会社テックリード");
  });
});
