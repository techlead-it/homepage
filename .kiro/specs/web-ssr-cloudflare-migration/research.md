# Research & Design Decisions: Web SSR Cloudflare Migration

## Summary
- **Feature**: `web-ssr-cloudflare-migration`
- **Discovery Scope**: Complex Integration (新規 SSR フレームワーク導入 + Cloudflare 移行)
- **Key Findings**:
  - Remix は React Router v7 に統合され、新規プロジェクトは React Router v7 を推奨
  - React Router v7 は React 18/19 両対応で、Cloudflare Workers を GA サポート
  - Tailwind CSS v4 は Vite プラグイン経由で統合可能

## Research Log

### Remix vs React Router v7 選定

**Context**: ギャップ分析で Remix を推奨したが、最新の状況を確認する必要があった

**Sources Consulted**:
- [Remix Blog: Incremental Path to React 19](https://remix.run/blog/incremental-path-to-react-19)
- [Cloudflare Workers: React Router Framework Guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/)
- GitHub Discussions: Remix React 19 サポート状況

**Findings**:
- **Remix は React Router v7 に統合済み** (2024年12月リリース)
- Remix チームは「新規プロジェクトは React Router v7 を使用し、既存 Remix アプリをアップグレード」することを推奨
- React Router v7 は Vite プラグインレイヤーとして再設計され、Remix の全機能を包含
- Cloudflare は 2025年4月に React Router v7 を GA サポート

**Implications**:
- **設計決定を React Router v7 に変更** (Remix ではなく)
- Remix v2 からの移行パスは非破壊的 (future flags 対応済みの場合)
- Cloudflare Workers での SSR がネイティブサポート

### React 19 互換性

**Context**: 既存コードベースは React 19.2 を使用しており、互換性確認が必須

**Sources Consulted**:
- Remix GitHub Discussions: [React 19 サポート議論](https://github.com/remix-run/remix/discussions/10534)
- React Router v7 リリースノート

**Findings**:
- **React Router v7 は React 18 と React 19 の両方をサポート**
- Remix v2.15.2 は React 19 と互換性があるが、peer dependency が `^18.0.0` のため直接インストールエラー
- React Router v7 では peer dependency が更新され、React 19 を正式サポート
- RSC、Server Actions、静的プリレンダリングなどの React 19 機能に対応

**Implications**:
- React 19.2 を継続使用可能
- TypeScript strict mode や型安全性も維持
- 将来的に RSC などの先進機能も利用可能

### Tailwind CSS v4 統合

**Context**: 既存プロジェクトは Tailwind CSS v4 + @tailwindcss/vite を使用

**Sources Consulted**:
- [Tailwind CSS v4.0 Blog](https://tailwindcss.com/blog/tailwindcss-v4)
- [Install Tailwind CSS with Remix](https://tailwindcss.com/docs/guides/remix)

**Findings**:
- Tailwind CSS v4 は CSS ベースの設定に移行 (`tailwind.config.js` 不要)
- Vite ベースのフレームワーク (React Router v7 含む) は `@tailwindcss/vite` プラグインで統合
- React Router v7 は Vite を内部使用するため、Tailwind v4 との統合が自然
- インストール: `npm install tailwindcss@next @tailwindcss/vite@next`
- 設定: Vite config に `tailwindcss()` プラグイン追加

**Implications**:
- 既存の Tailwind CSS v4 設定をそのまま移行可能
- `@tailwindcss/vite` プラグインを継続使用
- CSS ファイルに `@import "tailwindcss"` を記述

### Cloudflare Workers デプロイ

**Context**: GitHub Pages から Cloudflare Workers/Pages への移行方法を確認

**Sources Consulted**:
- [Cloudflare Blog: Full-stack frameworks GA on Workers](https://blog.cloudflare.com/full-stack-development-on-cloudflare-workers/)
- Cloudflare Vite Plugin ドキュメント

**Findings**:
- Cloudflare Vite Plugin 1.0 がリリース済み (2025年4月)
- React Router v7 を含む主要フレームワークを GA サポート
- `npm create cloudflare@latest my-app -- --framework=react-router` で新規作成可能
- Vite 開発サーバーが Workers ランタイム (workerd) 上で動作し、HMR も利用可能
- Production では Cloudflare Workers または Pages にデプロイ

**Implications**:
- 開発環境と本番環境の挙動を一致させられる
- HMR を含む Vite の全機能を Workers ランタイムで利用
- GitHub Actions で Cloudflare Pages へ自動デプロイ可能

### モノレポ構成との統合

**Context**: 既存の pnpm workspace モノレポ (web, worker, shared) を維持する必要がある

**Sources Consulted**:
- React Router v7 モノレポ構成の事例
- pnpm workspace ドキュメント

**Findings**:
- React Router v7 は通常のプロジェクトとしてモノレポに統合可能
- `web/` パッケージを React Router v7 プロジェクトに変換
- `@homepage/shared` パッケージからの import は workspace:* で継続
- Vite config でモノレポパスを適切に解決

**Implications**:
- モノレポ構成を維持可能
- shared パッケージの Valibot スキーマを継続使用
- worker パッケージとの独立したデプロイを維持

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| **React Router v7 SSR** | Vite ベースの React フレームワーク (Remix 後継) | Cloudflare Workers ネイティブサポート、React 19 互換、Vite 統合 | Remix からの移行概念の学習が必要 | Cloudflare 公式推奨、GA サポート |
| Next.js + @cloudflare/next-on-pages | Next.js を Cloudflare Pages にデプロイ | 成熟したエコシステム、豊富なドキュメント | @cloudflare/next-on-pages の制約、大規模な構造変更 | エコシステム重視の場合の選択肢 |
| Vite SSR + Hono カスタム | 完全カスタム SSR 実装 | 完全な制御権、既存構成を最大活用 | 高い保守コスト、ベストプラクティス不明 | 高リスク |

## Design Decisions

### Decision: React Router v7 の採用

**Context**: SPA から SSR への移行にあたり、Cloudflare Workers 対応の SSR フレームワークが必要

**Alternatives Considered**:
1. **Remix v2** — 元々の推奨候補だが、React Router v7 に統合済み
2. **Next.js + @cloudflare/next-on-pages** — 成熟したエコシステムだが大規模な構造変更
3. **Vite SSR + Hono** — 完全制御だが保守コスト高

**Selected Approach**: **React Router v7**
- Remix の全機能を包含した React Router の Vite プラグイン
- Cloudflare Workers/Pages をネイティブサポート (GA)
- React 18/19 両対応
- Vite ベースで既存の Tailwind CSS v4 統合を維持

**Rationale**:
- **Cloudflare 公式サポート**: GA サポートにより安定性と将来性を保証
- **React 19 互換性**: 既存の React 19.2 をそのまま使用可能
- **Vite 統合**: Tailwind CSS v4 や既存のビルドツールとの親和性
- **Remix 相当の機能**: Loader/Action、ファイルベースルーティング、SSR/Hydration
- **react-router-dom との親和性**: react-router-dom v7 として API が類似

**Trade-offs**:
- ✅ Cloudflare Workers ネイティブサポート
- ✅ React 19 完全対応
- ✅ Vite + Tailwind v4 継続使用
- ✅ 開発環境と本番環境の一致 (workerd ランタイム)
- ❌ Remix 概念の学習コスト (Loader/Action パターン)
- ❌ Next.js と比較してエコシステムが小さい

**Follow-up**:
- React Router v7 の Loader/Action パターンの詳細設計
- Cloudflare Pages デプロイの CI/CD パイプライン設計
- ディレクトリ構造の簡素化 (web/ 廃止)

### Decision: Tailwind CSS v4 継続使用

**Context**: 既存プロジェクトは Tailwind CSS v4 + @tailwindcss/vite を使用

**Selected Approach**: Tailwind CSS v4 を React Router v7 の Vite config に統合

**Rationale**:
- React Router v7 は内部で Vite を使用
- `@tailwindcss/vite` プラグインをそのまま適用可能
- CSS ベースの設定 (`@import "tailwindcss"`) を継続

**Trade-offs**:
- ✅ 既存設定を変更不要
- ✅ Vite プラグインの一貫性
- ❌ CSS import の追加が必要 (移行時のみ)

### Decision: データレイヤー移行戦略

**Context**: `web/src/data/` の静的データを SSR で読み込む方法

**Selected Approach**: Remix Loader パターンでラップ
- 各ルートに対応する Loader 関数を作成
- Loader 内で `web/src/data/` から静的データを import
- サーバーサイドでデータを取得し、JSON でシリアライズ
- クライアントでハイドレーション

**Rationale**:
- データファイル自体は変更不要
- Loader がサーバーサイドデータフェッチの責務を持つ
- 型安全性を維持 (TypeScript strict mode)

**Trade-offs**:
- ✅ 既存データ構造を維持
- ✅ 型定義をそのまま使用
- ❌ 各ルートに Loader 関数の追加が必要

### Decision: お問い合わせフォームの実装と worker/shared 統合

**Context**: SSR 化により、Contact API をサーバーサイドの Action として実装可能になり、別途 Worker パッケージを持つ必要がなくなった

**Selected Approach**: **React Router Action でお問い合わせ機能を実装 + worker/shared 統合**
- React Router Action でサーバーサイドフォーム処理
- Resend API を Action 内から直接呼び出し
- Valibot スキーマを web パッケージ内に移動 (shared パッケージ不要)
- worker パッケージを削除し、機能を web に統合

**Rationale**:
- **モノレポ簡素化**: 3 パッケージ (web, worker, shared) → 1 パッケージ (web) に集約
- **Action ネイティブサポート**: React Router v7 の Action で POST リクエストを処理
- **Resend 統合**: サーバーサイドで Resend API を直接呼び出し
- **型安全性維持**: Valibot スキーマを web 内で管理し、Action と Form で共有
- **デプロイ簡素化**: web パッケージのみをデプロイ

**Trade-offs**:
- ✅ モノレポ構成の大幅簡素化
- ✅ React Router Action の活用
- ✅ Cloudflare Secrets を直接使用 (Resend API key)
- ✅ デプロイパイプライン一本化
- ❌ Worker パッケージの既存コードを Action に移行する必要
- ❌ shared パッケージの依存関係を解消する必要

### Decision: ディレクトリ構造の簡素化

**Context**: モノレポ統合により pnpm workspace が不要になり、プロジェクト構造をさらに簡素化できる

**Selected Approach**: **web ディレクトリ廃止**
- web/ ディレクトリを廃止し、プロジェクトルート直下に移動
- pnpm-workspace.yaml を削除
- src/, app/, public/ をルート直下に配置
- パッケージマネージャーは pnpm を継続使用 (workspace 機能なし)
- Node.js + tsgo を継続使用

**Rationale**:
- **単純なディレクトリ構造**: web/ のネストを削除し、標準的な構成に
- **既存ツールチェーン継続**: pnpm, Node.js, tsgo を継続使用し、移行リスク最小化
- **標準的なプロジェクト構成**: React Router v7 の標準的な構成に準拠

**Trade-offs**:
- ✅ ディレクトリ構造の簡素化
- ✅ 既存のツールチェーン継続使用
- ✅ 移行リスクの最小化
- ❌ pnpm workspace の利点を失う (単一パッケージのため影響小)

## Risks & Mitigations

**リスク 1: React Router v7 の学習コスト**
- **影響**: Loader/Action パターン、ファイルベースルーティングの習得が必要
- **対策**: 公式ドキュメントとサンプルコードを参照し、段階的に移行

**リスク 2: Cloudflare Pages デプロイの複雑性**
- **影響**: GitHub Actions で Cloudflare Pages へのデプロイ設定が必要
- **対策**: Cloudflare Vite Plugin の公式ガイドに従い、wrangler.toml を適切に設定

**リスク 3: ディレクトリ構造の大幅変更**
- **影響**: web/ ディレクトリからルート直下への移行による構成変更
- **対策**: 段階的な移行と、移行後の動作確認を徹底

**リスク 4: Tailwind CSS v4 SSR 時の FOUC**
- **影響**: サーバーレンダリング時にスタイルが適用されず、FOUC が発生
- **対策**: Critical CSS をサーバーレンダリング時に生成し、HTML head に inject

**リスク 5: 既存ページの移行漏れ**
- **影響**: 7 ページすべてを React Router v7 のルート構造に移行する際の漏れ
- **対策**: 要件トレーサビリティマトリックスで全ルートをカバーし、チェックリスト化

## References
- [React Router v7 Documentation](https://reactrouter.com/dev)
- [Cloudflare Workers: React Router Framework Guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/)
- [Remix Blog: Incremental Path to React 19](https://remix.run/blog/incremental-path-to-react-19)
- [Tailwind CSS v4.0 Blog](https://tailwindcss.com/blog/tailwindcss-v4)
- [Cloudflare Vite Plugin](https://github.com/cloudflare/workers-sdk/tree/main/packages/vite-plugin-cloudflare)
