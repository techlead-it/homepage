import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Food from "./Food";

function renderFood() {
  return render(
    <MemoryRouter initialEntries={["/solutions/food"]}>
      <Food />
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
});

describe("Food ページ (受注れんらく帳)", () => {
  it("見出し・課題共感・業界統計(出典付き)を表示する", () => {
    renderFood();

    expect(
      screen.getByRole("heading", {
        name: /毎朝届くFAXの注文書、入力するだけで一日が終わっていませんか/,
      })
    ).toBeInTheDocument();

    expect(screen.getByText("FAX・電話受注の手入力")).toBeInTheDocument();
    expect(screen.getAllByText(/67/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/ハンモック/).length).toBeGreaterThan(0);
  });

  it("仕組み(3ステップ)と先にお伝えしておくことを表示する", () => {
    renderFood();

    expect(
      screen.getByText("受注のFAXは、複合機の転送設定でそのまま取り込み")
    ).toBeInTheDocument();
    expect(screen.getByText(/賞味期限・ロットの実地確認/)).toBeInTheDocument();
  });

  it("メールでの相談CTAと、フォームからの相談導線の両方を表示する", () => {
    renderFood();

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
    renderFood();

    expect(document.title).toBe("受注れんらく帳 | 株式会社テックリード");
  });
});
