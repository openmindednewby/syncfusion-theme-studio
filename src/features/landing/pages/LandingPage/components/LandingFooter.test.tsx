import { describe, it, expect } from 'vitest';

import { TestIds } from '@/shared/testIds';
import { render, screen } from '@/test/utils';

import LandingFooter from './LandingFooter';

const MIN_TOUCH_TARGET = '44px';

describe('LandingFooter', () => {
  describe('semantic HTML', () => {
    it('uses a <footer> element as the root wrapper', () => {
      render(<LandingFooter />);
      const footer = screen.getByTestId(TestIds.LANDING_FOOTER);
      expect(footer.tagName).toBe('FOOTER');
    });

    it('wraps navigation links in a <nav> element', () => {
      render(<LandingFooter />);
      const footer = screen.getByTestId(TestIds.LANDING_FOOTER);
      expect(footer.querySelector('nav')).not.toBeNull();
    });
  });

  describe('touch target accessibility', () => {
    it('applies minimum touch target classes to the pricing link', () => {
      render(<LandingFooter />);
      const pricingLink = screen.getByTestId(TestIds.LANDING_FOOTER_PRICING);
      expect(pricingLink.className).toContain(`min-h-[${MIN_TOUCH_TARGET}]`);
      expect(pricingLink.className).toContain(`min-w-[${MIN_TOUCH_TARGET}]`);
    });

    it('applies minimum touch target classes to the login link', () => {
      render(<LandingFooter />);
      const loginLink = screen.getByTestId(TestIds.LANDING_FOOTER_LOGIN);
      expect(loginLink.className).toContain(`min-h-[${MIN_TOUCH_TARGET}]`);
      expect(loginLink.className).toContain(`min-w-[${MIN_TOUCH_TARGET}]`);
    });
  });

  describe('link navigation', () => {
    it('renders pricing link pointing to the pricing page', () => {
      render(<LandingFooter />);
      const pricingLink = screen.getByTestId(TestIds.LANDING_FOOTER_PRICING);
      expect(pricingLink.getAttribute('href')).toBe('/pricing');
    });

    it('renders login link pointing to the login page', () => {
      render(<LandingFooter />);
      const loginLink = screen.getByTestId(TestIds.LANDING_FOOTER_LOGIN);
      expect(loginLink.getAttribute('href')).toBe('/login');
    });
  });

  describe('copyright', () => {
    it('displays the current year in the footer', () => {
      render(<LandingFooter />);
      const footer = screen.getByTestId(TestIds.LANDING_FOOTER);
      const currentYear = String(new Date().getFullYear());
      expect(footer.textContent).toContain(currentYear);
    });
  });
});
