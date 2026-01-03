# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a corporate homepage for 株式会社テックリード (TechLead Inc.), structured as a **pnpm workspace monorepo** with three packages:

- **web/**: React SPA for the homepage (deployed to GitHub Pages)
- **worker/**: Cloudflare Worker for contact form API
- **shared/**: Common types and validation schemas

## Monorepo Structure

```
homepage/
├── web/              # Frontend React application
├── worker/           # Cloudflare Worker for API
├── shared/           # Shared types and schemas
├── pnpm-workspace.yaml
└── package.json      # Root workspace configuration
```

## Development Commands

**Package Manager**: Use `pnpm` exclusively (not npm or yarn)

### Root Level Commands

```bash
# Development (runs both web and worker dev servers in parallel)
pnpm dev

# Type checking
pnpm typecheck              # All packages
pnpm typecheck:web          # Web only
pnpm typecheck:worker       # Worker only

# Code quality (Oxlint + Oxfmt)
pnpm format                 # Format all packages
pnpm format:check           # Check formatting
pnpm lint                   # Lint all packages
pnpm check                  # Format + lint all packages
pnpm check:web              # Web only
pnpm check:worker           # Worker only
pnpm check:shared           # Shared only

# Build
pnpm build                  # Build worker, then web
pnpm build:web              # Build web only
pnpm build:worker           # Build worker only
```

### Package-Specific Commands

```bash
# Web (from web/ directory or use pnpm --filter web <command>)
pnpm dev                    # Start dev server at http://localhost:5173
pnpm build                  # TypeScript check + production build to dist/
pnpm format                 # Format with Oxfmt
pnpm lint                   # Lint with Oxlint
pnpm check                  # Run Oxfmt + Oxlint
pnpm typecheck              # Type check with tsgo

# Worker (from worker/ directory or use pnpm --filter worker <command>)
pnpm dev                    # Start worker dev server at http://localhost:8787
pnpm deploy                 # Deploy to Cloudflare Workers
pnpm build                  # Build with tsgo
pnpm format                 # Format with Oxfmt
pnpm lint                   # Lint with Oxlint
pnpm check                  # Run Oxfmt + Oxlint
pnpm typecheck              # Type check with tsgo
```

## Web Architecture

### Data-Driven Content Model

All content is separated from presentation in `web/src/data/`:
- **company.ts**: Company info and client list
- **philosophy.ts**: Mission, vision, values, identity
- **projects.ts**: Project portfolio (real client work)
- **services.ts**: Service offerings
- **techStack.ts**: Technologies with proficiency levels (1-5)
- **processSteps.ts**: Agile development process
- **strengths.ts**: Company strengths
- **recruitment.ts**: Job positions

Type definitions in `web/src/types/index.ts` ensure type safety across all data.

### Component Architecture

**Layout Pattern**: All pages wrapped in `Layout` component which provides:
- Fixed header navigation
- Main content area with top padding (pt-16) to account for fixed header
- Footer
- Automatic scroll-to-top on route change

**Page Components** (`web/src/pages/`):
- Each page uses `Section` components with alternating `background="white"` and `background="gray"`
- All pages follow the pattern: Hero → Content Sections → CTA

**Reusable UI Components** (`web/src/components/ui/`):
- `Section`: Content wrapper with configurable background
- `Card`: Content card with optional hover effect
- `Button`: Links styled as buttons (uses react-router-dom Link)

### Routing

Client-side routing via react-router-dom with BrowserRouter. Routes defined in `web/src/App.tsx`:
- `/` - Home
- `/about` - Company info
- `/introduction` - Company introduction
- `/recruitment` - Job listings
- `/contact` - Contact form
- `/contact/thanks` - Form submission success page

### Styling

- **Tailwind CSS v4** with `@tailwindcss/vite` plugin
- Space indentation (configured in `.oxfmtrc.json`)
- Mobile-first responsive design
- Breakpoints: `md:` (tablet), `lg:` (desktop)

### Base Path Configuration

Production builds use `/homepage/` base path for GitHub Pages (configured in `web/vite.config.ts`). This is critical for proper asset loading in production.

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

### Frontend (web/)

**Technologies:**
- react-hook-form: Form state management
- Valibot: Schema validation via valibotResolver
- @homepage/shared: Shared validation schema and types

**Features:**
- Real-time validation on blur (`mode: "onBlur"`)
- Field-specific error messages
- Multiple server error handling via `setError`
- Loading state during submission
- Success page navigation

**Environment Variables:**
- `VITE_CONTACT_FORM_ENDPOINT`: Worker API endpoint
  - Development: `http://localhost:8787/api/contact`
  - Production: Set by GitHub Actions during deployment

### Backend (worker/)

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
- `ALLOWED_ORIGIN`: CORS allowed origin
- `WORKER_ENV`: Environment ("development" or "production")

**Email Template:**
- React JSX component (`worker/emails/contact-notification.tsx`)
- Modern card design with FieldSection component
- Rendered to HTML via `renderToStaticMarkup`

### Shared Package (shared/)

**Purpose:** Centralize validation logic and type definitions

**Exports:**
```typescript
// Schemas
export const contactSchema: v.ObjectSchema

// Types
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

### Automated Deployment via GitHub Actions

The project uses **separate workflows** for web and worker deployments, triggered independently based on file changes.

#### Workflow Files
- `.github/workflows/deploy-worker.yaml` - Worker deployment
- `.github/workflows/deploy-web.yaml` - Web deployment
- `.github/workflows/ci-worker.yaml` - Worker CI (lint, typecheck, build)
- `.github/workflows/ci-web.yaml` - Web CI (lint, typecheck, build)
- `.github/workflows/pinact-check.yaml` - GitHub Actions version pinning check

#### Deployment Triggers

**Worker Deployment** (runs when worker-related files change):
- Triggers on push to `main` with changes to:
  - `worker/**`
  - `shared/**`
  - `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`
  - `.github/workflows/deploy-worker.yaml`
- Steps:
  1. Build worker with `pnpm build:worker`
  2. Deploy using `cloudflare/wrangler-action@v3.14.1`

**Web Deployment** (runs when web-related files change):
- Triggers on push to `main` with changes to:
  - `web/**`
  - `shared/**`
  - `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`
  - `.github/workflows/deploy-web.yaml`
- Steps:
  1. Set `VITE_CONTACT_FORM_ENDPOINT` to `secrets.CLOUDFLARE_API_ENDPOINT`
  2. Build web with `pnpm build:web`
  3. Deploy `web/dist/` to GitHub Pages

**Note**: Web and worker deployments are **independent**. The worker URL is fixed (`secrets.CLOUDFLARE_API_ENDPOINT`) and does not require dynamic retrieval from worker deployment.

#### CI Workflows

**CI runs on**:
- Pull requests with changes to relevant files
- Push to `main` branch with changes to relevant files

Each workflow (ci-web, ci-worker) runs:
- Oxlint linting (with GitHub annotations)
- Oxfmt format checking
- TypeScript type checking
- Production build validation

**Pinact Check** runs only when workflow files (`.github/workflows/**`) are modified.

### Manual Worker Deployment

```bash
cd worker
pnpm deploy

# Set secrets (first time only)
pnpx wrangler secret put RESEND_API_KEY
pnpx wrangler secret put TO_EMAIL
```

## Code Style

- **Indentation**: Spaces (2 spaces, configured in `.oxfmtrc.json`)
- **Quotes**: Double quotes for strings
- **Imports**: Auto-sorted by Oxlint (`sort-imports` rule)
- **TypeScript**: Strict mode enabled
- Use Oxlint for linting and Oxfmt for formatting (not ESLint/Prettier/Biome)

## Key Technologies

### Frontend
- React 19.2.0
- TypeScript 5.9.3
- Tailwind CSS v4
- react-router-dom 7.9.5
- react-hook-form 7.66.0
- Valibot 1.1.0

### Backend
- Hono 4.10.4
- Valibot 1.1.0
- Resend 6.4.2
- React (for JSX email templates)

### Build Tools
- Vite (web)
- tsgo (TypeScript compilation)
- Oxlint (linting)
- Oxfmt (formatting)
- pnpm (package manager)

## Development Workflow

1. **Start development servers:**
   ```bash
   pnpm dev  # Runs both web and worker in parallel
   ```

2. **Make changes** to web/, worker/, or shared/

3. **Type check before commit:**
   ```bash
   pnpm typecheck
   pnpm check
   ```

4. **Test contact form locally:**
   - Frontend: http://localhost:5173/contact
   - Worker API: http://localhost:8787/api/contact
   - Email preview: http://localhost:8787/preview/contact

5. **Commit and push** to trigger automatic deployment


# AI-DLC and Spec-Driven Development

Kiro-style Spec Driven Development implementation on AI-DLC (AI Development Life Cycle)

## Project Context

### Paths
- Steering: `.kiro/steering/`
- Specs: `.kiro/specs/`

### Steering vs Specification

**Steering** (`.kiro/steering/`) - Guide AI with project-wide rules and context
**Specs** (`.kiro/specs/`) - Formalize development process for individual features

### Active Specifications
- Check `.kiro/specs/` for active specifications
- Use `/kiro:spec-status [feature-name]` to check progress

## Development Guidelines
- Think in English, but generate responses in Japanese (思考は英語、回答の生成は日本語で行うように)

## Minimal Workflow
- Phase 0 (optional): `/kiro:steering`, `/kiro:steering-custom`
- Phase 1 (Specification):
  - `/kiro:spec-init "description"`
  - `/kiro:spec-requirements {feature}`
  - `/kiro:validate-gap {feature}` (optional: for existing codebase)
  - `/kiro:spec-design {feature} [-y]`
  - `/kiro:validate-design {feature}` (optional: design review)
  - `/kiro:spec-tasks {feature} [-y]`
- Phase 2 (Implementation): `/kiro:spec-impl {feature} [tasks]`
  - `/kiro:validate-impl {feature}` (optional: after implementation)
- Progress check: `/kiro:spec-status {feature}` (use anytime)

## Development Rules
- 3-phase approval workflow: Requirements → Design → Tasks → Implementation
- Human review required each phase; use `-y` only for intentional fast-track
- Keep steering current and verify alignment with `/kiro:spec-status`

## Steering Configuration
- Load entire `.kiro/steering/` as project memory
- Default files: `product.md`, `tech.md`, `structure.md`
- Custom files are supported (managed via `/kiro:steering-custom`)

