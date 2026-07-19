import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vite-plus/test";
import { usePageTitle } from "./usePageTitle";

afterEach(() => {
  document.title = "";
});

describe("usePageTitle", () => {
  it("指定した文字列をdocument.titleに設定する", () => {
    renderHook(() => usePageTitle("会社概要"));

    expect(document.title).toBe("会社概要 | 株式会社テックリード");
  });

  it("titleが変わると再設定される", () => {
    const { rerender } = renderHook(
      ({ title }: { title: string }) => usePageTitle(title),
      { initialProps: { title: "ページA" } }
    );
    expect(document.title).toBe("ページA | 株式会社テックリード");

    rerender({ title: "ページB" });
    expect(document.title).toBe("ページB | 株式会社テックリード");
  });
});
