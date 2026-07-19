<!-- dev-spec:approved goals_sha=27fbaa6f212996e10d4339039049096220f7bc276054dc1462a9622ffe189b8b -->

# TODO: ホームページ刷新 (DX特化)

作成日: 2026-07-19
生成元: workflow-design-notes (todo-generation 手順を使用)
設計書: docs/DESIGN.md + docs/DESIGN_DETAIL_APP.md + docs/DESIGN_DETAIL_INFRA.md (インフラ変更が発生しないため INFRA 側は全項目 N/A・INFRA フェーズは無し)
承認: ユーザが AskUserQuestion で承認 (2026-07-19)。dev-spec の対話承認ゲートと同義の承認として扱う (goals_sha は本タスクリスト確定後に算出)

## 概要

techlead-it.com のホームページを、IT 企業向け高難度受託の顔から「非IT中小企業の経営者向け現場DX支援」の顔へ全面刷新する。ホームページの役割は「紹介・営業後の検証装置」。既存のエンジニア向けコンテンツ (技術実績・技術スタック・理念・採用) は `/engineers` 配下に集約して温存する。範囲は `src/front` のみ (スキーマ・API 外部契約・インフラは無変更)。

## 実装タスク

### フェーズ1: Philosophy 移設 + /engineers ハブ新設 + ルーティング基盤 (G4)

`ProjectsSection` / `ProcessSection` / `TechStackSection` はこのフェーズで `/engineers` に持ち込む (Home.tsx からは外さない。フェーズ3 で外す。React コンポーネントは複数箇所から呼べるため一時的な重複使用は問題ない)。

- [ ] [STRUCTURAL] `src/front/pages/Introduction.tsx` を `Philosophy.tsx` に、`Introduction.test.tsx` (存在すれば) を `Philosophy.test.tsx` にリネーム。中身は変更しない (動作不変)
- [ ] [RED] `src/front/App.test.tsx` に `/introduction` 訪問で `/engineers/philosophy` へリダイレクトされ理念コンテンツ (`philosophy.ts` の "ギークなエンジニアの楽園" 等) が表示されるテストを追加 (失敗確認)
- [ ] [GREEN] `App.tsx` に `/engineers/philosophy` ルート (`Philosophy` コンポーネント) を追加し、`/introduction` を `<Navigate to="/engineers/philosophy" replace />` に変更
- [ ] [RED] `src/front/pages/Engineers.test.tsx` (新規) に `/engineers` のレンダリングテストを作成: ヒーロー文言・技術実績 (`projects.ts` 由来)・技術スタック (`techStack.ts` 由来・熟練度凡例含む)・開発の進め方 (`processSteps.ts` 由来)・採用情報 (`recruitment.ts` の email 表示)・`/engineers/philosophy` へのリンク・zenn 技術ブログへの外部リンクの存在をアサート (失敗確認)
- [ ] [GREEN] `src/front/pages/Engineers.tsx` を新規作成し、`ProjectsSection` / `TechStackSection` / `ProcessSection` を流用してレンダリング。理念リンクと zenn 外部リンクを追加
- [ ] [GREEN] 採用情報表示用の新規コンポーネント `RecruitmentSection` を作成し `recruitment.ts` (`description` / `email`) を表示 (既存に流用元コンポーネントは無いため新規実装。[DESIGN_NOTES.md 訂正](./DESIGN_NOTES.md) 参照)
- [ ] [GREEN] `App.tsx` に `/engineers` ルート (`Engineers` コンポーネント) を追加
- [ ] [REFACTOR] `Engineers.tsx` のセクション構成・余白調整
- [ ] [REVIEW] フェーズ実装の簡易セルフレビューと修正
- [ ] [CHECK] `vp check` と `vp test` の実行と確認

### フェーズ2: 匿名事例ページ /cases・/cases/:id 新設 (G2)

