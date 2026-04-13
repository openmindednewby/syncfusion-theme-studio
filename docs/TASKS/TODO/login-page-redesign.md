# Login Page Redesign — ClearSkies Figma Design

## Status: TODO
## Priority: P2 (UI/UX)
## Depends on: None
## Agent: frontend-dev
## Figma: https://www.figma.com/proto/hUmIuixKisBimyJlBjW1KK/MSSP---SWP-LOGIN?page-id=2183%3A114&node-id=2183-588&viewport=486%2C320%2C0.41&t=Bx4whPx1l7LzmKlN-1&scaling=min-zoom&content-scaling=fixed

## Goal

Transform the login page to match the approved Figma prototype ("MSSP - SWP LOGIN - FINAL APPROVED") without sacrificing any of the existing performance optimizations.

## Current State

The login page (`src/features/auth/pages/LoginPage/index.tsx`) is a simple centered card with:
- "Welcome Back" heading + "Sign in to your account" subtitle
- Email and Password fields (native components)
- "Sign In" button
- "Demo login" hint text
- Flat dark background

### Performance optimizations to preserve

| Optimization | File | Purpose |
|-------------|------|---------|
| Separate CSS entry | `src/styles/login.css` | Only imports `components-critical.css` (btn, card, input) — NOT the full component library |
| Zero Syncfusion deps | `LoginPage/index.tsx` | Uses only native components (`InputNative`, `ButtonNative`, `HeadingNative`, `TextNative`) |
| Phased preloading | `startPhasedPreload()` | Lazy-loads heavy chunks (routes, Syncfusion) in background while user sees login |
| CSS layer ordering | `login.css` | `@layer base, components, utilities` keeps CSS minimal |

**These MUST remain untouched. No new heavy dependencies on the login page.**

## Target Design (from Figma)

### Layout

Full-viewport dark teal background with decorative abstract swoosh curves. Centered login card split horizontally into two panels:

```
+--------------------------------------------------+
|                                                    |
|     [  Dark teal background with SVG swooshes  ]  |
|                                                    |
|     +--------------------+---------------------+  |
|     |                    |                      |  |
|     |  Purple-to-blue    |    Light gray panel  |  |
|     |  gradient panel    |                      |  |
|     |                    |    Username           |  |
|     |  [Logo SVG]        |    [___________]     |  |
|     |  ClearSkies        |                      |  |
|     |                    |    Password           |  |
|     |  "Your Gateway to  |    [___________]     |  |
|     |   Empowered        |         forgot pwd → |  |
|     |   Security"        |                      |  |
|     |                    |    [ LOGIN button ]   |  |
|     +--------------------+---------------------+  |
|                                                    |
+--------------------------------------------------+
```

### Visual details

