import { describe, it, expect, vi } from 'vitest';

import { render, screen } from '@/test/utils';

import HeroSection from './HeroSection';

vi.mock('@/localization/utils/helpers', () => ({
  FM: (key: string) => key,
}));

describe('HeroSection', () => {
  describe('aria-label uses FM() instead of hardcoded strings', () => {
    it('uses FM() for the Get Started button aria-label', () => {
      render(<HeroSection />);
      const button = screen.getByTestId('landing-get-started');
      // FM mock returns the key directly
      expect(button.getAttribute('aria-label')).toBe('landing.hero.getStarted');
    });

    it('uses FM() for the View Demo button aria-label', () => {
      render(<HeroSection />);
      const button = screen.getByTestId('landing-view-demo');
      expect(button.getAttribute('aria-label')).toBe('landing.hero.viewDemo');
    });
  });

  it('renders the hero section with correct test ID', () => {
    render(<HeroSection />);
    expect(screen.getByTestId('landing-hero')).toBeDefined();
  });
});
