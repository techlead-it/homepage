# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a corporate homepage for 株式会社テックリード (TechLead Inc.), a **single-package** Cloudflare Workers application. A React SPA (`src/front`) and a Hono Worker (`src/server`) are combined into one Vite project via `@cloudflare/vite-plugin`, and both are served from the same origin (`techlead-it.com`) as a single Cloudflare Worker.

## Project Structure

```
homepage/
├── index.html               # SPA entry HTML
├── public/                  # Static assets (company intro slides, etc.)
├── plugins/                 # Vite plugins (OGP generation)
├── scripts/                 # OGP image generation scripts
├── src/
│   ├── front/                # React SPA
│   ├── server/                # Hono Worker (entry: wrangler.jsonc's `main`)
│   │   └── emails/            # React JSX email templates
│   └── shared/                 # Types/validation schemas shared by front and server
├── wrangler.jsonc              # Cloudflare Worker configuration
├── vite.config.ts              # Vite + vite-plus (lint/fmt/test) configuration
├── tsconfig.json                # Solution file (references app / node / worker)
├── tsconfig.app.json            # src/front + src/shared (DOM lib)
├── tsconfig.node.json            # vite.config.ts, plugins, scripts
├── tsconfig.worker.json          # src/server + src/shared (Workers types)
├── worker-configuration.d.ts     # `wrangler types` output (committed, regenerated on install)
└── lefthook.yml                  # pre-push: vp check + vp build
```

## Development Commands

**Package Manager**: Use `pnpm` exclusively (not npm or yarn). Day-to-day commands go through `vp` (vite-plus).

```bash
pnpm install       # postinstall runs `wrangler types` and regenerates worker-configuration.d.ts

pnpm dev           # Dev server: SPA + Worker served together on a single port (5173)
vp check           # Format + lint (Oxlint/Oxfmt, type-aware) + typecheck (tsc -b)
vp test            # Run tests (vitest, jsdom)
vp build           # Production build → dist/client (SPA) + dist/<worker-name> (Worker)

pnpm cf:preview    # Production-equivalent build + serve locally (vp build && wrangler dev)
pnpm deploy        # vp build && wrangler deploy
pnpm types         # Regenerate worker-configuration.d.ts (after wrangler.jsonc bindings change)
pnpm generate:og   # Regenerate OGP images for news articles
```

There are no `dev`/`build`/`test`/`check` entries in `package.json` — these are vite-plus's built-in commands (`vp <command>`), invoked directly.

## Web Architecture

### Data-Driven Content Model

All content is separated from presentation in `src/front/data/`:

- **company.ts**: Company info and client list
- **philosophy.ts**: Mission, vision, values, identity
- **projects.ts**: Project portfolio (real client work)
- **services.ts**: Service offerings
- **techStack.ts**: Technologies with proficiency levels (1-5)
- **processSteps.ts**: Agile development process
- **strengths.ts**: Company strengths
- **recruitment.ts**: Job positions

Type definitions in `src/front/types/index.ts` ensure type safety across all data.

### Component Architecture

**Layout Pattern**: All pages wrapped in `Layout` component which provides:

- Fixed header navigation
- Main content area with top padding (pt-16) to account for fixed header
- Footer
- Automatic scroll-to-top on route change

**Page Components** (`src/front/pages/`):

- Each page uses `Section` components with alternating `background="white"` and `background="gray"`
- All pages follow the pattern: Hero → Content Sections → CTA

**Reusable UI Components** (`src/front/components/ui/`):

- `Section`: Content wrapper with configurable background
- `Card`: Content card with optional hover effect
- `Button`: Links styled as buttons (uses react-router-dom Link)

### Routing

Client-side routing via react-router-dom with BrowserRouter. Routes defined in `src/front/App.tsx`:

- `/` - Home
- `/about` - Company info
- `/introduction` - Company introduction
- `/recruitment` - Job listings
- `/contact` - Contact form
- `/contact/thanks` - Form submission success page
- `/slides` - Slide category cards (see Company Slides below)
- `/slides/:categoryId` - Slide doc list for a category

### Company Slides

会社紹介・研修スライド（Claude Design 等で作った単一 HTML）をカテゴリごとに配信する仕組み。

**配置方法**: HTML を `public/slides/` 配下（フラット、または `sales/` のようなサブディレクトリ）に置き、`src/front/data/slides.ts` の `slideCategories` に手動でカテゴリ・資料（`id` / `title` / `description` / `path`）を追記する。ビルド時の動的走査は行わない。

