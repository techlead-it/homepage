# Project Structure

## Organization Philosophy

**パッケージファーストモノレポ**: 責務ごとに独立したパッケージ (web, worker, shared) に分割し、依存方向を明確化。shared は web と worker から参照されるが、逆方向の依存は禁止。

**データとプレゼンテーションの分離**: フロントエンドは `data/` (ビジネスロジック) と `components/`, `pages/` (UI) を明確に分離。コンテンツ変更時は `data/` のみを編集。

## Directory Patterns

### Monorepo Root
**Location**: `/`
**Purpose**: ワークスペース設定とクロスパッケージスクリプト
**Example**: `pnpm-workspace.yaml`, root `package.json` でパッケージ間の並列タスクを定義

### Frontend Data Layer
**Location**: `web/src/data/`
**Purpose**: 型安全なコンテンツデータの集約
**Example**: `company.ts` (企業情報), `projects.ts` (実績), `techStack.ts` (技術スタック)

データは `web/src/types/index.ts` の型定義に準拠。新規データファイル追加時も同じパターンに従う。

### UI Components
**Location**: `web/src/components/ui/`
**Purpose**: 再利用可能なプリミティブコンポーネント
**Example**: `Section`, `Card`, `Button` (デザインシステムの基礎要素)

ビジネスロジックを含まず、props でカスタマイズ可能な汎用コンポーネント。

### Section Components
**Location**: `web/src/components/sections/`
**Purpose**: ページ固有のセクションコンポーネント
**Example**: `HeroSection`, `TechStackSection`, `CtaSection`

データレイヤー (`data/`) と UI コンポーネント (`ui/`) を組み合わせてビジネスロジックを実現。

### Worker API Routes
**Location**: `worker/src/`
**Purpose**: Hono ルート定義とミドルウェア
**Example**: `index.tsx` に全ルートを定義 (`POST /api/contact`, `GET /preview/contact`)

### Shared Package
**Location**: `shared/src/`
**Purpose**: フロントエンド・バックエンド共通のスキーマと型
**Example**: `schemas/index.ts` (Valibot スキーマ), `types/index.ts` (型エクスポート)

## Naming Conventions

- **Files**: React コンポーネントは PascalCase (`Button.tsx`), その他は camelCase (`company.ts`)
- **Components**: PascalCase で export (`export function HeroSection()`)
- **Functions**: camelCase
- **Types/Interfaces**: PascalCase (`CompanyInfo`, `Project`)

## Import Organization

```typescript
// External libraries
import { useState } from "react";
import { Link } from "react-router-dom";

// Workspace packages
import { contactSchema } from "@homepage/shared/schemas";

// Relative imports
import { Button } from "../components/ui/Button";
import { companyInfo } from "../data/company";
```

**Import Order**: Biome が自動整理 (外部ライブラリ → ワークスペースパッケージ → 相対パス)

**Path Aliases**: 現在未使用。すべて相対パスでインポート。

## Code Organization Principles

**Layout パターン**: すべてのページは `Layout` コンポーネントでラップし、固定ヘッダー・フッター・スクロールトップ機能を提供。

**Section 積み上げ構成**: 各ページは `Section` コンポーネントを積み上げ、`background="white"` と `background="gray"` を交互に配置してビジュアル階層を作る。

**Routing**: react-router-dom の `BrowserRouter` で SPA ルーティング。全ルートは `web/src/App.tsx` で定義。

**Environment Variables**: フロントエンドは `VITE_*` プレフィックス、ワーカーは Cloudflare Secrets で管理。

---
_created_at: 2025-11-15_
