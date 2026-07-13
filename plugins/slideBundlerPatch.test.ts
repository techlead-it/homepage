import { describe, expect, it } from "vite-plus/test";
import { patchSlideBundler } from "./slideBundlerPatch";

const BUNDLER_HTML = `<!doctype html>
<html>
  <body>
    <script>
      document.addEventListener("DOMContentLoaded", async function () {
        window.addEventListener(
          "error",
          function (e) {
            var p = document.body || document.documentElement;
            var d = document.getElementById("__bundler_err") || p.appendChild(document.createElement("div"));
            d.id = "__bundler_err";
            d.textContent = "[bundle] " + (e.message || e.type);
          },
          true
        );

        try {
          const manifestEl = document.querySelector('script[type="__bundler/manifest"]');
          if (!manifestEl) throw new Error("missing manifest");
          if (
            window.Babel &&
            typeof window.Babel.transformScriptTags === "function"
          ) {
            window.Babel.transformScriptTags();
          }
        } catch (err) {
          console.error("Bundle unpack error:", err);
        }
      });
    </script>
  </body>
</html>`;

describe("patchSlideBundler", () => {
  it("inserts a __bundlerReady guard at the start of the error handler body", () => {
    const patched = patchSlideBundler(BUNDLER_HTML);
    expect(patched).toMatch(
      /function\s*\(\s*e\s*\)\s*\{\s*if\s*\(\s*window\.__bundlerReady\s*\)\s*return\s*;/
    );
  });

  it("inserts window.__bundlerReady=true just before the catch clause", () => {
    const patched = patchSlideBundler(BUNDLER_HTML);
    expect(patched).toMatch(
      /window\.__bundlerReady\s*=\s*true\s*;\s*\}\s*catch\s*\(\s*err\s*\)/
    );
  });

  it("returns html unchanged when the bundler pattern is absent", () => {
    const plainHtml = `<!doctype html><html><body><p>hello</p></body></html>`;
    expect(patchSlideBundler(plainHtml)).toBe(plainHtml);
  });

  it("is idempotent: patching an already-patched html returns the same string", () => {
    const once = patchSlideBundler(BUNDLER_HTML);
    const twice = patchSlideBundler(once);
    expect(twice).toBe(once);
  });

  it("only inserts each patch fragment once even if patched repeatedly", () => {
    const patched = patchSlideBundler(patchSlideBundler(BUNDLER_HTML));
    const guardOccurrences = patched.match(
      /if\s*\(\s*window\.__bundlerReady\s*\)\s*return/g
    );
    const flagOccurrences = patched.match(/window\.__bundlerReady\s*=\s*true/g);
    expect(guardOccurrences?.length).toBe(1);
    expect(flagOccurrences?.length).toBe(1);
  });
});
