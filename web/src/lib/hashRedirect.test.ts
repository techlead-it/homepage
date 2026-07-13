import { describe, expect, it } from "vite-plus/test";
import { hashToPath } from "./hashRedirect";

describe("hashToPath", () => {
  it("converts a hash route to a path", () => {
    expect(hashToPath("#/about")).toBe("/about");
  });

  it("preserves query strings after the hash route", () => {
    expect(hashToPath("#/news/x?a=1")).toBe("/news/x?a=1");
  });

  it("returns null for an empty hash", () => {
    expect(hashToPath("")).toBeNull();
  });

  it("returns null for a non-route hash fragment", () => {
    expect(hashToPath("#section")).toBeNull();
  });
});
