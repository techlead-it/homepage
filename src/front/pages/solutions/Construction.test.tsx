import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Construction from "./Construction";

function renderConstruction() {
  return render(
    <MemoryRouter initialEntries={["/solutions/construction"]}>
      <Construction />
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
});

describe("Construction ページ (現場れんらく帳)", () => {
  it("見出し・課題共感・業界統計(出典付き)を表示する", () => {
    renderConstruction();

    expect(
      screen.getByRole("heading", {
        name: /協力会社との連絡、「言った言わない」になっていませんか/,
      })
    ).toBeInTheDocument();

    expect(screen.getByText("連絡手段がバラバラ")).toBeInTheDocument();
    expect(screen.getAllByText(/28\.3/).length).toBeGreaterThan(0);
    expect(screen.getByText(/ANDPAD/)).toBeInTheDocument();
  });

  it("仕組み(3ステップ)と先にお伝えしておくことを表示する", () => {
    renderConstruction();

    expect(
      screen.getByText("いつものLINEグループに、アカウントを1つ招待")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/電話の通話内容は自動記録の対象外/)
    ).toBeInTheDocument();
  });

  it("メールでの相談CTAと、フォームからの相談導線の両方を表示する", () => {
    renderConstruction();

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
    renderConstruction();

    expect(document.title).toBe("現場れんらく帳 | 株式会社テックリード");
  });
});
