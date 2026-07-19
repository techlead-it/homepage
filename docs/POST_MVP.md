# POST_MVP: ホームページ刷新 (DX特化)

生成元: dev-impl run_id=20260719-202003 (2026-07-19)
対象: docs/DESIGN.md のゴール達成状況と、実装スコープ外の既知ギャップ

## ゴール達成状況

第三者受入監査 (review-spec-compliance mode:post-impl / review-product-readiness) による判定。

| ゴール | 判定 | 根拠 |
| --- | --- | --- |
| G1 | achieved | `vp test src/front/pages/Home.test.tsx` 5 passed。キーメッセージ・課題語彙・業種不問・料金目安・CTA を実質アサート |
| G2 | achieved (検証は部分的) | `vp test` 5 passed だが詳細ページ検証は3件中 resort-hotel のみ。他2件 (allergen-check, transport-documents) は自動検証されていない |
| G3 | achieved | `vp test src/front/pages/Contact.test.tsx` 9 passed。初期値・送信・payload を検証 |
| G4 | achieved (検証は部分的) | ルーティングは実在確認済みだが、G4 検証コマンド自体は `/engineers` `/engineers/philosophy` のレンダリング内容を直接アサートしていない (リダイレクトのみ) |
| G5 | **手動確認待ち** (vacuous_verification, high) | 検証コマンド (`vp test src/front/App.test.tsx`) が空虚と判定 (App.test.tsx はリダイレクトテスト1件のみで、`/` `/cases` `/cases/:id` `/contact` に「ギークなエンジニアの楽園」が無いことをアサートしていない)。監査エージェントが `rg` で事実確認した限りでは「ギークなエンジニアの楽園」の消費者は `Philosophy.tsx` のみで満たされていそうだが、**自動検証が骨抜きの状態でのユーザ確認が必要** (dev-impl の方針上、検証コマンドの弱さを実装者自身が「直す」形にはしていない) |
| G_E2E | achieved | Playwright による実クリック検証で、事例詳細→相談フォーム送信、エンジニアの方へ→理念ページの両シナリオとも URL 直叩きなしで到達確認。nav_unreachable (high) 0件 |

**ユーザへの確認依頼**: G5 (経営者向け4ページにエンジニア向け訴求が出ないこと) をブラウザで目視確認したうえで、`App.test.tsx` に不在アサーションを追加してよいか判断してください。追加する場合のテスト内容:

```ts
it("経営者向けページにエンジニア向け採用訴求が含まれない", () => {
  for (const path of ["/", "/cases", "/cases/resort-hotel", "/contact"]) {
    // render each path, assert screen.queryByText(/ギークなエンジニアの楽園/) is null
  }
});
```

## UI/UX gap (dev-impl 20260719-202003 時点)

### 未実装画面
なし (DESIGN.md 記載の全画面が実装済み)

### 未実装ナビ経路
なし (review-product-readiness の nav_unreachable finding は全フェーズで0件)

### 未対応の横断UX項目 (フェーズ1から継続する既存事象。本刷新のスコープ外)

- **ErrorBoundary 不在** (severity: high, 全フェーズの review-product-readiness で継続検出): `src/front` 配下に ErrorBoundary が1件も無く、実行時エラーで画面全体がホワイトアウトする。本刷新以前からの既存状態
- **404 catch-all ルート不在** (severity: high, 同上): 未定義パスで `<main>` が空白になり、ホームへ戻る導線が無い (`App.tsx`)。react-router の "No routes matched" warning が出る

### 検証カバレッジの不足 (自動修正はせず記録のみ)

- CaseDetail.test.tsx の詳細アサーションが `resort-hotel` 1件のみ (`allergen-check` / `transport-documents` は未検証。パラメータ化 (it.each) での拡張を推奨)
- App.test.tsx が `/engineers` `/engineers/philosophy` のレンダリング内容を直接アサートしていない (リダイレクトテストのみ)
- G5 の検証コマンドが空虚 (上記「ユーザへの確認依頼」参照)

### 環境起因 (コード欠陥ではない)

- dev 環境で `/api/contact` への実送信が 500 になる (`.dev.vars` に `RESEND_API_KEY` 等が未設定のため)。E2E 検証は API レスポンスを mock して UI 遷移のみ確認した。実送信を含む厳密な検証には `.dev.vars` の整備が必要
- 全ページで Cloudflare Insights beacon の CORS エラーが console に出る (`index.html` の beacon スクリプトが `localhost` からの XHR を拒否される。本番 origin では発生しない見込み)

### frontend-design 未適用フラグ
適用済 (既存の Tailwind CSS v4 デザインシステムを踏襲。新規デザインシステム導入はスコープ外)

### a11y 未対応項目
review-product-readiness の実行範囲では violations 検出なし (aria-label 等は既存パターンを踏襲)

### 視覚的回帰参照
- スナップショット: `/tmp/review-product-readiness-snapshots/phase-{1,2,3,4,5,6}/`, `/tmp/review-product-readiness-snapshots/g_e2e/`
