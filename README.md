# 株式会社テックリード ホームページ

pnpm workspaceを使用したモノレポ構成。

## プロジェクト構成

```
homepage/
├── web/                    # フロントエンド（React SPA）
│   ├── src/
│   │   ├── components/    # UIコンポーネント
│   │   ├── data/          # コンテンツデータ
│   │   ├── pages/         # ページコンポーネント
│   │   └── types/         # 型定義
│   ├── dist/              # ビルド成果物
│   └── package.json
├── worker/                 # バックエンド（Cloudflare Worker）
│   ├── emails/            # メールテンプレート
│   ├── src/               # Worker実装
│   └── package.json
├── shared/                 # 共通パッケージ
│   ├── src/
│   │   └── schema.ts      # バリデーションスキーマ
│   └── package.json
├── pnpm-workspace.yaml
└── package.json            # ルート設定
```

### パッケージ詳細

- **web/**: React SPAで構築されたコーポレートホームページ（GitHub Pagesにデプロイ）
- **worker/**: お問い合わせフォームAPI用のCloudflare Worker
- **shared/**: フロントエンドとバックエンド間で共有する型定義とバリデーションスキーマ

## 技術スタック

### フロントエンド（web/）
- React 19.2.0
- TypeScript 5.9.3
- Tailwind CSS v4
- react-router-dom 7.9.5
- react-hook-form 7.66.0
- Valibot 1.1.0
- Vite（ビルドツール）

### バックエンド（worker/）
- Hono 4.10.4
- Valibot 1.1.0
- Resend 6.4.2（メール送信）
- React（JSXメールテンプレート）

### 開発ツール
- pnpm（パッケージマネージャー）
- tsgo（TypeScriptコンパイル）
- Biome（フォーマット・リント）

## 開発

### セットアップ

```bash
# 依存関係のインストール
pnpm install

# 開発サーバー起動（web + worker同時起動）
pnpm dev
```

### ルートレベルコマンド

```bash
# 開発サーバー（webとworkerを並列起動）
pnpm dev

# 型チェック
pnpm typecheck              # 全パッケージ
pnpm typecheck:web          # webのみ
pnpm typecheck:worker       # workerのみ

# コード品質チェック
pnpm check                  # 全パッケージ
pnpm check:web              # webのみ
pnpm check:worker           # workerのみ

# ビルド
pnpm build                  # workerをビルド後、webをビルド
pnpm build:web              # webのみ
pnpm build:worker           # workerのみ
```
