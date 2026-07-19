import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vite-plus/test";
import News from "./News";

afterEach(() => {
  cleanup();
});

describe("News ページ", () => {
  it("ページ別のdocument.titleを設定する", () => {
    render(
      <MemoryRouter initialEntries={["/news"]}>
        <News />
      </MemoryRouter>
    );

    expect(document.title).toBe("お知らせ | 株式会社テックリード");
  });
});
