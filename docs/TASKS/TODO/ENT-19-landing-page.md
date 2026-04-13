# ENT-19: Landing / Marketing Page

## Status: TODO
## Priority: Low
## Depends on: ENT-01
## Agent: frontend-dev

## Objective

Add a public-facing landing page that serves as the "front door" before login — hero section, feature highlights, testimonials, CTA. This is what users see when they first visit the app.

## Implementation Plan

### 1. Page Structure

```
src/features/landing/
├── pages/
│   └── LandingPage/
│       ├── index.tsx
│       ├── components/
│       │   ├── HeroSection.tsx       # Headline, subtext, CTA buttons
│       │   ├── FeaturesGrid.tsx      # Feature cards (6-8 features)
│       │   ├── TestimonialsCarousel.tsx # Customer quotes
│       │   ├── StatsBar.tsx          # "10K+ Users, 99.9% Uptime, ..."
│       │   ├── CtaSection.tsx        # Bottom CTA
│       │   └── LandingFooter.tsx     # Links, social, copyright
│       └── hooks/
│           └── useLandingAnimations.ts
├── data/
│   └── landingData.ts
├── types.ts
└── constants.ts
```

### 2. Sections

1. **Hero**: Large headline, description, "Get Started" + "View Demo" buttons, hero illustration/screenshot
2. **Stats Bar**: Key numbers (users, uptime, integrations)
3. **Features Grid**: 6-8 feature cards with icons — Dashboard, Analytics, Team Management, Real-time, Security, Integrations
4. **Testimonials**: 3 customer quotes in a carousel
5. **CTA**: "Ready to get started?" with sign-up button
6. **Footer**: Navigation links, social icons, copyright

### 3. Design

- Full-width sections with alternating backgrounds
- Smooth scroll animations on reveal
- Mobile-responsive
- No sidebar/header — standalone layout (different from MainLayout)

### 4. Route

- `/` → Landing page (if not authenticated)
- `/` → redirect to `/dashboard` (if authenticated)
- Public route, no auth required

## Success Criteria

- [ ] Landing page renders with all sections
- [ ] Responsive across breakpoints
- [ ] "Get Started" navigates to `/login`
- [ ] Authenticated users bypass to `/dashboard`
- [ ] Smooth animations on scroll
- [ ] Theme-aware
