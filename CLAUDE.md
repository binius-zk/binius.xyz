# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a documentation website for Binius, built with [Vocs](https://vocs.dev) (a React-based documentation framework). The site is hosted on AWS Amplify and serves as the main documentation hub at binius.xyz.

## Development Commands

```bash
# Start development server
npm run dev

# Build the documentation site
npm run build

# Preview production build
npm run preview

# Run tests (currently just exits with 0)
npm test
```

## Architecture & Structure

### Core Technologies
- **Framework**: Vocs (React-based documentation framework)
- **Math Rendering**: KaTeX for mathematical formulas via remark-math and rehype-katex
- **Styling**: Tailwind CSS v4
- **Build System**: Vite with custom plugins

### Documentation Organization
The documentation is organized into four main sections:
- **Basics** (`/basics`): Overview, concepts, roadmap, licensing, and resources
- **Building** (`/building`): Tutorials and guides for building with Binius64, including theory, constraints, control flow patterns
- **Blueprint** (`/blueprint`): Deep technical documentation on math background, constraint systems, and backend implementation
- **Benchmarks** (`/benchmarks`): Performance benchmarks and AWS deployment guides

### Key Files
- `vocs.config.tsx`: Main configuration defining navigation, sidebar structure, and markdown processing
- `docs/pages/`: MDX documentation files organized by section
- `docs/components/`: Custom React components (LandingPage, BenchmarkTable, Collapsible, ArrowIcon)
- `docs/styles.css`: Global styles and Tailwind configuration

## Important Configuration

### Git Hooks
The project uses [pre-commit](https://pre-commit.com) for managing git hooks:
- **pre-commit**: Runs `npm test`
- **pre-push**: Runs `npm run build`

These ensure the site builds successfully before code is committed or pushed.

To set up the hooks, install pre-commit and run:
```bash
pre-commit install --hook-type pre-commit --hook-type pre-push
```

### Vocs Configuration Notes
- Custom Vite plugin disables the `llms` plugin to avoid build errors
- Math support enabled through remark-math and rehype-katex plugins
- Google Analytics tracking configured (G-TV9S6QP84Y)
- Content width set to 70ch for optimal reading

## Deployment
- Merges to `main` branch trigger automatic deployment via AWS Amplify
- Build and deployment logs available in AWS Amplify console (us-west-2 region)
- Domain managed through AWS Route53