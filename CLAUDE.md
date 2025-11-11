# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a corporate homepage for 株式会社テックリード (TechLead Inc.), built as a React SPA using Vite. The site is deployed to GitHub Pages at `/homepage/` base path.

## Development Commands

**Package Manager**: Use `pnpm` exclusively (not npm or yarn)

```bash
# Development
pnpm dev              # Start dev server at http://localhost:5173

# Build
pnpm build            # TypeScript check + production build to dist/

# Code Quality
pnpm check            # Run Biome formatting, linting, and import organization (with --write)
pnpm check:ci         # Same as check but without modifications (for CI)
pnpm format           # Format code with Biome
pnpm format:check     # Check formatting without modifications
pnpm lint             # Lint and auto-fix with Biome
pnpm lint:check       # Lint without auto-fix
```

## Architecture

### Data-Driven Content Model

All content is separated from presentation in `src/data/`:
- **company.ts**: Company info and client list
- **philosophy.ts**: Mission, vision, values, identity
- **projects.ts**: Project portfolio (real client work)
- **services.ts**: Service offerings
- **techStack.ts**: Technologies with proficiency levels (1-5)
- **processSteps.ts**: Agile development process
- **strengths.ts**: Company strengths
- **recruitment.ts**: Job positions

Type definitions in `src/types/index.ts` ensure type safety across all data.

### Component Architecture

**Layout Pattern**: All pages wrapped in `Layout` component which provides:
- Fixed header navigation
- Main content area with top padding (pt-16) to account for fixed header
- Footer
- Automatic scroll-to-top on route change

**Page Components** (`src/pages/`):
- Each page uses `Section` components with alternating `background="white"` and `background="gray"`
- All pages follow the pattern: Hero → Content Sections → CTA

**Reusable UI Components** (`src/components/ui/`):
- `Section`: Content wrapper with configurable background
- `Card`: Content card with optional hover effect
- `Button`: Links styled as buttons (uses react-router-dom Link)

### Routing

Client-side routing via react-router-dom with BrowserRouter. Routes defined in `App.tsx`:
- `/` - Home
- `/about` - Company info
- `/introduction` - Company introduction
- `/recruitment` - Job listings
- `/contact` - Contact information

### Styling

- **Tailwind CSS v4** with `@tailwindcss/vite` plugin
- Tab indentation (configured in biome.json)
- Mobile-first responsive design
- Breakpoints: `md:` (tablet), `lg:` (desktop)

### Base Path Configuration

Production builds use `/homepage/` base path for GitHub Pages (configured in `vite.config.ts`). This is critical for proper asset loading in production.

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

### Contact Form

The contact form is currently **commented out** in `Contact.tsx`. Instead, the page displays the email address `info@techlead.jp` with a mailto link. The form code is preserved in comments for future implementation.

### Scroll Behavior

The Layout component implements scroll-to-top on route change using `useState` to track pathname changes. This ensures users see the top of each new page.

## Deployment

Deployment happens automatically via GitHub Actions on push to `main` branch:
1. Checkout code
2. Setup Node.js 19.3.0 and pnpm 8.6.0
3. Install dependencies with pnpm
4. Build with `pnpm run build`
5. Deploy `dist/` directory to GitHub Pages

The site is served from the `/homepage/` subdirectory on GitHub Pages.

## Code Style

- **Indentation**: Tabs (enforced by Biome)
- **Quotes**: Double quotes for strings
- **Imports**: Auto-organized by Biome
- **TypeScript**: Strict mode enabled
- Use Biome for all formatting and linting (not ESLint/Prettier)