- 実体は `techlead-it.com/slides/...` としてそのまま配信される（Vite の `public/` は無変換でコピーされ、`wrangler.jsonc` の `assets.html_handling = "none"` を指定しているため実ファイルパスで exact match 配信される）
- `assets.run_worker_first` に含まれない `/slides/*` は asset 一致が SPA fallback (`not_found_handling = "single-page-application"`) より優先されるため、BrowserRouter のルーティング（`/slides`, `/slides/:categoryId`）と衝突しない
- `slides.ts` の `path` は拡張子（`.html`）まで含むフルパスで指定する（`/slides/sales/` のような拡張子省略パスは index.html に解決されず SPA fallback に落ちる）
- カテゴリ一覧は `Slides.tsx`、資料一覧は `SlideCategory.tsx`（未知の `categoryId` は `/slides` へ redirect）。型定義は `src/front/types/index.ts` の `SlideCategory` / `SlideDoc`

### Styling

- **Tailwind CSS v4** with `@tailwindcss/vite` plugin
- Space indentation
- Mobile-first responsive design
- Breakpoints: `md:` (tablet), `lg:` (desktop)

## Contact Form Implementation

### Architecture

The contact form uses a **client-server architecture** with validation at both ends:

```
Browser (React)
    ↓ Form submission
Cloudflare Worker (Hono API)
    ↓ Validation + Email
Resend API
    ↓ Email delivery
Recipient inbox
```

### Frontend (src/front)

**Technologies:**

- react-hook-form: Form state management
- Valibot: Schema validation via valibotResolver
- `src/shared`: Shared validation schema and types (plain relative imports, no package alias)

**Features:**

- Real-time validation on blur (`mode: "onBlur"`)
- Field-specific error messages
- Multiple server error handling via `setError`
- Loading state during submission
- Success page navigation

**API endpoint**: The form submits to the relative path `/api/contact` (same-origin). In dev, `@cloudflare/vite-plugin` runs the Worker inside the same Vite dev server, so `/api/*` and `/preview/*` are handled without a separate process or proxy config.

### Backend (src/server)

**Technologies:**

- Hono: Ultra-fast web framework
- Valibot: Request validation
- Resend: Email delivery
- React: JSX email templates

**API Endpoints:**

```typescript
POST /api/contact
- Validates form data with Valibot
- Sends email via Resend
- Returns: { success: true, messageId: string }
- Errors: { errors: Record<string, string> } | { error: string }

GET /preview/contact (development only)
- Previews email template with sample data
- Protected by WORKER_ENV check
```

**Environment Variables (Cloudflare Secrets):**

- `RESEND_API_KEY`: Resend API key
- `TO_EMAIL`: Recipient email address
- `WORKER_ENV`: Environment ("development" or "production")

**Email Template:**

- React JSX component (`src/server/emails/contact-notification.tsx`)
- Modern card design with FieldSection component
- Rendered to HTML via `renderToStaticMarkup`

### Shared Types (src/shared)

**Purpose:** Centralize validation logic and type definitions used by both `src/front` and `src/server`, imported via plain relative paths (no package boundary — this is a single package).

**Exports:**

```typescript
// src/shared/schemas
export const contactSchema: v.ObjectSchema

// src/shared/types
export type ContactFormData
export type ContactSuccessResponse
export type ContactErrorResponse
```

**Validation Schema:**

```typescript
{
  name: string (min 1 char)
  email: string (min 1 char, valid email)
  company?: string (optional)
  subject: string (min 1 char)
  message: string (min 10 chars)
}
```

This ensures **consistent validation** between frontend and backend.

## Important Implementation Details

### Tech Proficiency Levels

The tech stack displays proficiency using 1-5 dots. Definitions are shown in a legend on the Home page with specific meanings:

- **Level 1**: Basic knowledge - can implement simple tasks with documentation
- **Level 2**: Can implement - understands existing code, can add features
- **Level 3**: Independent development - can handle requirements to implementation alone
- **Level 4**: Design & optimization - can design architecture and solve complex problems
- **Level 5**: Expert - provides technical leadership and makes strategic decisions

### Project Categories

Projects use `category: string[]` (array) to support multiple categories like `["Webアプリ開発", "スマホアプリ開発"]`. Categories are displayed as colored badges.

