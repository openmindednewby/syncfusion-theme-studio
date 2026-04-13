/** Public landing page — hero, stats, features, testimonials, CTA, and footer. */
import { memo } from 'react';

import { TestIds } from '@/shared/testIds';

import CtaSection from './components/CtaSection';
import FeaturesGrid from './components/FeaturesGrid';
import HeroSection from './components/HeroSection';
import LandingFooter from './components/LandingFooter';
import StatsBar from './components/StatsBar';
import TestimonialsSection from './components/TestimonialsSection';

const LandingPage = memo((): JSX.Element => (
  <main className="min-h-screen bg-background" data-testid={TestIds.LANDING_PAGE}>
    <HeroSection />
    <StatsBar />
    <FeaturesGrid />
    <TestimonialsSection />
    <CtaSection />
    <LandingFooter />
  </main>
));

LandingPage.displayName = 'LandingPage';

export default LandingPage;
