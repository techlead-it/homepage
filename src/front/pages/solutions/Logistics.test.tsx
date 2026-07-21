import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Logistics from "./Logistics";

function renderLogistics() {
  return render(
    <MemoryRouter initialEntries={["/solutions/logistics"]}>
      <Logistics />
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
});

describe("Logistics ページ (運行れんらく帳)", () => {
  it("見出し・課題共感・業界統計(出典付き)を表示する", () => {
    renderLogistics();

    expect(
      screen.getByRole("heading", {
        name: /紙の運転日報、請求書への手入力に毎月何時間かけていますか/,
      })
    ).toBeInTheDocument();

    expect(screen.getByText("配車計画がベテラン頼み")).toBeInTheDocument();
    expect(screen.getAllByText(/4%/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/国交省/).length).toBeGreaterThan(0);
  });

  it("仕組み(3ステップ)と先にお伝えしておくことを表示する", () => {
    renderLogistics();

    expect(
      screen.getByText("紙の運転日報は、写真を撮るだけで自動集計")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/電話でのやり取りは自動記録の対象外/)
    ).toBeInTheDocument();
  });

  it("メールでの相談CTAと、フォームからの相談導線の両方を表示する", () => {
    renderLogistics();

    const mailLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("mailto:"));
    expect(mailLinks.length).toBeGreaterThan(0);

    const contactLinks = screen
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));
    expect(contactLinks).toContain("/contact");
  });

  it("ページ別のdocument.titleを設定する", () => {
    renderLogistics();

    expect(document.title).toBe("運行れんらく帳 | 株式会社テックリード");
  });
});
