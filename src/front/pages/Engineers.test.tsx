import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Engineers from "./Engineers";

function renderEngineers() {
  return render(
    <MemoryRouter initialEntries={["/engineers"]}>
      <Engineers />
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
});

describe("Engineers ページ", () => {
  it("技術実績・技術スタック・開発プロセス・採用情報・理念リンク・zennリンクを表示する", () => {
    renderEngineers();

    expect(screen.getByText("実績紹介")).toBeInTheDocument();
    expect(screen.getByText("技術スタック")).toBeInTheDocument();
    expect(screen.getByText("開発プロセス")).toBeInTheDocument();
    expect(
      screen.getByText(/kanehira\.sho@techlead-it\.com/)
    ).toBeInTheDocument();

    const philosophyLink = screen.getByRole("link", { name: /企業理念|理念/ });
    expect(philosophyLink).toHaveAttribute("href", "/engineers/philosophy");

    const zennLink = screen.getByRole("link", { name: /zenn|技術ブログ/i });
    expect(zennLink).toHaveAttribute("href", "https://zenn.dev/p/techlead");
  });
});
