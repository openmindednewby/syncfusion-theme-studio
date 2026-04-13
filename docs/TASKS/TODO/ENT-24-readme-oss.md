# ENT-24: README + Screenshots + Demo

## Status: TODO
## Priority: Medium
## Depends on: All prior tiers
## Agent: —

## Objective

Create a professional open-source README with screenshots, feature list, getting started guide, and contributing instructions. This is the first impression for potential users/contributors.

## Implementation Plan

### 1. README.md

Structure:
- **Hero banner**: Project name + tagline + screenshot
- **Badges**: Build status, license, version, stars
- **Features**: Bullet list of all features with icons
- **Screenshots**: Grid of key pages (dashboard, calendar, kanban, chat, etc.)
- **Tech Stack**: React, TypeScript, Vite, Syncfusion, Tailwind, .NET 9, FastEndpoints
- **Quick Start**:
  - Prerequisites (Node 20, .NET 9)
  - Clone → `npm install` → `npm run dev`
  - Docker: `docker compose up`
- **Project Structure**: Directory tree
- **Available Pages**: Table of all routes with descriptions
- **Demo Credentials**: admin/manager/viewer accounts
- **Customization**: How to change theme, add pages, modify API
- **Contributing**: Link to CONTRIBUTING.md
- **License**: MIT

### 2. CONTRIBUTING.md

- Development setup
- Branch naming convention
- Commit message format
- PR process
- Code standards (link to docs/code-standards/)

### 3. Screenshots

- Capture 8-10 key pages in both light and dark mode
- Store in `docs/screenshots/`
- Reference in README

### 4. Demo GIF

- 15-second GIF showing: login → dashboard → theme toggle → navigate to calendar → switch to kanban
- Store as `docs/demo.gif`

## Success Criteria

- [ ] README is comprehensive and well-formatted
- [ ] Screenshots show all major features
- [ ] Quick start instructions work from scratch
- [ ] Docker quick start works
- [ ] CONTRIBUTING.md is complete
- [ ] LICENSE file exists (MIT)
