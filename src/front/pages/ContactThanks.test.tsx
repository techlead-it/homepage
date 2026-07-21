import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vite-plus/test";
import ContactThanks from "./ContactThanks";

afterEach(() => {
  cleanup();
});

describe("ContactThanks ページ", () => {
  it("ページ別のdocument.titleを設定する", () => {
    render(
      <MemoryRouter initialEntries={["/contact/thanks"]}>
        <ContactThanks />
      </MemoryRouter>
    );

    expect(document.title).toBe("送信完了 | 株式会社テックリード");
  });
});
