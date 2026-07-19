import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vite-plus/test";
import Layout from "./Layout";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Layout のスクロール制御", () => {
  it("URL に hash があり対象要素が存在する場合、その要素へ scrollIntoView する", () => {
    const scrollIntoViewMock = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(
      <MemoryRouter initialEntries={["/#pricing"]}>
        <Layout>
          <div id="pricing">料金セクション</div>
        </Layout>
      </MemoryRouter>
    );

    expect(scrollIntoViewMock).toHaveBeenCalled();
    expect(scrollToMock).not.toHaveBeenCalled();
  });

  it("URL に hash が無い場合、ページ先頭へ scrollTo(0, 0) する", () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(
      <MemoryRouter initialEntries={["/about"]}>
        <Layout>
          <div>会社概要</div>
        </Layout>
      </MemoryRouter>
    );

    expect(scrollToMock).toHaveBeenCalledWith(0, 0);
  });
});
