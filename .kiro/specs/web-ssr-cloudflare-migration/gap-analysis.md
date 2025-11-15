# Implementation Gap Analysis: Web SSR Cloudflare Migration

## 1. Current State Investigation

### Key Files and Directory Layout

**エントリーポイント**:
- `web/src/main.tsx`: クライアントサイドエントリーポイント (`HashRouter` 使用)
- `web/src/App.tsx`: ルート定義 (react-router-dom `Routes`)
- `web/vite.config.ts`: Vite 設定 (Tailwind CSS v4, React プラグイン)

**コンポーネント構造**:
- `web/src/components/`: Layout, Header, Footer
- `web/src/components/ui/`: Section, Card, Button, ProficiencyLevelItem
- `web/src/components/sections/`: HeroSection, TechStackSection など 9 個
- `web/src/pages/`: Home, About, Contact, ContactThanks など 7 ページ

**データレイヤー**:
- `web/src/data/`: company, projects, services, techStack, recruitment など 9 ファイル
- `web/src/types/index.ts`: 型定義

**ビルド・デプロイ**:
- Vite を使用した SPA ビルド (`vite build`)
- GitHub Actions で GitHub Pages にデプロイ (`.github/workflows/deploy-web.yaml`)
- Base path 設定なし (Vite config には未設定)

### Architecture Patterns and Constraints

**現在のアーキテクチャ**:
- **クライアントサイドルーティング**: `HashRouter` を使用した完全な CSR
- **データ駆動モデル**: `web/src/data/` にコンテンツを集約し、コンポーネントが直接 import
- **Layout パターン**: すべてのページが `Layout` コンポーネントでラップ
- **Section 積み上げ**: 各ページは `Section` コンポーネントを使用して構造化

**依存関係**:
- React 19.2, react-router-dom 7.9.5
- Vite (rolldown-vite@7.2.2)
- Tailwind CSS v4 + @tailwindcss/vite
- react-hook-form + Valibot (お問い合わせフォーム)

**制約事項**:
- モノレポ構成 (pnpm workspace) を維持する必要がある
- `@homepage/shared` パッケージとの依存関係
- Biome によるコード品質管理
- TypeScript strict mode

### Integration Surfaces

**既存の統合ポイント**:
- `@homepage/shared/schemas`: Valibot スキーマ (Contact フォーム)
- `@homepage/shared/types`: 共通型定義
- 環境変数: `VITE_CONTACT_FORM_ENDPOINT` (Worker API URL)

**Worker API 統合**:
- Contact フォームから `POST /api/contact` を呼び出し
- Worker は既に Cloudflare Workers にデプロイ済み

## 2. Requirements Feasibility Analysis

### Technical Needs from Requirements

**Requirement 1: SSR フレームワーク統合**
- React ベースの SSR フレームワーク (Cloudflare Workers/Pages 対応)
- サーバーサイドレンダリング + ハイドレーション
- React 19.2 互換性維持

**Requirement 2: Cloudflare デプロイ環境**
- Cloudflare Pages/Workers デプロイワークフロー
- GitHub Actions CI/CD パイプライン
- Base path 設定の削除 (現在は不要)
- 環境変数管理の移行

**Requirement 3: ルーティングシステム**
- SSR 対応のルーティング (サーバー + クライアント)
- 既存ルート定義の維持 (7 ルート)
- 404 ハンドリング
- スクロールトップ動作の維持

**Requirement 4: データレイヤー互換性**
- `web/src/data/` からのサーバーサイドデータロード
- ハイドレーション用のデータシリアライゼーション
- 型定義の維持

**Requirement 5: スタイリングシステム**
- Tailwind CSS v4 SSR 対応
- Critical CSS 生成
- FOUC 回避

**Requirement 6: お問い合わせフォーム**
- Worker API との統合維持
- react-hook-form + Valibot 継続使用
- クライアントサイドバリデーション

**Requirement 7: 開発環境**
- HMR サポート
- web + worker 並列起動
- tsgo, Biome 継続使用

**Requirement 8-10**: パフォーマンス、モノレポ維持、後方互換性

### Identified Gaps

#### Missing Capabilities

