import { describe, it, expect } from 'vitest';

import { render, screen } from '@/test/utils';

import CtaSection from './CtaSection';

describe('CtaSection accessibility', () => {
  it('renders CTA button with aria-label', () => {
    render(<CtaSection />);
    const button = screen.getByTestId('landing-cta-button');
    expect(button.getAttribute('aria-label')).toBe('landing.cta.button');
  });
});