- [ ] [RED] `src/front/types/index.ts` を編集する前に、`CaseStudy` / `CaseMetric` 型を使う `src/front/data/cases.test.ts` (または `Cases.test.tsx` 内) で型の期待構造を使ったテストを先に書く方針は取らず、型定義自体はテスト対象外の静的型のため次の GREEN で追加する (型はプロダクションコードだが振る舞いを持たないため RED を要しない。testing.md の「振る舞いをテストする」原則に基づく判断)
- [ ] [GREEN] `src/front/types/index.ts` に `CaseMetric` (`label` / `value` / `note?`) と `CaseStudy` (`id` / `industry` / `scale` / `supportScope` / `title` / `problem` / `approach` / `outcome` / `metrics` / `flowBefore` / `flowAfter`) を追加
- [ ] [GREEN] `src/front/data/cases.ts` を新規作成し、3 件のデータを dx.html を正本に記述 (`resort-hotel` = 約50%削減・確認/引き継ぎ時間、`allergen-check` = 約70%削減・確認作業時間、`transport-documents` = 約80%削減・書類作成時間。`scale` の具体値は事実確認のうえ記述。OI2 参照)
- [ ] [RED] `src/front/pages/Cases.test.tsx` (新規) に一覧表示テストを作成: 3 件のカード (業種+規模感 / `title` / 数値ハイライト) が表示され、各カードが `/cases/:id` にリンクすることをアサート (失敗確認)
- [ ] [GREEN] `src/front/pages/Cases.tsx` を新規作成
- [ ] [RED] `src/front/pages/CaseDetail.test.tsx` (新規) に詳細表示テストを作成: `title` / 業種・規模感・支援範囲の概要表 / `problem` / `approach` / `outcome` / `metrics` (「約50%削減」等の正式文字列) / before-after 図解要素の存在、未知の `id` で `/cases` へリダイレクトされることをアサート (失敗確認)
- [ ] [GREEN] `src/front/pages/CaseDetail.tsx` を新規作成 (未知 id は `<Navigate to="/cases" replace />`。既存 `SlideCategory.tsx` のパターンを参照)。before/after 図解は `flowBefore` / `flowAfter` から描画する小コンポーネントとして実装 (画像アセット不使用)
- [ ] [GREEN] `App.tsx` に `/cases` `/cases/:id` ルートを追加
- [ ] [REFACTOR] 事例カード・詳細表示の共通スタイル抽出
- [ ] [REVIEW] フェーズ実装の簡易セルフレビューと修正
- [ ] [CHECK] `vp check` と `vp test` の実行と確認

### フェーズ3: トップページ全面改修 (G1, G5)