**SSR フレームワーク未導入** (Gap: Critical):
- 現在は完全な CSR (HashRouter)
- サーバーサイドレンダリング機能なし
- ハイドレーションロジックなし

**Cloudflare デプロイ設定なし** (Gap: Critical):
- GitHub Pages 専用の設定
- Cloudflare Pages/Workers 用のビルド設定なし
- wrangler.toml 未作成

**サーバーエントリーポイント不在** (Gap: Critical):
- クライアントエントリーポイント (`main.tsx`) のみ
- サーバーサイドレンダリング用のエントリーポイントが必要

**ルーティング構成の不一致** (Gap: Major):
- `HashRouter` は SSR 非対応
- サーバーサイドルーティングロジックなし

#### Research Needed

**SSR フレームワーク選定** (Research: High Priority):
- Next.js vs Remix vs カスタム SSR の評価
- Cloudflare Workers/Pages での React 19.2 互換性
- Tailwind CSS v4 との統合方法

**Vite SSR ビルド設定** (Research: Medium Priority):
- Vite SSR モードの設定方法
- Cloudflare Workers 向けの最適化
- rolldown-vite との互換性

**データハイドレーション戦略** (Research: Medium Priority):
- `web/src/data/` の静的インポートを SSR でどう扱うか
- クライアント・サーバー間のデータ重複回避
- パフォーマンス最適化

#### Constraints

**モノレポ構成の維持** (Constraint):
- pnpm workspace の依存関係管理
- shared パッケージとの統合
- ビルドスクリプトの調整が必要

**Biome + TypeScript 継続** (Constraint):
- 新しいフレームワークが Biome と競合しないか確認
- tsgo ビルドツールとの互換性

**既存 Worker API との統合** (Constraint):
- Worker はすでに Cloudflare Workers にデプロイ済み
- Web と Worker の独立したデプロイを維持

### Complexity Signals

**複雑な統合**: SSR フレームワークの導入は大規模なアーキテクチャ変更
**外部統合**: Cloudflare Workers/Pages API との統合
**ワークフロー変更**: CI/CD パイプラインの全面刷新

## 3. Implementation Approach Options

### Option A: Next.js + @cloudflare/next-on-pages

**概要**: Next.js App Router を採用し、`@cloudflare/next-on-pages` で Cloudflare Pages にデプロイ

#### Which files/modules to extend
- **既存のページコンポーネント**: Next.js の `app/` ディレクトリ構造に移行
- **データレイヤー**: `web/src/data/` を Next.js のデータフェッチングパターン (async/await) に変換
- **Layout**: Next.js の `layout.tsx` パターンに変換

#### Compatibility assessment
- **React 19.2 互換性**: Next.js 15+ が React 19 をサポート (要確認)
- **Tailwind CSS v4**: Next.js で Tailwind CSS v4 を使用可能
- **react-router-dom**: Next.js App Router に置き換え (破壊的変更)

#### Complexity and maintainability
- **学習曲線**: Next.js App Router の習得が必要
- **ファイル構造変更**: `pages/` から `app/` への大規模な移行
- **Convention over Configuration**: Next.js の規約に従う必要

#### Trade-offs
✅ **Pros**:
- 成熟したエコシステムと豊富なドキュメント
- Cloudflare 公式サポート (`@cloudflare/next-on-pages`)
- 自動的なコード分割とルーティング最適化
- Built-in Image Optimization, Metadata API

❌ **Cons**:
- react-router-dom からの移行が大規模
- Next.js の規約に従う必要があり、既存の構造から大きく変更
- `@cloudflare/next-on-pages` の制約 (一部の Next.js 機能は非対応)
- モノレポ内での Next.js 設定の複雑化

---

### Option B: Remix + Cloudflare Workers

**概要**: Remix を採用し、Cloudflare Workers アダプターでデプロイ

#### Rationale for new creation
- Remix はネイティブに Cloudflare Workers をサポート
- react-router-dom と同じ開発チームによる開発 (ルーティング API が類似)
- ファイルベースルーティングとデータローディングの統合

#### Integration points
- **既存のページコンポーネント**: Remix の `routes/` ディレクトリに移行
- **データレイヤー**: Remix の `loader` 関数でサーバーサイドデータフェッチ
- **Layout**: Remix の `root.tsx` + `Outlet` パターン

