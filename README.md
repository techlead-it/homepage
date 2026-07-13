# 株式会社テックリード ホームページ

Cloudflare Workers 上で動作する単一パッケージ構成の Web アプリケーション。React SPA (`src/front`) と Hono Worker (`src/server`) を `@cloudflare/vite-plugin` で単一の Vite プロジェクトに同居させ、`pnpm dev` で両方を同一ポートから起動する。

## プロジェクト構成

```
homepage/
├── index.html               # SPA エントリ HTML
├── public/                   # 静的アセット (会社紹介スライド等)
├── plugins/                  # Vite プラグイン (OGP 生成, スライド一覧)
├── scripts/                  # OGP 画像生成スクリプト
├── src/
│   ├── front/                # React SPA
│   │   ├── components/       # UI コンポーネント
│   │   ├── content/          # ニュース記事 (Markdown)
│   │   ├── data/             # コンテンツデータ
│   │   ├── pages/            # ページコンポーネント
│   │   └── types/            # 型定義
│   ├── server/                # Hono Worker (Cloudflare Workers)
│   │   ├── emails/            # メールテンプレート
│   │   └── index.tsx          # エントリポイント (wrangler.jsonc の main)
│   └── shared/                 # front / server 間で共有する型・バリデーションスキーマ
├── wrangler.jsonc              # Cloudflare Worker 設定
├── vite.config.ts              # Vite + vite-plus (lint/fmt/test) 設定
├── tsconfig.json                # solution file (app / node / worker を参照)
└── package.json
```

## 技術スタック

### フロントエンド (src/front)

- React 19
- TypeScript 7 (ネイティブコンパイラ、`tsc`)
- Tailwind CSS v4
- react-router-dom
- react-hook-form + Valibot

### バックエンド (src/server)

- Hono
- Valibot
- Resend (メール送信)
- React (JSX メールテンプレート)

### 開発ツール

- pnpm (パッケージマネージャー)
- vite-plus (`vp`): Vite + Oxlint + Oxfmt + Vitest の統合 CLI
- `@cloudflare/vite-plugin`: SPA と Worker を単一の Vite dev server で同時起動
- lefthook: pre-push で `vp check` + `vp build`

## 開発

### セットアップ

```bash
pnpm install    # postinstall で wrangler types を実行し worker-configuration.d.ts を生成
cp .dev.vars.example .dev.vars   # RESEND_API_KEY / TO_EMAIL / WORKER_ENV を設定
```

### コマンド

```bash
pnpm dev          # 開発サーバー起動 (SPA + Worker を単一ポートで同時提供)
vp check          # フォーマット + lint + 型チェック
vp test           # テスト実行 (jsdom)
vp build          # 本番ビルド (dist/client + dist/<worker名>)

pnpm cf:preview   # 本番相当のビルド+配信をローカルで確認 (vp build && wrangler dev)
pnpm deploy       # ビルド + デプロイ (vp build && wrangler deploy)
pnpm types        # worker-configuration.d.ts を再生成 (bindings 変更時)
```

## デプロイ

`main` ブランチへの push で GitHub Actions (`.github/workflows/deploy.yaml`) が `techlead-it.com` へ自動デプロイする。手動デプロイは `pnpm deploy`。

本番シークレットは Cloudflare Worker 側に設定する:

```bash
pnpx wrangler secret put RESEND_API_KEY
pnpx wrangler secret put TO_EMAIL
```
