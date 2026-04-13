import { describe, it, expect, vi } from 'vitest';

import { render, screen } from '@/test/utils';

import FeaturesGrid from './FeaturesGrid';

vi.mock('@/localization/utils/helpers', () => ({
  FM: (key: string) => key,
}));

describe('FeaturesGrid', () => {
  it('renders all feature icon SVGs with aria-hidden="true"', () => {
    render(<FeaturesGrid />);
    const featureSection = screen.getByTestId('landing-features');
    const svgs = featureSection.querySelectorAll('svg');

    svgs.forEach((svg) => {
      expect(svg.getAttribute('aria-hidden')).toBe('true');
    });
  });

  it('renders the features section with correct test ID', () => {
    render(<FeaturesGrid />);
    expect(screen.getByTestId('landing-features')).toBeDefined();
  });
});
