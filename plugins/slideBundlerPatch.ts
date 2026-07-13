// Claude Design 生成 Bundler HTML の window.error listener を、
// Bundler 展開完了後の外部由来 (Cloudflare Bot Fight Mode の inject など)
// エラーで発火させないためのパッチ。
//
// 手法: DOMContentLoaded ハンドラの try ブロック末尾で `window.__bundlerReady = true`
// を立て、error listener の先頭でそれを見て早期リターンする。

const READY_FLAG = "window.__bundlerReady";
const GUARD_SNIPPET = `if(${READY_FLAG})return;`;
const FLAG_SNIPPET = `${READY_FLAG}=true;`;

const ERROR_HANDLER_OPEN =
  /window\.addEventListener\s*\(\s*"error"\s*,\s*function\s*\([^)]*\)\s*\{/;
const CATCH_ERR_CLAUSE = /\}\s*catch\s*\(\s*err\s*\)/;

export function patchSlideBundler(html: string): string {
  if (html.includes(READY_FLAG)) {
    return html;
  }
  if (!ERROR_HANDLER_OPEN.test(html) || !CATCH_ERR_CLAUSE.test(html)) {
    return html;
  }
  return html
    .replace(ERROR_HANDLER_OPEN, (match) => `${match}${GUARD_SNIPPET}`)
    .replace(CATCH_ERR_CLAUSE, (match) => `${FLAG_SNIPPET}${match}`);
}
