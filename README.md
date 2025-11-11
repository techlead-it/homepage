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

**パッケージマネージャー**: `pnpm`を使用してください（npm・yarnは不可）

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

### パッケージ固有のコマンド

#### web/

```bash
# webディレクトリから、または --filter オプションで実行
cd web

pnpm dev                    # 開発サーバー起動: http://localhost:5173
pnpm build                  # プロダクションビルド（dist/に出力）
pnpm check                  # Biomeでフォーマット・リント
pnpm typecheck              # 型チェック
```

#### worker/

```bash
cd worker

pnpm dev                    # 開発サーバー起動: http://localhost:8787
pnpm deploy                 # Cloudflare Workersへデプロイ
pnpm build                  # ビルド
pnpm check                  # Biomeでフォーマット・リント
pnpm typecheck              # 型チェック
```

## デプロイ

### 自動デプロイ（GitHub Actions）

`main`ブランチへのプッシュで自動的にデプロイされます:

1. **Worker デプロイ**: Cloudflare Workersにworkerをデプロイ
2. **Web デプロイ**: WorkerのURLを環境変数に設定し、GitHub Pagesにwebをデプロイ

### 手動デプロイ（Worker）

```bash
cd worker
pnpm deploy

# 初回のみ: シークレットの設定
pnpx wrangler secret put RESEND_API_KEY
pnpx wrangler secret put TO_EMAIL
```

## アーキテクチャ

### データ駆動型コンテンツモデル

すべてのコンテンツは`web/src/data/`でプレゼンテーションから分離されています:
- `company.ts`: 会社情報とクライアントリスト
- `philosophy.ts`: ミッション、ビジョン、バリュー、アイデンティティ
- `projects.ts`: プロジェクトポートフォリオ
- `services.ts`: サービス内容
- `techStack.ts`: 技術スタックと習熟度（1-5段階）
- `processSteps.ts`: アジャイル開発プロセス
- `strengths.ts`: 強み
- `recruitment.ts`: 採用情報

型定義は`web/src/types/index.ts`で一元管理され、すべてのデータで型安全性を保証しています。

### お問い合わせフォーム

クライアント-サーバーアーキテクチャで、両端でバリデーションを実施:

```
Browser (React)
    ↓ フォーム送信
Cloudflare Worker (Hono API)
    ↓ バリデーション + メール送信
Resend API
    ↓ メール配信
受信者のメールボックス
```

**Shared Package**: フロントエンドとバックエンド間でバリデーションロジックと型定義を共有し、一貫性を保証。

## コードスタイル

- **インデント**: タブ（Biomeで強制）
- **クオート**: ダブルクオート
- **インポート**: Biomeで自動整理
- **TypeScript**: Strictモード有効

すべてのフォーマットとリントはBiomeを使用（ESLint/Prettierは不使用）。

## 環境変数

### Web（開発時）
```bash
VITE_CONTACT_FORM_ENDPOINT=http://localhost:8787/api/contact
```

### Worker（Cloudflareシークレット）
```bash
RESEND_API_KEY=<ResendのAPIキー>
TO_EMAIL=<受信者メールアドレス>
ALLOWED_ORIGIN=<許可するオリジン>
WORKER_ENV=development | production
```