1. **Background**: Dark teal (#1a3a4a-ish) with 2-3 large abstract curved SVG paths in a slightly lighter teal. Subtle depth effect.

2. **Left panel (branding)**:
   - Background: Linear gradient from purple/magenta (top-left) to cyan/blue (bottom-right)
   - Rounded corners on left side, slight overall card border-radius
   - ClearSkies logo (white, ~60px) — **needs SVG asset**
   - "ClearSkies" wordmark in white, large font
   - Tagline: "Your Gateway to Empowered Security" in white, smaller

3. **Right panel (form)**:
   - Background: Light gray (~#d4d8dc)
   - "Username" label in teal/dark color, input field with white background
   - "Password" label, input field with white background
   - "forgot password" link aligned right below password field (teal color)
   - "LOGIN" button: Cyan/teal pill-shaped, uppercase text, full width within panel

4. **Responsive**: Split card collapses to stacked on mobile — branding panel on top, form panel below.

5. **Animation**: The Figma references "VIEW ACTUAL FUNCTION/ANIMATION HERE" — likely a subtle animation on the background swooshes or card entrance. Investigate and implement if CSS-only (no JS animation libraries).

## Implementation Approach

### 1. Background swooshes — Inline SVG (~1-2KB)

Create 2-3 `<path>` elements for the abstract curves, inlined in the component JSX. Use `position: absolute; inset: 0` behind the card. No external image fetch, no layout shift.

```
src/features/auth/pages/LoginPage/
  components/LoginBackground.tsx    # Inline SVG swooshes
```

### 2. Split card layout — CSS only

Convert the existing single card to a flex row with two children. Use CSS grid or flexbox. Collapses to `flex-direction: column` on mobile via Tailwind responsive classes.

### 3. Left branding panel — CSS gradient + inline SVG

- CSS `background: linear-gradient(135deg, #8b2fc6, #00b4d8)` (approximate from Figma)
- ClearSkies logo as inline SVG component
- Text via existing `TextNative` / `HeadingNative`

### 4. Right form panel — Restyle existing form

- Light gray background via Tailwind class
- Existing `InputNative` + `ButtonNative` stay
- Add "forgot password" link (plain `<a>` or `TextNative` with `onClick`)
- Restyle LOGIN button to cyan pill via CSS custom properties or className override

### 5. Animation (if applicable) — CSS-only

- `@keyframes` on background SVG paths (subtle translate/scale drift)
- `will-change: transform` for GPU compositing
- `prefers-reduced-motion: reduce` media query to disable
- Zero JS runtime cost

### 6. "Forgot password" link

- Add as a styled anchor/button below the password field
- Route to a new `/forgot-password` page OR show as non-functional placeholder initially
- Decision: **non-functional placeholder for now** — just visual, no route

## Files to modify

| File | Action | Notes |
|------|--------|-------|
| `src/features/auth/pages/LoginPage/index.tsx` | **Edit** | Restructure JSX to split card layout, add background, add forgot password link |
| `src/features/auth/pages/LoginPage/components/LoginBackground.tsx` | **Create** | Inline SVG background swooshes |
| `src/features/auth/pages/LoginPage/components/BrandingPanel.tsx` | **Create** | Left panel with gradient, logo, tagline |
| `src/features/auth/pages/LoginPage/components/ClearSkiesLogo.tsx` | **Create** | Inline SVG logo component |
| `src/styles/login.css` | **Edit** | Add login-specific styles (gradient, swoosh animation if needed) |
| `src/localization/locales/en.json` | **Edit** | Add new i18n keys for tagline, forgot password, etc. |

## Open questions

- [ ] **ClearSkies logo SVG**: Need the actual SVG asset. Extract from Figma or obtain from design team. The logo is a stylized double-swirl/wave icon.
- [ ] **Exact colors**: Extract precise color values from Figma design mode (gradient stops, background teal, button cyan). The prototype view gives approximate colors only.
- [ ] **Animation scope**: The "VIEW ACTUAL FUNCTION/ANIMATION HERE" link in the Figma suggests a separate animation reference. Check if there's a linked prototype with motion specs.

## Acceptance criteria

- [ ] Login page matches Figma prototype visually (layout, colors, typography)
- [ ] ClearSkies logo renders as inline SVG
- [ ] Split card responsive — stacks on mobile (branding top, form below)
- [ ] "forgot password" link visible below password field
- [ ] LOGIN button styled as cyan pill
- [ ] Background swooshes render as inline SVG
- [ ] CSS animation on swooshes with `prefers-reduced-motion` support (if in scope)
- [ ] `login.css` still only imports `components-critical.css` — no new heavy imports
- [ ] Zero Syncfusion dependencies on login page
- [ ] `startPhasedPreload()` still called on mount
- [ ] Lighthouse performance score unchanged (no regression)
- [ ] All existing login E2E tests pass (test IDs preserved)
- [ ] `npm run lint:fix` — no errors
- [ ] `npm run test:coverage` — all tests pass
- [ ] `npm run build` — build succeeds

## Verification

1. Visual: Compare live page against Figma prototype at desktop and mobile widths
2. Performance: Run Lighthouse audit — FCP and LCP must not regress
3. Bundle: Verify no new chunks added to login critical path
4. E2E: Existing login tests pass (testIds: `LOGIN_USERNAME`, `LOGIN_PASSWORD`, `LOGIN_SUBMIT`)
