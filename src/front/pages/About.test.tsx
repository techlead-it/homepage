import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vite-plus/test";
import About from "./About";

afterEach(() => {
  cleanup();
});

describe("About ページ", () => {
  it("ページ別のdocument.titleを設定する", () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <About />
      </MemoryRouter>
    );

    expect(document.title).toBe("会社概要 | 株式会社テックリード");
  });
});
