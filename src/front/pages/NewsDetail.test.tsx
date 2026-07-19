import { cleanup, render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it } from "vite-plus/test";
import NewsDetail from "./NewsDetail";

afterEach(() => {
  cleanup();
});

describe("NewsDetail ページ", () => {
  it("記事のtitleをdocument.titleに設定する", () => {
    render(
      <MemoryRouter initialEntries={["/news/2025-07-08-perftokyo"]}>
        <Routes>
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(document.title).toBe(
      "perf.tokyo #1を開催しました | 株式会社テックリード"
    );
  });
});