### Scroll Behavior

The Layout component implements scroll-to-top on route change using `useState` to track pathname changes. This ensures users see the top of each new page.

## Deployment

The SPA and Worker are built and deployed together as a single Cloudflare Worker (`homepage`) that serves the SPA via Workers Assets (`dist/client`, `wrangler.jsonc`'s `assets.directory`) and the API from the same origin (`techlead-it.com`, apex custom domain declared in `wrangler.jsonc`).

### Automated Deployment via GitHub Actions

#### Workflow Files

- `.github/workflows/deploy.yaml` - `vp build` then `wrangler deploy`
- `.github/workflows/ci.yaml` - Lint (Oxlint + reviewdog), test, typecheck, format check, build
- `.github/workflows/pr-preview.yaml` - `vp build` then `wrangler versions upload` to publish a per-PR preview (see PR Preview Workflow below)
- `.github/workflows/pinact-check.yaml` - GitHub Actions version pinning check

#### Deployment Trigger

- Triggers on push to `main` with changes to `src/**`, `plugins/**`, `scripts/**`, `public/**`, `index.html`, `wrangler.jsonc`, `vite.config.ts`, `tsconfig*.json`, `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, or the deploy workflow itself
- `concurrency: { group: deploy, cancel-in-progress: false }` serializes overlapping deploy runs

#### CI Workflow

Runs on pull requests and pushes to `main` (paths-ignored: `**.md`, `LICENSE`):

- Oxlint with reviewdog (inline PR annotations)
- `vp test` (unit/component tests)
- `vp check` (format check + lint + typecheck)
- `vp build` (production build validation)

**Pinact Check** runs only when workflow files (`.github/workflows/**`) are modified.

#### PR Preview Workflow

- Triggers on `pull_request` with the same path filters as the deploy workflow (plus the preview workflow's own path)
- Uploads a new Worker Version (`wrangler versions upload`, not `wrangler deploy` — this never shifts production traffic) tagged with `--preview-alias pr-<PR番号>`, producing a stable preview URL for that PR (`wrangler.jsonc`'s `preview_urls: true` is required for this URL to resolve)
- Posts/updates a single PR comment with the preview URL (idempotent via an HTML marker comment, so repeated pushes edit the same comment instead of spamming new ones)
- `concurrency: { group: pr-preview-<PR番号>, cancel-in-progress: true }` cancels a stale in-flight preview build when new commits are pushed to the same PR
- Requires the same `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` secrets as the deploy workflow. PRs from forks do not receive repository secrets, so previews only build for branches within this repository

### Manual Deployment

```bash
pnpm deploy   # vp build && wrangler deploy

# Set secrets (first time only)
pnpx wrangler secret put RESEND_API_KEY
pnpx wrangler secret put TO_EMAIL
```

## Code Style

- **Indentation**: Spaces (2 spaces)
- **Quotes**: Double quotes for strings
- **Imports**: Auto-sorted by Oxlint (`sort-imports` rule)
- **TypeScript**: Strict mode enabled
- Use Oxlint for linting and Oxfmt for formatting (not ESLint/Prettier/Biome)

## Key Technologies

### Frontend (src/front)

- React 19
- TypeScript 7 (native compiler, `tsc`)
- Tailwind CSS v4
- react-router-dom
- react-hook-form
- Valibot

### Backend (src/server)

- Hono
- Valibot
- Resend
- React (for JSX email templates)

### Build Tools

- Vite + `@cloudflare/vite-plugin` (single dev server for SPA + Worker)
- vite-plus (`vp`): unified Oxlint/Oxfmt/Vitest CLI
- TypeScript 7 (native compiler, `tsc`)
- pnpm (package manager)
- lefthook (pre-push: `vp check` + `vp build`)

## Development Workflow

1. **Start the dev server:**

   ```bash
   pnpm dev  # SPA + Worker on http://localhost:5173
   ```

2. **Make changes** under `src/front`, `src/server`, or `src/shared`

3. **Check before commit:**

   ```bash
   vp check
   vp test
   ```

4. **Test contact form locally:**
   - Frontend: http://localhost:5173/contact
   - Worker API: http://localhost:5173/api/contact
   - Email preview: http://localhost:5173/preview/contact

5. **Commit and push** — `lefthook` runs `vp check` + `vp build` on pre-push; pushing to `main` triggers automatic deployment

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->
