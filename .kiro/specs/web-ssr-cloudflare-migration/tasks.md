# Implementation Plan

## Task Overview

この実装計画は、Web パッケージを SPA から SSR (Server-Side Rendering) に移行し、GitHub Pages から Cloudflare Workers/Pages へデプロイ先を変更するタスクをまとめたものです。既存のデータドリブンコンテンツモデルとコンポーネントを最大限再利用しつつ、モノレポ構成を単一パッケージに簡素化します。

## Implementation Tasks

- [ ] 1. モノレポ構成を単一パッケージに簡素化
- [ ] 1.1 (P) shared パッケージの Valibot スキーマをルート直下に移動
  - shared/src/schemas/ の contactSchema と型定義をルート直下の src/schemas/ に移動
  - @homepage/shared からのインポートをすべて相対パスに変更
  - package.json から shared パッケージへの依存を削除
  - _Requirements: 9.1, 9.2_

- [ ] 1.2 worker パッケージの Contact API ロジックを保存
  - worker/src/index.tsx の Contact Action ロジックを確認
  - worker/emails/contact-notification.tsx のメールテンプレートを確認
  - React Router Action 実装時の参考として保存
  - _Requirements: 6.1, 10.3_

- [ ] 1.3 web ディレクトリをルート直下に移動
  - web/src/ をルート直下の src/ に移動
  - web/public/ をルート直下の public/ に移動
  - web/vite.config.ts をルート直下に移動
  - web/package.json の依存関係をルート package.json にマージ
  - _Requirements: 9.1, 10.2_

- [ ] 1.4 pnpm workspace 設定を削除
  - pnpm-workspace.yaml を削除
  - ルート package.json から workspace スクリプトを削除
  - worker と shared パッケージのディレクトリを削除
  - _Requirements: 9.1, 9.4_

- [ ] 1.5 Resend 依存関係を追加
  - package.json に Resend 6.4.2 を追加
  - React Router Action で Resend を使用するための準備
  - _Requirements: 6.1_

- [ ] 2. React Router v7 の基本セットアップ
- [ ] 2.1 React Router v7 とプラグインをインストール
  - @react-router/dev, react-router パッケージをインストール
  - @cloudflare/vite-plugin をインストール
  - 既存の react-router-dom v6 依存を削除
  - _Requirements: 1.1, 1.4, 2.1_

- [ ] 2.2 Vite 設定を React Router v7 用に更新
  - vite.config.ts に reactRouter プラグインを追加
  - @cloudflare/vite-plugin で Cloudflare Workers ランタイム統合
  - @tailwindcss/vite プラグインを継続使用
  - GitHub Pages base path 設定 (/homepage/) を削除
  - _Requirements: 2.3, 2.5, 5.1, 7.1_

- [ ] 2.3 React Router のルートレイアウトを作成
  - app/root.tsx を作成し、HTML 構造を定義
  - Tailwind CSS の Links 関数で Critical CSS を注入
  - Meta 関数で SEO タグを設定
  - ScrollRestoration で既存のスクロールトップ機能を実装
  - _Requirements: 1.2, 1.3, 3.5, 5.2, 5.3_

- [ ] 2.4 サーバーとクライアントのエントリーポイントを作成
  - app/entry.server.tsx でサーバーサイドレンダリング処理を実装
  - app/entry.client.tsx でクライアントハイドレーション処理を実装
  - HTTP レスポンスヘッダー (Cache-Control) を設定
  - _Requirements: 1.2, 1.3, 2.5_

- [ ] 3. ページルートとデータローダーを実装
- [ ] 3.1 (P) Home ページのルートとローダーを作成
  - app/routes/_index.tsx を作成
  - loader 関数で src/data/ から必要なデータ (companyInfo, projects, services など) を取得
  - 既存の src/pages/Home.tsx コンポーネントを再利用
  - useLoaderData で props にデータを渡す
  - _Requirements: 3.1, 3.2, 4.1, 4.2, 4.4_

- [ ] 3.2 (P) About ページのルートとローダーを作成
  - app/routes/about.tsx を作成
  - loader 関数で companyInfo と philosophy データを取得
  - 既存の src/pages/About.tsx コンポーネントを統合
  - _Requirements: 3.1, 3.2, 4.1, 4.2_

- [ ] 3.3 (P) Introduction ページのルートとローダーを作成
  - app/routes/introduction.tsx を作成
  - loader 関数で companyInfo データを取得
  - 既存の src/pages/Introduction.tsx コンポーネントを統合
  - _Requirements: 3.1, 3.2, 4.1, 4.2_

- [ ] 3.4 (P) Recruitment ページのルートとローダーを作成
  - app/routes/recruitment.tsx を作成
  - loader 関数で recruitment データを取得
  - 既存の src/pages/Recruitment.tsx コンポーネントを統合
  - _Requirements: 3.1, 3.2, 4.1, 4.2, 4.4_

