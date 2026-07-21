import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Philosophy from "./Philosophy";

function renderPhilosophy() {
  return render(
    <MemoryRouter initialEntries={["/engineers/philosophy"]}>
      <Philosophy />
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
});

describe("Philosophy ページ", () => {
  it("理念コンテンツを表示する", () => {
    renderPhilosophy();

    expect(screen.getByText(/ギークなエンジニアの楽園/)).toBeInTheDocument();
  });

  it("ページ別のdocument.titleを設定する", () => {
    renderPhilosophy();

    expect(document.title).toBe("企業理念 | 株式会社テックリード");
  });
});
