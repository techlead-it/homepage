import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vite-plus/test";
import App from "./App";

function renderAppAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
});

describe("App のルーティング", () => {
  it("/introduction にアクセスすると /engineers/philosophy の理念コンテンツが表示される", () => {
    renderAppAt("/introduction");

    expect(
      screen.getByText(/ギークなエンジニアの楽園/)
    ).toBeInTheDocument();
  });
});
