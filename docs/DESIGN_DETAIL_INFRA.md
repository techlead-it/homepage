<!-- generated-from: docs/DESIGN_NOTES.md -->

# ホームページ刷新 (DX特化) インフラ詳細設計 (DESIGN_DETAIL_INFRA.md)

生成日: 2026-07-19
ステータス: レビュー待ち (/dev-impl 入力契約に合わせ新設。本刷新はインフラ変更が無いため全項目 N/A)
種別: 設計書 (詳細設計・インフラ)
対象: techlead-it.com ホームページの情報設計刷新
概要設計: [DESIGN.md](./DESIGN.md)
アプリ詳細設計: [DESIGN_DETAIL_APP.md](./DESIGN_DETAIL_APP.md)

## 目次

- [リソース定義](#リソース定義)
- [CI/CD](#cicd)
- [シークレット管理](#シークレット管理)
- [監視](#監視)
- [検証手順](#検証手順)

## リソース定義

N/A: 本刷新は `src/front` (React SPA) の変更のみで、Cloudflare Worker 構成・`wrangler.jsonc` の変更を伴わない。既存の単一 Worker (`homepage`) が SPA (Workers Assets) と API を引き続き配信する ([DESIGN.md 主要インフラリソース一覧](./DESIGN.md#主要インフラリソース一覧) 参照)。

新設 SPA ルート (`/cases` `/cases/:id` `/engineers` `/engineers/philosophy`) は `wrangler.jsonc` の既存設定 (`not_found_handling: "single-page-application"`) でリソース変更なしに配信される ([DESIGN_DETAIL_APP.md ルーティング変更](./DESIGN_DETAIL_APP.md#ルーティング変更) 参照)。

## CI/CD

N/A: 既存の GitHub Actions workflow (`.github/workflows/ci.yaml` / `deploy.yaml`) を変更しない。`src/**` 配下の変更は既存トリガー条件 (paths) に含まれるため追加設定不要。

## シークレット管理

N/A: `RESEND_API_KEY` / `TO_EMAIL` / `WORKER_ENV` の追加・変更は無い。問い合わせフォームの相談導線は既存 `subject` 選択肢の再編のみで API 契約・環境変数は無変更 ([DESIGN_DETAIL_APP.md 問い合わせフォーム変更](./DESIGN_DETAIL_APP.md#問い合わせフォーム変更) 参照)。

## 監視

N/A: 現状監視は導入しておらず、本刷新でも導入しない。KPI (30分無料相談の予約数) は受信メールの件名区分を月次で目視集計する運用とし、インフラ側の計装は不要。

## 検証手順

インフラ変更が無いため、インフラ固有の検証手順 (IaC plan 差分・デプロイ疎通確認等) は無い。デプロイは既存の `pnpm deploy` (`vp build && wrangler deploy`) フローをそのまま使用し、ゴール達成の検証はすべて [DESIGN_DETAIL_APP.md 検証手順](./DESIGN_DETAIL_APP.md#検証手順) 側 (G1〜G5, G_E2E) で行う。
