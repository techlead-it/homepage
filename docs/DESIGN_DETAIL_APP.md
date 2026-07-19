<!-- generated-from: docs/DESIGN_NOTES.md -->

# ホームページ刷新 (DX特化) アプリ詳細設計 (DESIGN_DETAIL_APP.md)

生成日: 2026-07-19
ステータス: レビュー待ち (監査反映済み。/dev-impl 入力契約に合わせ旧 docs/DESIGN_DETAIL.md から分割)
種別: 設計書 (詳細設計・アプリ)
対象: techlead-it.com ホームページの情報設計刷新
概要設計: [DESIGN.md](./DESIGN.md)
インフラ詳細設計: [DESIGN_DETAIL_INFRA.md](./DESIGN_DETAIL_INFRA.md) (本刷新はインフラ変更が無いため N/A のみ)

## 目次

- [ルーティング変更](#ルーティング変更)
- [ナビゲーション設計](#ナビゲーション設計)
- [ページ別セクション構成 (ワイヤー)](#ページ別セクション構成-ワイヤー)
- [既存コンポーネントの行き先](#既存コンポーネントの行き先)
- [データ設計](#データ設計)
- [問い合わせフォーム変更](#問い合わせフォーム変更)
- [検証手順](#検証手順)
- [用語・成果物一覧](#用語成果物一覧)
- [依拠する外部事実](#依拠する外部事実)
- [リスク](#リスク)

## ルーティング変更

`src/front/App.tsx` の Routes を以下に変更する。

| パス                            | 状態         | コンポーネント                                    | 備考                                                                    |
| ------------------------------- | ------------ | ------------------------------------------------- | ----------------------------------------------------------------------- |
| `/`                             | 全面改修     | `Home`                                            | 経営者向けトップ                                                        |
| `/cases`                        | 新設         | `Cases`                                           | 匿名事例一覧                                                            |
| `/cases/:id`                    | 新設         | `CaseDetail`                                      | 未知の `id` は `/cases` へ redirect (既存 `SlideCategory` と同パターン) |
| `/about`                        | 維持         | `About`                                           | 実在性確認 (住所・会社概要) のため共用                                  |
| `/introduction`                 | リダイレクト | `<Navigate to="/engineers/philosophy" replace />` | 既存リンクの断絶防止                                                    |
| `/engineers`                    | 新設         | `Engineers`                                       | エンジニア向けハブ                                                      |
| `/engineers/philosophy`         | 新設 (移設)  | `Philosophy` (旧 `Introduction.tsx` を改名)       | コンテンツはほぼそのまま                                                |
| `/news` `/news/:id`             | 維持         | `News` / `NewsDetail`                             | 共用                                                                    |
| `/slides` `/slides/:categoryId` | 維持         | `Slides` / `SlideCategory`                        | 共用。導線はフッター「研修・資料」(ナビゲーション設計を参照)            |
| `/contact` `/contact/thanks`    | 改修 / 維持  | `Contact` / `ContactThanks`                       | 件名選択肢の再編 (後述)                                                 |

リダイレクトは SPA 内 (`react-router-dom` の `Navigate`) で完結し、`wrangler.jsonc` の変更は不要 (インフラ側は [DESIGN_DETAIL_INFRA.md](./DESIGN_DETAIL_INFRA.md) 参照)。

各ページは `useEffect` + `document.title` でページ別 title を設定する (ライブラリ導入なし)。

## ナビゲーション設計

### ヘッダー (経営者向け)

左からロゴ、以下のリンク。「30分無料相談」のみボタン強調 (主 CTA)。現行ヘッダーにある `/slides` と zenn 技術ブログのリンクはヘッダーから外す (行き先はフッターと `/engineers`)。

| 表示                                        | 遷移先                          |
| ------------------------------------------- | ------------------------------- |
| 事例                                        | `/cases`                        |
| 支援内容                                    | `/#services` (トップ内アンカー) |
| 支援の進め方                                | `/#process` (トップ内アンカー)  |
| 料金                                        | `/#pricing` (トップ内アンカー)  |
| 会社概要                                    | `/about`                        |
| お知らせ                                    | `/news`                         |
| 30分無料相談 (ボタン)                       | `/contact`                      |
| エンジニアの方へ (右端・控えめな文字リンク) | `/engineers`                    |

### フッター

ヘッダーと同一リンクに加えて以下を含める。

| 表示              | 遷移先                               |
| ----------------- | ------------------------------------ |
| 研修・資料        | `/slides`                            |
| エンジニアの方へ  | `/engineers`                         |
| 技術ブログ (zenn) | `https://zenn.dev/p/techlead` (外部) |
| 会社名・住所      | テキスト表記 (`company.ts`)          |

## ページ別セクション構成 (ワイヤー)

### トップ (`/`)

上から順に。コピーの最終文言は OI1 ([DESIGN.md 未解決の論点](./DESIGN.md#未解決の論点-open-issues)) としてライティング時に確定し、以下の「含める要素」とデータソースは構成として確定。旧トップにあったお知らせ抜粋 (NewsSection) は置かない (`/news` はヘッダー・フッターから到達)。

| #   | セクション                       | 含める要素                                                                                                                                                        | データソース                      |
| --- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| 1   | ヒーロー                         | キーメッセージ「作って終わりにしない。現場に根付くDXを、一緒に。」/ 課題サブコピー (紙・Excel・属人運用の語彙) / 「業種を問わず」の明記 / 30分無料相談 CTA ボタン | ページ直書き (コピーは OI1)       |
| 2   | 悩みの提示                       | 「こんな悩み、思い当たりませんか?」(dx.html の同名スライドを転用)                                                                                                 | `painPoints.ts` (新設)            |
| 3   | 支援できること (`id="services"`) | 現場DX・生成AI活用等の支援メニュー (dx.html「支援できること」を転用)                                                                                              | `services.ts` (経営者語彙に改修)  |
| 4   | 事例サマリ                       | 匿名事例 3 件のカード (業種+規模感 + 課題 1 行 (= `CaseStudy.title`) + 削減数値)。各カード → `/cases/:id`                                                         | `cases.ts` (新設)                 |
| 5   | 支援の進め方 (`id="process"`)    | 段階的定着プロセス (dx.html「現場DXを、段階的に定着させる」を転用)                                                                                                | `dxProcess.ts` (新設)             |
| 6   | 料金の目安 (`id="pricing"`)      | 金額の幅 (dx.html「料金の目安」を転用)。「まず相談で見積もり」の導き                                                                                              | `pricing.ts` (新設)               |
| 7   | 信用補強                         | 会社の強み (伴走姿勢・誠実さの語彙。技術自慢にしない)                                                                                                             | `strengths.ts` (経営者語彙に改修) |
| 8   | 相談 CTA                         | 「30分無料相談・準備不要」の明記 + `/contact` ボタン                                                                                                              | ページ直書き                      |

### `/cases` (事例一覧) / `/cases/:id` (事例詳細)

一覧: 事例カード 3 枚 (業種+規模感 / 課題起点の見出し (= `title`) / 削減数値ハイライト)。

詳細 (3 件共通の型):

| #   | セクション            | 含める要素                                                                                |
| --- | --------------------- | ----------------------------------------------------------------------------------------- |
| 1   | ヘッダ                | 課題起点の見出し (`title`) / 業種+規模感 (`industry` + `scale`)                           |
| 2   | 概要表                | 業種 (`industry`) / 規模感 (`scale`) / 支援範囲 (`supportScope`)。金額・期間は掲載しない  |
| 3   | 導入前の課題 (before) | 現場で何が起きていたか (`problem`。紙・Excel・属人運用の具体描写)                         |
| 4   | 支援内容              | 何を作り、どう定着させたか (`approach`。段階的プロセスとの対応)                           |
| 5   | 現場の変化 (after)    | 「現場がどう変わったか」の物語 (`outcome`) + 削減数値ハイライト (`metrics`)               |
| 6   | before/after 図解     | 業務フローの図解 (`flowBefore` / `flowAfter` から描画。実物スクショ・デモ URL は使わない) |
| 7   | CTA                   | 「同じような悩みがあれば 30分無料相談」+ `/contact`                                       |

事例 3 件と数値 (dx.html 突合済み)。数値の正式文字列は「約50%削減」のように「削減」まで含める:

| id                    | 業種 (`industry`) 案                                      | 数値ハイライト (`metrics`)                          |
| --------------------- | --------------------------------------------------------- | --------------------------------------------------- |
| `resort-hotel`        | リゾートホテル (規模感 `scale` はライティング時確定: OI2) | 確認・引き継ぎ時間 約50%削減 / 取りこぼしも減少     |
| `allergen-check`      | 食品を扱う事業者 (同上)                                   | 確認作業時間 約70%削減 / 見落としリスクも大幅低減   |
| `transport-documents` | 運送会社 (同上)                                           | 書類作成時間 約80%削減 / 提出漏れ・期限切れをゼロに |

課題・支援内容の記述の正本は dx.html の各事例スライドとし、ライティング時に肉付けする (事実にない数値・固有名を創作しない)。

### `/engineers` (エンジニア向けハブ)

既存のエンジニア向けコンテンツを集約する。データは既存の `src/front/data/` を流用。

| #   | セクション                      | 流用元データ                                                                                                     |
| --- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 1   | ヒーロー (エンジニア向けの一文) | 新規 (短文)                                                                                                      |
| 2   | 技術実績                        | `projects.ts` (旧トップの高難度受託実績)                                                                         |
| 3   | 技術スタックと熟練度            | `techStack.ts` (熟練度凡例含む)                                                                                  |
| 4   | 開発の進め方                    | `processSteps.ts` (トップの「支援の進め方」= `dxProcess.ts` とは別データ。エンジニア語彙のまま維持)              |
| 5   | 理念・技術ブログへのリンク      | `/engineers/philosophy` と zenn への導線                                                                         |
| 6   | 採用情報 (新規コンポーネント)   | `recruitment.ts` (データは既存流用。表示コンポーネントは新規実装 — 現状どこにも表示されておらず流用元が無いため) |

### `/engineers/philosophy` (理念)

旧 `Introduction.tsx` (`philosophy.ts`: ミッション・ビジョン「ギークなエンジニアの楽園」・バリュー等) を `Philosophy.tsx` に改名してほぼそのまま移設。コンテンツ改修は行わない。

### `/contact` (相談フォーム)

[問い合わせフォーム変更](#問い合わせフォーム変更) を参照。フォーム上部に「準備は不要です。現状の悩みを話すだけで大丈夫です」の説明文を添える。

## 既存コンポーネントの行き先

旧トップ (`Home.tsx`) が使用する `src/front/components/sections/` の 8 コンポーネントの振り分け。実装者の自己判断にしない。

| コンポーネント     | 行き先              | 備考                                                                                   |
| ------------------ | ------------------- | -------------------------------------------------------------------------------------- |
| `HeroSection`      | 改修                | 経営者向けヒーロー (ワイヤー #1) に書き換え                                            |
| `NewsSection`      | 削除                | トップに置かない決定のため。使用箇所は旧トップのみ                                     |
| `ServicesSection`  | 改修                | 「支援できること」(ワイヤー #3)。`services.ts` 改修版を表示                            |
| `ProjectsSection`  | `/engineers` へ移設 | 技術実績セクション                                                                     |
| `StrengthsSection` | 改修                | 「信用補強」(ワイヤー #7)。`strengths.ts` 改修版を表示                                 |
| `ProcessSection`   | `/engineers` へ移設 | 「開発の進め方」。トップの「支援の進め方」は新設コンポーネント (`dxProcess.ts` を表示) |
| `TechStackSection` | `/engineers` へ移設 | 熟練度凡例含む                                                                         |
| `CtaSection`       | 改修                | 相談 CTA (ワイヤー #8)。「30分無料相談・準備不要」文言に書き換え                       |

## データ設計

### `CaseStudy` 型 (新設: `src/front/types/index.ts` に追加)

```typescript
export interface CaseMetric {
  label: string; // 例: "確認・引き継ぎ時間"
  value: string; // 正式文字列。例: "約50%削減"
  note?: string; // 例: "取りこぼしも減少"
}

export interface CaseStudy {
  id: string; // 例: "resort-hotel"
  industry: string; // 業種。例: "リゾートホテル"
  scale: string; // 規模感。例: "数十室規模" (具体値は OI2)
  supportScope: string; // 支援範囲。例: "業務管理システムの開発と定着支援"
  title: string; // 課題起点の見出し。一覧カード・トップの事例サマリの「課題 1 行」にも使う
  problem: string; // 導入前の現場課題 (before)
  approach: string; // 支援内容・定着のさせ方
  outcome: string; // 現場の変化 (after) の物語
  metrics: CaseMetric[]; // 数値ハイライト
  flowBefore: string[]; // 図解用: 導入前の業務ステップ
  flowAfter: string[]; // 図解用: 導入後の業務ステップ
}
```

- 配置: `src/front/data/cases.ts` に 3 件 (データ駆動コンテンツモデル踏襲)
- before/after 図解は `flowBefore` / `flowAfter` からコンポーネントで描画する (画像アセット不要、匿名性を構造的に担保)

### トップ用データ (新設・改修)

| データ             | 型 (新設)                                      | 配置                                             | 内容の正本                                  |
| ------------------ | ---------------------------------------------- | ------------------------------------------------ | ------------------------------------------- |
| 悩み提示           | `PainPoint` (見出し・説明)                     | `src/front/data/painPoints.ts` (新設)            | dx.html「こんな悩み、思い当たりませんか？」 |
| 支援できること     | 既存 `Service` 型を流用                        | `src/front/data/services.ts` (経営者語彙に改修)  | dx.html「支援できること」                   |
| 段階的定着プロセス | `DxProcessStep` (段階名・説明)                 | `src/front/data/dxProcess.ts` (新設)             | dx.html「現場DXを、段階的に定着させる」     |
| 料金の目安         | `PricingTier` (プラン名・金額幅・含まれるもの) | `src/front/data/pricing.ts` (新設)               | dx.html「料金の目安」                       |
| 会社の強み         | 既存 `Strength` 型を流用                       | `src/front/data/strengths.ts` (経営者語彙に改修) | 新規ライティング (技術自慢にしない)         |

`projects.ts` / `techStack.ts` / `processSteps.ts` / `recruitment.ts` / `philosophy.ts` は無改修で `/engineers` 系ページから流用する。

## 問い合わせフォーム変更

新フィールドは追加しない。既存 `subject` (select) の選択肢を再編する。スキーマ (`src/shared/schemas/contact.ts`)・型 (`src/shared/types/contact.ts`)・メールテンプレート (`src/server/emails/contact-notification.tsx`) はすべて変更なし (subject は自由文字列として検証され、メール本文に表示済みのため)。

| 項目             | 変更前                                                                                  | 変更後                                                                             |
| ---------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `subject` 選択肢 | 「選択してください (空)」「サービスについて」「お見積り依頼」「採用について」「その他」 | 「**30分無料相談**」「サービスについて」「お見積り依頼」「採用について」「その他」 |
| 初期選択         | 空 (要選択)                                                                             | 「30分無料相談」                                                                   |

- KPI 計測: 受信メールの件名区分「30分無料相談」を月次で目視集計する (追加実装なし)
- `POST /api/contact` の外部契約 (リクエスト・レスポンス形式) は変更しない

## 検証手順

自動系は `vp test` (vitest + jsdom)。テストは実装時に TDD で作成し、以下の観点を必ず含める。

- G1 検証: `vp test src/front/pages/Home.test.tsx` — トップのレンダリングで、課題語彙 (「紙」「Excel」「属人」) を含むコピー・「業種を問わず」相当の明記・料金目安セクション (金額幅の文字列)・「30分無料相談」CTA の存在をアサートし exit 0
- G2 検証: `vp test src/front/pages/Cases.test.tsx src/front/pages/CaseDetail.test.tsx` — 一覧から 3 件の詳細への遷移 (MemoryRouter)、各詳細で業種 (`industry`) と規模感 (`scale`) の表示・「約50%削減」「約70%削減」「約80%削減」の数値・before/after 図解要素の存在をアサートし exit 0
- G3 検証: `vp test src/front/pages/Contact.test.tsx` — 件名 select の初期値が「30分無料相談」であること・その値のまま送信するとバリデーションが通り thanks へ遷移することをアサートし exit 0 (通知メールへの件名表示は既存実装のため追加検証しない。依拠する外部事実を参照)
- G4 検証: `vp test src/front/App.test.tsx` — MemoryRouter で `/engineers` `/engineers/philosophy` のレンダリングと、`/introduction` 訪問時に理念コンテンツ (philosophy.ts の文言) が表示されることをアサートし exit 0
- G5 検証: `vp test src/front/App.test.tsx` — `/` `/cases` `/cases/:id` `/contact` のレンダリング結果に「ギークなエンジニアの楽園」の文言が含まれないことをアサートし exit 0
- G_E2E 検証 (手動): `pnpm dev` を起動し Chrome で以下を URL 直叩きなしで実施: (1) トップ表示 → 事例カードをタップ → 事例詳細 → 詳細内 CTA → `/contact` で件名「30分無料相談」のまま入力・送信 → thanks 画面 (2) トップ → ヘッダー右端「エンジニアの方へ」→ `/engineers` → 理念リンク → `/engineers/philosophy` (3) フッター「研修・資料」→ `/slides`。全遷移で console error が 0 件、各ページのタブタイトル (document.title) がページ別になっていること

## 用語・成果物一覧

| 固有名                                                                | 定義箇所                                       | 生成者                                                   | 消費者                                                                 |
| --------------------------------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------- |
| `CaseStudy` / `CaseMetric` 型                                         | 本書「データ設計」→ `src/front/types/index.ts` | 実装フェーズ                                             | `cases.ts` / `Cases.tsx` / `CaseDetail.tsx` / `Home.tsx` (事例サマリ)  |
| `PainPoint` / `DxProcessStep` / `PricingTier` 型                      | 本書「データ設計」→ `src/front/types/index.ts` | 実装フェーズ                                             | `painPoints.ts` / `dxProcess.ts` / `pricing.ts` とトップの各セクション |
| `src/front/data/cases.ts` `painPoints.ts` `dxProcess.ts` `pricing.ts` | 本書「データ設計」                             | 実装フェーズ (内容の正本は dx.html)                      | トップ・事例ページ                                                     |
| `subject` 選択肢「30分無料相談」                                      | 本書「問い合わせフォーム変更」                 | 実装フェーズ (`Contact.tsx`)                             | 通知メール (既存表示) / KPI 月次目視集計                               |
| `Engineers.tsx` / `Philosophy.tsx`                                    | `src/front/pages/`                             | 実装フェーズ (`Philosophy` は旧 `Introduction.tsx` 改名) | `App.tsx` ルーティング                                                 |
| 匿名表記ルール (業種+規模感)                                          | `docs/DESIGN_NOTES.md` 情報設計節              | 決定済み (規模感の具体値は OI2)                          | `cases.ts` の `industry` / `scale`                                     |
| dx.html                                                               | `public/slides/company/dx.html`                | 既存 (営業資料)                                          | 事例・悩み・料金・プロセスの内容の正本                                 |

## 依拠する外部事実

確認日: 2026-07-19 (いずれも rg / ls で実測)

- 現行 SPA ルートは `/` `/about` `/introduction` `/news` `/news/:id` `/slides` `/slides/:categoryId` `/contact` `/contact/thanks` の 9 本 (`src/front/App.tsx` L18-26)
- `wrangler.jsonc` は `not_found_handling: "single-page-application"` / `run_worker_first: ["/api/*", "/preview/*"]` / `html_handling: "none"` (L9-11) — 新設 SPA ルートは追加設定なしで配信される
- `public/slides/company/dx.html` に「約50%削減 (確認・引き継ぎ時間)」「約70%削減 (確認作業時間)」「約80%削減 (書類作成時間)」およびスライド見出し「こんな悩み、思い当たりませんか？」「支援できること」「現場DXを、段階的に定着させる」「料金の目安」が存在する
- `Contact.tsx` の `subject` は select で選択肢は「サービスについて」「お見積り依頼」「採用について」「その他」(L204-208)。スキーマ (`src/shared/schemas/contact.ts`) は subject を自由文字列として検証し選択肢は縛らない。通知メール (`src/server/emails/contact-notification.tsx`) は subject を本文に表示している (L126)
- 旧トップ (`Home.tsx`) は `HeroSection` `NewsSection` `ServicesSection` `ProjectsSection` `StrengthsSection` `ProcessSection` `TechStackSection` `CtaSection` の 8 コンポーネントを使用。`NewsSection` の使用箇所は旧トップのみ
- 現行 `Header.tsx` には `/slides` と `https://zenn.dev/p/techlead` へのリンクが存在する (L57, L63, L128, L135)
- `src/front/data/` に `projects.ts` `techStack.ts` `processSteps.ts` `recruitment.ts` `philosophy.ts` `services.ts` `strengths.ts` `company.ts` が存在する。うち `recruitment.ts` ({ description, email }) はどのコンポーネントからも現在消費されておらず、`/recruitment` ルートも存在しない (CLAUDE.md の記載は実装と乖離)
- 既存の OGP 画像生成 (`scripts/` + `plugins/`) は news 記事の Markdown frontmatter を前提とする (事例 OGP へ流用する場合は形式差の吸収が必要)

## リスク

| リスク                                                                            | 対策・状態                                                                                                               |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 匿名事例の信用力が実名に劣る                                                      | 実数値 (約50%/約70%/約80%削減) + before/after 図解で補強する方針を決定済み。効果は KPI (相談予約数の月次目視集計) で観測 |
| トップのコピー文言が未確定 (OI1)                                                  | 構成 (含める要素・データソース) は確定済みのため実装は着手可能。文言はライティング時に案出しして決定                     |
| 事例本文の正本 (dx.html) の記述が薄い場合、肉付けで事実にない内容を創作するリスク | ライティング時にユーザに事実確認を取ってから掲載する                                                                     |
| 「エンジニアの方へ」導線が控えめすぎて採用流入が減る                              | 採用は紹介・技術発信 (zenn) が主経路のため許容。問題が出たら導線を強める                                                 |
| 事例 OGP 画像生成 (オプション) の流用方法が未設計                                 | オプション機能のため本体実装をブロックしない。着手時に frontmatter 形式差の吸収方法を設計する                            |
