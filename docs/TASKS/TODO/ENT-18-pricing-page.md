# ENT-18: Pricing Page

## Status: TODO
## Priority: Low
## Depends on: None
## Agent: frontend-dev

## Objective

Add a Pricing page — a common SaaS template page showing subscription tiers with feature comparison.

## Implementation Plan

### 1. Page Structure

```
src/features/pricing/
├── pages/
│   └── PricingPage/
│       ├── index.tsx
│       ├── components/
│       │   ├── PricingCards.tsx       # Tier cards (Free, Pro, Enterprise)
│       │   ├── PricingToggle.tsx      # Monthly/Yearly toggle
│       │   ├── FeatureComparison.tsx  # Feature comparison table
│       │   └── PricingFaq.tsx         # FAQ accordion
│       └── hooks/
│           └── usePricingToggle.ts
├── data/
│   └── pricingData.ts                # Plans, features, prices
├── types.ts
└── constants.ts
```

### 2. Content

Three tiers:
- **Free**: Basic features, 1 user, limited storage
- **Pro** ($29/mo): All features, 10 users, 100GB storage, priority support
- **Enterprise** ($99/mo): Unlimited everything, SSO, audit logs, SLA

Feature comparison table below cards.
Monthly/Yearly toggle with discount badge ("Save 20%").
FAQ section with Syncfusion Accordion.

### 3. Design

- Hero section with headline
- Card layout (3 cards, center card highlighted as "Most Popular")
- CTA buttons ("Get Started", "Contact Sales")
- Responsive: cards stack vertically on mobile

### 4. Route + Navigation

- Add `/pricing` route (public — accessible without login)

## Success Criteria

- [ ] Three pricing tier cards displayed
- [ ] Monthly/Yearly toggle changes prices
- [ ] Feature comparison table is complete
- [ ] FAQ accordion works
- [ ] Responsive layout
- [ ] Theme-aware