- [ ] 3.5 (P) Contact Thanks ページのルートを作成
  - app/routes/contact.thanks.tsx を作成
  - 既存の src/pages/ContactThanks.tsx コンポーネントを統合
  - loader は不要 (静的ページ)
  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 3.6 (P) 404 ページのルートを作成
  - app/routes/$.tsx (Catch-All Route) を作成
  - 404 エラーページをレンダリング
  - 適切な HTTP ステータスコード (404) を返す
  - _Requirements: 3.4_

- [ ] 4. Contact フォームの React Router Action 実装
- [ ] 4.1 Contact ページのルートとアクションを作成
  - app/routes/contact.tsx を作成
  - loader は不要 (フォームのみ)
  - action 関数で POST リクエストを処理
  - _Requirements: 3.1, 6.1_

- [ ] 4.2 Contact Action でサーバーサイドバリデーションを実装
  - FormData からフォームデータを取得
  - src/schemas/contact.ts の Valibot スキーマでバリデーション
  - バリデーションエラー時はフィールドごとのエラーメッセージを返す
  - _Requirements: 6.2, 6.3_

- [ ] 4.3 Contact Action で Resend API によるメール送信を実装
  - Cloudflare Secrets から RESEND_API_KEY と TO_EMAIL を取得
  - Resend API でメール送信
  - 既存の worker/emails/contact-notification.tsx テンプレートを参考に HTML メールを生成
  - 送信成功時は /contact/thanks へリダイレクト
  - _Requirements: 6.1, 6.4_

- [ ] 4.4 Contact フォームコンポーネントを React Router Action に統合
  - 既存の src/pages/Contact.tsx を更新
  - react-hook-form のクライアントバリデーションを維持
  - useActionData でサーバーサイドエラーを取得
  - setError でフィールドエラーを表示
  - _Requirements: 6.2, 6.3_

- [ ] 5. 既存コンポーネントを SSR 対応に更新
- [ ] 5.1 (P) Page コンポーネントを props ベースに変更
  - src/pages/ の各コンポーネントが props でデータを受け取るように変更
  - 直接 import していたデータを props 経由に変更
  - useLoaderData との統合を確認
  - _Requirements: 4.1, 4.2, 4.5_

- [ ] 5.2 (P) Layout コンポーネントを React Router 対応に更新
  - src/components/Layout.tsx を確認
  - React Router の Outlet コンポーネントとの互換性を確認
  - 既存の固定ヘッダー・フッター機能を維持
  - _Requirements: 3.5, 10.1_

- [ ] 6. スタイリングシステムの SSR 対応
- [ ] 6.1 Tailwind CSS v4 の SSR モードを設定
  - vite.config.ts の @tailwindcss/vite プラグイン設定を確認
  - app/root.tsx で Critical CSS が正しく注入されることを確認
  - FOUC (Flash of Unstyled Content) が発生しないことを検証
  - _Requirements: 5.1, 5.2, 5.3_

- [ ] 6.2 (P) 既存の Tailwind 設定とカスタムスタイルを維持
  - 既存の Tailwind 設定 (タブインデント、カスタムクラス) を継続使用
  - CSS の最適化とバンドルサイズの確認
  - _Requirements: 5.4, 5.5_

- [ ] 7. 開発環境のセットアップと検証
- [ ] 7.1 開発サーバーで SSR と HMR を確認
  - pnpm dev で React Router 開発サーバーを起動
  - Hot Module Replacement (HMR) が正常に動作することを確認
  - 全ルートがサーバーサイドレンダリングされることを確認
  - _Requirements: 7.1, 7.5_

- [ ] 7.2 TypeScript と Biome の設定を維持
  - tsgo による TypeScript ビルドを確認
  - Biome のフォーマット・リント設定を継続使用
  - TypeScript strict mode で型エラーがないことを確認
  - _Requirements: 1.5, 7.3, 7.4_

- [ ] 8. Cloudflare Workers/Pages デプロイ設定
- [ ] 8.1 wrangler.toml を作成
  - Cloudflare Workers の設定ファイルを作成
  - compatibility_date とプロジェクト名を設定
  - pages_build_output_dir を dist/client に設定
  - _Requirements: 2.1, 2.4_

- [ ] 8.2 Cloudflare Secrets を設定
  - wrangler CLI または Cloudflare Dashboard で RESEND_API_KEY を設定
  - TO_EMAIL 環境変数を設定
  - ローカル開発用の .dev.vars ファイルを作成 (gitignore)
  - _Requirements: 2.4, 6.5_

