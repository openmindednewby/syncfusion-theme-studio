import { describe, it, expect, vi } from 'vitest';

import { render, screen } from '@/test/utils';

import PricingToggle from './PricingToggle';

describe('PricingToggle accessibility', () => {
  it('has role="switch" on the toggle button', () => {
    render(<PricingToggle isYearly={false} onToggle={vi.fn()} />);
    const button = screen.getByTestId('pricing-toggle-button');
    expect(button.getAttribute('role')).toBe('switch');
  });

  it('sets aria-checked to false when isYearly is false', () => {
    render(<PricingToggle isYearly={false} onToggle={vi.fn()} />);
    const button = screen.getByTestId('pricing-toggle-button');
    expect(button.getAttribute('aria-checked')).toBe('false');
  });

  it('sets aria-checked to true when isYearly is true', () => {
    render(<PricingToggle isYearly onToggle={vi.fn()} />);
    const button = screen.getByTestId('pricing-toggle-button');
    expect(button.getAttribute('aria-checked')).toBe('true');
  });
});