#### Responsibility boundaries
- **Remix Router**: サーバー + クライアントルーティングを統一管理
- **Loader Functions**: サーバーサイドデータフェッチング専用
- **Action Functions**: フォーム送信処理 (Contact フォーム)

#### Trade-offs
✅ **Pros**:
- react-router-dom との API 類似性 (移行しやすい)
- Cloudflare Workers ネイティブサポート
- サーバー・クライアント間のデータフローが明確
- Progressive Enhancement 重視の設計

❌ **Cons**:
- Next.js と比較してエコシステムが小さい
- Tailwind CSS v4 との統合実績が少ない (要検証)
- モノレポ内での Remix 設定の検証が必要
- React 19.2 サポート状況が不明確

---

### Option C: Vite SSR + Hono (Framework-less)

**概要**: Vite の SSR 機能と Hono フレームワークを使用したカスタム SSR 実装

#### Combination strategy
- **Vite SSR**: サーバーサイドレンダリングのビルド
- **Hono**: Cloudflare Workers でのルーティングとレンダリング (Worker パッケージと統一)
- **react-router-dom**: クライアントサイドルーティング継続使用
- **カスタムハイドレーション**: 独自のデータシリアライゼーション実装

#### Phased implementation
1. **Phase 1**: Vite SSR ビルド設定 + 基本的なサーバーレンダリング
2. **Phase 2**: Hono ルーター統合 + 動的ルーティング
3. **Phase 3**: データハイドレーション最適化
4. **Phase 4**: パフォーマンスチューニング

#### Risk mitigation
- **段階的ロールアウト**: ルートごとに SSR を有効化
- **フィーチャーフラグ**: 環境変数で CSR/SSR 切り替え
- **ロールバック**: GitHub Pages への再デプロイ可能

#### Trade-offs
✅ **Pros**:
- 既存の Vite + React 構成を最大限活用
- Hono は Worker パッケージでも使用中 (一貫性)
- 完全な制御権 (フレームワークの制約なし)
- react-router-dom を継続使用可能

❌ **Cons**:
- カスタム実装の保守コスト
- ベストプラクティスの模索が必要
- コード分割やルーティング最適化を手動実装
- ドキュメントやコミュニティサポートが限定的

---

## 4. Implementation Complexity & Risk

### Effort Estimation

**Option A (Next.js)**: **XL (2-3 weeks)**
- 大規模なファイル構造変更 (`pages/` → `app/`)
- react-router-dom から Next.js Router への移行
- データレイヤーの全面書き換え
- @cloudflare/next-on-pages の学習と設定

**Option B (Remix)**: **L (1-2 weeks)**
- ファイルベースルーティングへの移行 (中程度)
- Loader/Action 関数の実装
- Cloudflare Workers アダプター設定
- Tailwind CSS v4 統合の検証

**Option C (Vite SSR + Hono)**: **XL (2-4 weeks)**
- Vite SSR ビルド設定のカスタマイズ
- Hono でのサーバーサイドルーティング実装
- ハイドレーションロジックの独自実装
- パフォーマンス最適化とデバッグ

### Risk Assessment

**Option A (Next.js)**: **Medium Risk**
- **Pros**: Cloudflare 公式サポート、成熟したエコシステム
- **Cons**: @cloudflare/next-on-pages の制約、React 19.2 互換性要検証
- **Mitigation**: Next.js 公式ドキュメントと Cloudflare ガイドに従う

**Option B (Remix)**: **Medium-High Risk**
- **Pros**: Cloudflare Workers ネイティブサポート、react-router との親和性
- **Cons**: エコシステムが小さい、Tailwind v4 統合実績少ない
- **Mitigation**: Remix 公式サンプルと Cloudflare アダプターを参考

**Option C (Vite SSR + Hono)**: **High Risk**
- **Pros**: 完全な制御権、既存構成を最大限活用
- **Cons**: カスタム実装の保守コスト、ベストプラクティス不明
- **Mitigation**: 段階的実装、フィーチャーフラグによるロールバック

---

## 5. Recommendations for Design Phase

### Preferred Approach

**推奨: Option B (Remix + Cloudflare Workers)**

