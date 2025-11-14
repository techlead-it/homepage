# Technology Stack

## Architecture

**pnpm Workspace モノレポ構成**: 3パッケージで責務を明確に分離

- `web/`: React SPA (GitHub Pages デプロイ)
- `worker/`: Cloudflare Worker (お問い合わせ API)
- `shared/`: 共通バリデーションスキーマと型定義

フロントエンドとバックエンドで同一のスキーマ (`@homepage/shared`) を利用し、クライアント・サーバー間の型安全性を保証。

## Core Technologies

- **Language**: TypeScript 5.9+
- **Frontend Framework**: React 19.2
- **Backend Framework**: Hono 4.10
- **Runtime**: Node.js 24+, Cloudflare Workers

## Key Libraries

- **Tailwind CSS v4**: `@tailwindcss/vite` プラグインによるユーティリティファーストスタイリング
- **Valibot**: スキーマバリデーション (フロントエンド・バックエンド共通)
- **react-hook-form**: フォーム状態管理とリアルタイムバリデーション
- **Resend**: トランザクションメール送信 (React JSX テンプレート)

## Development Standards

### Type Safety
- TypeScript strict mode 有効
- 型アサーション (`as`) の使用を最小限に
- Valibot スキーマから型を推論 (`v.InferOutput`)

### Code Quality
- **Linter/Formatter**: Biome (ESLint/Prettier 不使用)
- **Quote Style**: Double quotes
- **Indentation**: Spaces (Biome 設定)
- **Import Organization**: Auto-organize via Biome

### Testing
現在テストフレームワークは未導入。TDD 原則に従い、今後追加する機能は必ずテストファーストで実装する。

## Development Environment

### Required Tools
- pnpm 10.21+ (必須パッケージマネージャー)
- Node.js 24+ (devEngines で強制)
- tsgo (TypeScript ビルド)

### Common Commands
```bash
# Dev: pnpm dev (web + worker 並列起動)
# Build: pnpm build (worker → web 順次ビルド)
# Typecheck: pnpm typecheck
# Lint/Format: pnpm check
```

## Key Technical Decisions

**Base Path 設定**: GitHub Pages デプロイのため、production ビルドは `/homepage/` ベースパスを使用 (`web/vite.config.ts` 設定)。

**Valibot 選択理由**: Zod より軽量で、フロントエンド・バックエンド両方で使用するバリデーションライブラリとして最適。

**Cloudflare Workers 採用**: サーバーレスで運用コストを最小化し、エッジネットワークによる低レイテンシを実現。

**データ駆動設計**: `web/src/data/` にコンテンツを集約し、型定義 (`web/src/types/`) でデータ構造を強制。プレゼンテーション層との疎結合を維持。

---
_created_at: 2025-11-15_