既存 `Home.tsx` の 8 コンポーネント使用を、[既存コンポーネントの行き先](./DESIGN_DETAIL_APP.md#既存コンポーネントの行き先) の振り分けどおりに変更する。`ProjectsSection` / `ProcessSection` / `TechStackSection` の import はここで `Home.tsx` から削除する (フェーズ1 で `/engineers` に持ち込み済み)。`NewsSection` はここで削除する。

- [ ] [GREEN] `src/front/types/index.ts` に `PainPoint` (見出し・説明) / `DxProcessStep` (段階名・説明) / `PricingTier` (プラン名・金額幅・含まれるもの) を追加
- [ ] [GREEN] `src/front/data/painPoints.ts` を新規作成 (dx.html「こんな悩み、思い当たりませんか？」を正本に記述)
- [ ] [GREEN] `src/front/data/dxProcess.ts` を新規作成 (dx.html「現場DXを、段階的に定着させる」を正本に記述)
- [ ] [GREEN] `src/front/data/pricing.ts` を新規作成 (dx.html「料金の目安」を正本に記述)
- [ ] [GREEN] `src/front/data/services.ts` を経営者語彙に改修 (dx.html「支援できること」を正本に、現場DX・生成AI活用等の支援メニューへ書き換え)
- [ ] [GREEN] `src/front/data/strengths.ts` を経営者語彙に改修 (伴走姿勢・誠実さの語彙に書き換え。技術自慢の表現を排除)
- [ ] [RED] `src/front/pages/Home.test.tsx` を全面書き換え: 課題語彙 (「紙」「Excel」「属人」を含む文字列)・「業種を問わず」相当の明記・キーメッセージ「作って終わりにしない。現場に根付くDXを、一緒に。」・料金目安 (金額幅の文字列)・「30分無料相談」CTA・事例サマリ 3 件へのリンク・「ギークなエンジニアの楽園」が含まれないことをアサート (失敗確認)
- [ ] [GREEN] `HeroSection` を経営者向けヒーロー (キーメッセージ・課題サブコピー・業種不問明記・CTA ボタン) に改修
- [ ] [GREEN] `PainPointSection` を新規作成し `painPoints.ts` を表示
- [ ] [GREEN] `ServicesSection` の表示内容を改修後の `services.ts` に合わせて調整 (`id="services"`)
- [ ] [GREEN] `CaseSummarySection` を新規作成し `cases.ts` から 3 件のカード (業種+規模感 / `title` / 数値ハイライト) を表示、各カードを `/cases/:id` にリンク
- [ ] [GREEN] `DxProcessSection` を新規作成し `dxProcess.ts` を表示 (`id="process"`)
- [ ] [GREEN] `PricingSection` を新規作成し `pricing.ts` を表示 (`id="pricing"`)
- [ ] [GREEN] `StrengthsSection` の表示内容を改修後の `strengths.ts` に合わせて調整 (信用補強セクション)
- [ ] [GREEN] `CtaSection` の文言を「30分無料相談・準備不要」に書き換え
- [ ] [GREEN] `Home.tsx` を全面書き換え: `NewsSection` `ProjectsSection` `ProcessSection` `TechStackSection` の import を削除し、上記セクションを設計順 (ヒーロー→悩み→支援内容→事例サマリ→進め方→料金→信用補強→CTA) で配置
- [ ] [GREEN] `src/front/components/sections/NewsSection.tsx` を削除 (使用箇所が `Home.tsx` のみだったため)
- [ ] [REFACTOR] トップの新設セクション間のレイアウト・余白の統一
- [ ] [REVIEW] フェーズ実装の簡易セルフレビューと修正
- [ ] [CHECK] `vp check` と `vp test` の実行と確認

### フェーズ4: 問い合わせフォーム改修 (G3)

スキーマ・型・メールテンプレートは無変更 (`subject` は自由文字列のため)。

- [ ] [RED] `src/front/pages/Contact.test.tsx` に、`subject` の select 初期値が「30分無料相談」であること・その値のまま送信するとバリデーションが通り `/contact/thanks` へ遷移することのテストを追加 (失敗確認)
- [ ] [GREEN] `Contact.tsx` の `subject` select の選択肢先頭に「30分無料相談」を追加し、`defaultValue` (react-hook-form の `defaultValues.subject`) を「30分無料相談」に変更
- [ ] [GREEN] フォーム上部に「準備は不要です。現状の悩みを話すだけで大丈夫です」の説明文を追加
- [ ] [REFACTOR] 選択肢定義の重複排除 (必要なら)
- [ ] [REVIEW] フェーズ実装の簡易セルフレビューと修正
- [ ] [CHECK] `vp check` と `vp test` の実行と確認

### フェーズ5: ヘッダー・フッターのナビゲーション刷新 (G5)

フェーズ1〜4 で `/cases` `/engineers` `/engineers/philosophy` が揃った後に実施する (リンク切れを避けるため)。

- [ ] [RED] Header/Footer のテスト (既存があれば更新、無ければ新規) に、経営者向けリンク (事例 / 支援内容アンカー / 支援の進め方アンカー / 料金アンカー / 会社概要 / お知らせ / 30分無料相談ボタン) と右端「エンジニアの方へ」リンクの存在、`/slides` と zenn リンクがヘッダーに含まれないことをアサート (失敗確認)
- [ ] [GREEN] `src/front/components/Header.tsx` を改修: `/slides` と zenn へのリンクを削除し、経営者向けリンク一覧 + 「エンジニアの方へ」に置き換え
- [ ] [GREEN] `src/front/components/Footer.tsx` (無ければ相当箇所) を改修: ヘッダーと同一リンク + 「研修・資料」(`/slides`) + 「エンジニアの方へ」+ zenn 技術ブログ + 会社名・住所を配置
- [ ] [REFACTOR] ナビゲーションリンク定義の共通化 (ヘッダー・フッターで重複する場合)
- [ ] [REVIEW] フェーズ実装の簡易セルフレビューと修正
- [ ] [CHECK] `vp check` と `vp test` の実行と確認

### フェーズ6: ページ別 title 設定

- [ ] [RED] 各ページ (`Home` / `Cases` / `CaseDetail` / `Engineers` / `Philosophy` / `Contact` 等) のテストに `document.title` がページ別の値になることのアサートを追加 (失敗確認)
- [ ] [GREEN] 各ページに `useEffect` で `document.title` を設定する処理を追加 (共通化する場合は `usePageTitle(title: string)` のような薄いカスタムフックを作成してもよい。IO ではなく `document.title` への代入のみのため DI 不要)
- [ ] [REFACTOR] 重複する title 設定ロジックの共通化
- [ ] [REVIEW] フェーズ実装の簡易セルフレビューと修正
- [ ] [CHECK] `vp check` と `vp test` の実行と確認

### フェーズ7: 品質保証・UI/UX 仕上げ・G_E2E 確認

- [ ] [STRUCTURAL] 未使用になった import・変数・旧テストファイルの整理 (このフェーズ群の変更で不要になったもののみ。既存 dead code には触れない)
- [ ] 全自動テスト実行 (`vp test`) が green であることの確認
- [ ] レスポンシブ動作確認 (`chrome-devtools` MCP の `resize_page` + `take_snapshot` で主要 breakpoint を確認): `/` `/cases` `/cases/:id` `/engineers` `/contact`
- [ ] SEO meta 最終確認: 各ページのタブタイトルが目視で正しいこと
- [ ] [REVIEW] フェーズ実装の簡易セルフレビューと修正 (4 観点レビュー: TDD 準拠 / コード品質・rules 準拠 / プロダクト readiness / 敵対的レビュー)
- [ ] [CHECK] G_E2E シナリオを `chrome-devtools` MCP で URL 直叩きなしの通し確認 (DESIGN_DETAIL_APP.md 検証手順の G_E2E に記載の 3 導線): (1) トップ → 事例カード → 事例詳細 → CTA → `/contact` (件名「30分無料相談」のまま送信) → thanks (2) トップ → ヘッダー「エンジニアの方へ」→ `/engineers` → 理念リンク → `/engineers/philosophy` (3) フッター「研修・資料」→ `/slides`。全遷移で console error 0 件を確認
- [ ] [CHECK] `vp check` (format + lint + typecheck) と `vp build` (本番ビルド検証) の実行と確認

### 対象外 (オプション機能・本タスクリストのスコープ外)

- 事例ページの OGP 画像生成 (DESIGN.md オプション機能): 既存 OGP 生成が Markdown frontmatter 前提で `cases.ts` (TypeScript データ) と形式が異なり、流用方法の設計自体が未着手のため本刷新の必須スコープに含めない。着手する場合は別タスクとして起票する

## 実装ノート

### MUST ルール遵守事項

- TDD: RED → GREEN → REFACTOR → REVIEW → CHECK サイクルを厳守
- REVIEW: 各フェーズ完了時に簡易セルフレビューを実施し、問題があればその場で修正
- CHECK: REVIEW 後に `vp check` / `vp test` を実行して最終確認
- Tidy First: 構造変更 (フェーズ1 の `Introduction.tsx` → `Philosophy.tsx` リネーム、フェーズ7 の dead code 整理) と動作変更を同じコミットで混ぜない
- コミット: `[BEHAVIORAL]` または `[STRUCTURAL]` プレフィックス必須
  - `[BEHAVIORAL]`: 動作を変更するコミット (機能追加・改修・テスト追加)
  - `[STRUCTURAL]`: 動作を変更しないコミット (リネーム・整理)
- 外科的変更: 依頼 (設計書) にトレースできない改変・隣接コードの改善はしない。自分の変更で未使用になった import・変数・関数のみ片付ける (フェーズ7 に集約)
- IO の DI: 本タスク範囲に新規の外部 IO 呼び出しは無い (`document.title` はブラウザ標準 API への直接代入で DI 対象外。read-only な副作用なし)

### 参照ドキュメント

- 概要設計: docs/DESIGN.md
- 詳細設計: docs/DESIGN_DETAIL_APP.md
- 決定台帳: docs/DESIGN_NOTES.md