- [ ] 8.3 GitHub Actions ワークフローを更新
  - .github/workflows/deploy-web.yaml を Cloudflare Pages 用に更新
  - wrangler deploy コマンドを使用
  - VITE_CONTACT_FORM_ENDPOINT 環境変数を削除 (Action 化により不要)
  - .github/workflows/deploy-worker.yaml を削除 (worker パッケージ廃止)
  - .github/workflows/ci-worker.yaml を削除
  - _Requirements: 2.2, 2.4, 10.4_

- [ ] 9. 統合テストとパフォーマンス検証
- [ ] 9.1 全ルートの SSR とクライアントナビゲーションを検証
  - 7 ルートすべてにブラウザで直接アクセスしてサーバーレンダリングを確認
  - クライアントサイドナビゲーションでページリロードなしの遷移を確認
  - スクロールトップ動作を確認
  - _Requirements: 3.1, 3.2, 3.3, 3.5, 10.1_

- [ ] 9.2 Contact フォーム送信のエンドツーエンドテスト
  - フォームバリデーション (クライアント・サーバー) を確認
  - メール送信が成功することを確認
  - /contact/thanks へのリダイレクトを確認
  - エラーハンドリングを確認
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 9.3 パフォーマンス目標の達成確認
  - Cloudflare Pages で Time to First Byte (TTFB) < 200ms を測定
  - Largest Contentful Paint (LCP) < 2.5s を測定
  - JavaScript バンドルサイズが SPA より削減されていることを確認
  - サーバーレンダリングにより初期表示が高速化されていることを確認
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 10. SPA コードと設定のクリーンアップ
- [ ] 10.1 (P) 不要な SPA コードを削除
  - src/App.tsx の HashRouter を削除 (React Router v7 は app/root.tsx で管理)
  - src/main.tsx を削除 (app/entry.client.tsx に置き換え)
  - 不要な react-router-dom v6 依存を確認
  - _Requirements: 10.3_

- [ ] 10.2 (P) ドキュメントを更新
  - CLAUDE.md を SSR アーキテクチャに合わせて更新
  - モノレポ構成から単一パッケージ構成への変更を反映
  - Cloudflare Pages デプロイ手順を追加
  - _Requirements: 10.4_

- [ ] 10.3 (P) Steering ファイルを更新してプロジェクトメモリを同期
  - .kiro/steering/structure.md を単一パッケージ構成に更新
  - .kiro/steering/tech.md を SSR アーキテクチャに更新
  - .kiro/steering/product.md を Cloudflare Pages デプロイに更新
  - _Requirements: 10.4_

## Requirements Coverage

全 10 件の Requirements がタスクでカバーされています:

- **Requirement 1 (SSR フレームワーク統合)**: タスク 2.1, 2.3, 2.4, 3.1-3.6
- **Requirement 2 (Cloudflare デプロイ環境)**: タスク 2.1, 2.2, 8.1, 8.2, 8.3
- **Requirement 3 (ルーティングシステム)**: タスク 3.1-3.6, 9.1
- **Requirement 4 (データレイヤー互換性)**: タスク 3.1-3.4, 5.1
- **Requirement 5 (スタイリングシステム)**: タスク 2.2, 2.3, 6.1, 6.2
- **Requirement 6 (お問い合わせフォーム)**: タスク 4.1-4.4, 9.2
- **Requirement 7 (開発環境互換性)**: タスク 2.2, 7.1, 7.2
- **Requirement 8 (パフォーマンス要件)**: タスク 9.3
- **Requirement 9 (モノレポ構成維持)**: タスク 1.1, 1.3, 1.4
- **Requirement 10 (後方互換性とマイグレーション)**: タスク 1.2, 9.1, 10.1, 10.2, 10.3

## Task Dependencies

- **Phase 1 (タスク 1)**: プロジェクト構造簡素化 → すべての後続タスクの前提条件
- **Phase 2 (タスク 2)**: React Router v7 セットアップ → タスク 3 以降の前提条件
- **Phase 3 (タスク 3, 4, 5)**: ルート移行とコンポーネント統合 → 並行実行可能 (P マーク付き)
- **Phase 4 (タスク 6, 7)**: スタイリングと開発環境 → タスク 3 完了後
- **Phase 5 (タスク 8)**: Cloudflare デプロイ設定 → タスク 3-7 完了後
- **Phase 6 (タスク 9, 10)**: 統合テストとクリーンアップ → すべての実装完了後

## Notes

- タスク 3.1-3.6 (ページルート実装) は (P) マークにより並行実行可能
- タスク 1.1 (shared 移動) と 1.2 (worker 保存) は並行実行可能
- タスク 5.1 (Page コンポーネント), 5.2 (Layout), 6.2 (Tailwind) は並行実行可能
- タスク 10.1-10.3 (クリーンアップ) は並行実行可能
