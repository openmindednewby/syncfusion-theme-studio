import { describe, it, expect, vi } from 'vitest';

import { render, screen } from '@/test/utils';

import TestimonialsSection from './TestimonialsSection';

vi.mock('@/localization/utils/helpers', () => ({
  FM: (key: string) => key,
}));

describe('TestimonialsSection', () => {
  it('renders all quote icon SVGs with aria-hidden="true"', () => {
    render(<TestimonialsSection />);
    const section = screen.getByTestId('landing-testimonials');
    const svgs = section.querySelectorAll('svg');

    svgs.forEach((svg) => {
      expect(svg.getAttribute('aria-hidden')).toBe('true');
    });
  });

  it('renders the testimonials section with correct test ID', () => {
    render(<TestimonialsSection />);
    expect(screen.getByTestId('landing-testimonials')).toBeDefined();
  });
});
