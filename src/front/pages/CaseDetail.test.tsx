import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it } from "vite-plus/test";
import CaseDetail from "./CaseDetail";

function renderCaseDetail(id: string) {
  return render(
    <MemoryRouter initialEntries={[`/cases/${id}`]}>
      <Routes>
        <Route path="/cases/:id" element={<CaseDetail />} />
        <Route path="/cases" element={<p>事例一覧</p>} />
      </Routes>
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
});

describe("CaseDetail ページ", () => {
  it("課題→現場の変化の物語・概要表・数値・before/after図解を表示する", () => {
    renderCaseDetail("resort-hotel");

    expect(
      screen.getByRole("heading", {
        name: "紙と口頭に頼った引き継ぎで、情報の取りこぼしが起きていた",
      })
    ).toBeInTheDocument();
    expect(screen.getAllByText("リゾートホテル").length).toBeGreaterThan(0);
    expect(
      screen.getByText("管理者・スタッフ・ゲストの3者が関わる宿泊施設")
    ).toBeInTheDocument();
    expect(
      screen.getByText("業務管理システムの開発と社内定着支援")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/清掃・配膳・送迎・お祝い対応/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/管理者・スタッフ・ゲストの3つの役割で一元管理/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/多言語対応によってインバウンド対応の体験も向上/)
    ).toBeInTheDocument();
    expect(screen.getByText("約50%削減")).toBeInTheDocument();
    expect(screen.getByText("取りこぼしも減少")).toBeInTheDocument();
    expect(
      screen.getByText("紙の引き継ぎノートで情報共有")
    ).toBeInTheDocument();
    expect(
      screen.getByText("多言語対応でインバウンド対応")
    ).toBeInTheDocument();
  });

  it("未知の id では /cases へリダイレクトされる", () => {
    renderCaseDetail("unknown-case");

    expect(screen.getByText("事例一覧")).toBeInTheDocument();
  });

  it("事例のtitleをdocument.titleに設定する", () => {
    renderCaseDetail("resort-hotel");

    expect(document.title).toBe(
      "紙と口頭に頼った引き継ぎで、情報の取りこぼしが起きていた | 株式会社テックリード"
    );
  });

  it("デモ画面の画像を表示する", () => {
    renderCaseDetail("resort-hotel");

    const image = screen.getByAltText("Resort DX 業務管理システム デモ画面");
    expect(image).toHaveAttribute("src", "/images/cases/resort-hotel.png");
  });
});