#### 理由
1. **react-router-dom との API 類似性**: 既存のルーティングロジックを最小限の変更で移行可能
2. **Cloudflare Workers ネイティブサポート**: Worker パッケージとの統合がスムーズ
3. **データフローの明確性**: Loader/Action による明確な責務分離
4. **バランスの取れた実装コスト**: Next.js より小規模、カスタム実装より安全

#### 次点: Option A (Next.js)
- エコシステムの成熟度を重視する場合
- 将来的な機能拡張 (Image Optimization など) を見据える場合

### Key Decisions for Design Phase

1. **SSR フレームワークの最終決定**:
   - Remix の React 19.2 互換性を確認
   - Tailwind CSS v4 との統合をプロトタイプで検証

2. **ルーティング戦略**:
   - 既存の 7 ルートを Remix `routes/` 構造にマッピング
   - 404 ページとエラーハンドリングの設計

3. **データレイヤー移行**:
   - `web/src/data/` を Remix Loader に変換する方針
   - 静的データのハイドレーション戦略

4. **デプロイパイプライン**:
   - GitHub Actions での Cloudflare Pages デプロイ設定
   - 環境変数管理の移行計画

### Research Items

1. **Remix + React 19.2 互換性検証** (High Priority):
   - Remix 最新版が React 19.2 をサポートしているか確認
   - 必要に応じて Canary 版の使用を検討

2. **Tailwind CSS v4 + Remix 統合** (High Priority):
   - Remix での Tailwind v4 + @tailwindcss/vite の動作確認
   - Critical CSS 生成の実装方法

3. **Cloudflare Pages Functions vs Workers** (Medium Priority):
   - Remix を Pages Functions にデプロイするか、Workers にデプロイするか
   - パフォーマンスとコストの比較

4. **モノレポ内での Remix 設定** (Medium Priority):
   - pnpm workspace での Remix プロジェクト構成
   - shared パッケージとの依存関係管理

5. **Contact フォームの Remix Action 移行** (Low Priority):
   - react-hook-form を継続使用するか、Remix Action に移行するか
   - クライアントサイドバリデーション (Valibot) の保持方法

---

## Requirement-to-Asset Map

| Requirement | Current State | Gap | Implementation Approach |
|-------------|---------------|-----|------------------------|
| **Req 1: SSR フレームワーク** | CSR のみ (HashRouter) | Missing | Remix 導入 + サーバーエントリーポイント作成 |
| **Req 2: Cloudflare デプロイ** | GitHub Pages | Missing | Cloudflare Pages 設定 + GitHub Actions 更新 |
| **Req 3: ルーティング** | react-router-dom (CSR) | Extend | Remix Router に移行 |
| **Req 4: データレイヤー** | `web/src/data/` 直接 import | Extend | Remix Loader で wrap |
| **Req 5: スタイリング** | Tailwind v4 (CSR) | Research | Remix + Tailwind v4 統合検証 |
| **Req 6: お問い合わせフォーム** | react-hook-form + Worker API | Extend | Remix Action or 継続使用 |
| **Req 7: 開発環境** | Vite dev server | Extend | Remix dev server + tsgo/Biome 継続 |
| **Req 8: パフォーマンス** | SPA (低速初期表示) | Missing | SSR による TTFB/LCP 改善 |
| **Req 9: モノレポ** | 3 パッケージ構成 | Maintain | pnpm workspace 継続 |
| **Req 10: 後方互換性** | SPA 構成 | Constraint | 段階的移行 + ロールバック計画 |

---

## Summary

**スコープ**: Web パッケージを SPA から SSR に全面移行し、GitHub Pages から Cloudflare Workers/Pages へデプロイ先を変更する大規模なアーキテクチャ変更。

**主要課題**:
- SSR フレームワーク未導入 (現在は完全 CSR)
- Cloudflare デプロイ環境の構築
- react-router-dom の SSR 対応ルーティングへの移行

**推奨アプローチ**: **Option B (Remix + Cloudflare Workers)**
- react-router-dom との API 類似性により移行コストを最小化
- Cloudflare Workers ネイティブサポート
- バランスの取れた実装コストとリスク

**次のステップ**: 設計フェーズで Remix + React 19.2 + Tailwind v4 の統合検証を実施し、詳細な技術設計を作成する。
