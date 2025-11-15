# Requirements Document

## Project Description (Input)
webをSSRにしてcloudflareに移行

## Introduction

現在 GitHub Pages で SPA として配信されている Web パッケージを、SSR (Server-Side Rendering) に変更し、Cloudflare Workers/Pages へデプロイ先を移行する。これにより、SEO 最適化、初期表示速度の向上、動的コンテンツのサポートを実現する。

既存のモノレポ構成 (web, worker, shared) を維持しつつ、Web パッケージの内部アーキテクチャを SPA から SSR へ変換する。データドリブンコンテンツモデルと型安全性は継続して保持する。

## Requirements

### Requirement 1: SSR フレームワーク統合
**Objective:** 開発者として、既存の React SPA を SSR に変換したい。これにより、サーバーサイドでの HTML 生成とクライアントでのハイドレーションが可能になる。

#### Acceptance Criteria
1. The Web Application shall use a React-based SSR framework compatible with Cloudflare Workers/Pages
2. When a page is requested, the Web Application shall render initial HTML on the server
3. When server-rendered HTML is delivered to the browser, the Web Application shall hydrate React components for interactivity
4. The Web Application shall maintain existing React 19.2 compatibility
5. The Web Application shall preserve current TypeScript strict mode and type safety standards

### Requirement 2: Cloudflare デプロイ環境構築
**Objective:** 開発者として、Cloudflare Workers/Pages へのデプロイ環境を構築したい。これにより、GitHub Pages からの移行が完了する。

#### Acceptance Criteria
1. The Deployment System shall support Cloudflare Pages deployment workflow
2. When code is pushed to main branch, the CI/CD Pipeline shall automatically deploy to Cloudflare
3. The Web Application shall remove GitHub Pages specific base path configuration (`/homepage/`)
4. The Deployment Configuration shall use Cloudflare environment variables instead of GitHub Secrets
5. The Build System shall generate SSR-compatible output for Cloudflare Workers runtime

### Requirement 3: ルーティングシステム移行
**Objective:** 開発者として、既存の react-router-dom ベースのクライアントサイドルーティングを SSR 対応に変更したい。これにより、各ルートでサーバーサイドレンダリングが機能する。

#### Acceptance Criteria
1. When a route is accessed directly via URL, the Web Application shall render the corresponding page on the server
2. When navigating between pages, the Web Application shall support client-side transitions without full page reload
3. The Web Application shall maintain existing route definitions (`/`, `/about`, `/introduction`, `/recruitment`, `/contact`, `/contact/thanks`)
4. If a non-existent route is accessed, then the Web Application shall render 404 page with appropriate HTTP status code
5. The Routing System shall preserve scroll-to-top behavior on route changes

### Requirement 4: データレイヤー互換性維持
**Objective:** 開発者として、既存のデータドリブンコンテンツモデル (`web/src/data/`) を SSR 環境でも動作させたい。これにより、コンテンツ管理方法を変更せずに移行できる。

#### Acceptance Criteria
1. The Web Application shall load data from `web/src/data/` directory during server-side rendering
2. The Web Application shall serialize data to client for hydration without duplication
3. The Data Layer shall maintain existing TypeScript type definitions (`web/src/types/`)
4. The Web Application shall preserve data structure for company info, projects, services, tech stack, and recruitment
5. When data is updated, the Web Application shall reflect changes without client-side fetch requests

### Requirement 5: スタイリングシステム移行
**Objective:** 開発者として、Tailwind CSS v4 を SSR 環境で動作させたい。これにより、既存のスタイリングを維持しつつ SSR の利点を得られる。

#### Acceptance Criteria
1. The Web Application shall support Tailwind CSS v4 in SSR mode
2. When rendering on server, the Web Application shall generate critical CSS for initial paint
3. The Web Application shall avoid flash of unstyled content (FOUC) during hydration
4. The Styling System shall maintain existing Tailwind configuration and custom styles
5. The Build Process shall optimize CSS delivery for production environments

### Requirement 6: お問い合わせフォーム統合
**Objective:** ユーザーとして、SSR 環境でもお問い合わせフォームを利用したい。これにより、既存の Worker API との統合を維持できる。

#### Acceptance Criteria
1. When contact form is submitted, the Web Application shall send request to existing Cloudflare Worker API
2. The Form System shall maintain react-hook-form and Valibot validation
3. When form validation fails, the Web Application shall display error messages without page reload
4. When form submission succeeds, the Web Application shall navigate to `/contact/thanks` page
5. The Web Application shall use environment variable for Worker API endpoint (no hardcoded URLs)

### Requirement 7: 開発環境互換性
**Objective:** 開発者として、SSR 移行後も効率的な開発体験を維持したい。これにより、既存の開発ワークフローを継続できる。

#### Acceptance Criteria
1. When running `pnpm dev`, the Development Server shall support hot module replacement (HMR)
2. The Development Environment shall run both web (SSR) and worker in parallel
3. The Web Application shall maintain TypeScript type checking with tsgo
4. The Development System shall preserve Biome linting and formatting configuration
5. When making code changes, the Developer shall see updates without manual restarts

### Requirement 8: パフォーマンス要件
**Objective:** ユーザーとして、SSR により高速なページ表示を体験したい。これにより、SPA よりも優れた初期表示速度を実現する。

#### Acceptance Criteria
1. The Web Application shall achieve Time to First Byte (TTFB) under 200ms for most requests
2. The Web Application shall generate Largest Contentful Paint (LCP) under 2.5 seconds
3. The Web Application shall minimize JavaScript bundle size compared to SPA version
4. When page is loaded, the Web Application shall display meaningful content before JavaScript execution
5. The Web Application shall implement appropriate caching strategies for static assets

### Requirement 9: モノレポ構成維持
**Objective:** 開発者として、既存のモノレポ構成 (web, worker, shared) を維持したい。これにより、パッケージ間の責務分離を保持できる。

#### Acceptance Criteria
1. The Monorepo shall maintain three packages: web (SSR), worker (API), shared (schemas)
2. The Web Package shall continue to import shared validation schemas from `@homepage/shared`
3. The Build System shall support independent deployment of web and worker packages
4. The Package Manager shall use pnpm workspace for dependency management
5. When building, the Build System shall ensure correct dependency resolution between packages

### Requirement 10: 後方互換性とマイグレーション
**Objective:** 開発者として、移行プロセスを段階的に実施したい。これにより、リスクを最小化しながら SSR へ移行できる。

#### Acceptance Criteria
1. The Migration Process shall preserve all existing page functionality
2. The Web Application shall maintain existing URL structure without breaking links
3. When migration is complete, the Web Application shall remove SPA-specific code and configuration
4. The Documentation shall update deployment instructions for Cloudflare
5. If migration issues occur, then the Development Team shall have rollback capability to SPA version
