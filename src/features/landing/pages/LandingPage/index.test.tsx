import { describe, it, expect } from 'vitest';

import { TestIds } from '@/shared/testIds';
import { render, screen } from '@/test/utils';

import LandingPage from './index';

describe('LandingPage', () => {
  describe('semantic HTML', () => {
    it('uses a <main> element as the root wrapper', () => {
      render(<LandingPage />);
      const page = screen.getByTestId(TestIds.LANDING_PAGE);
      expect(page.tagName).toBe('MAIN');
    });
  });

  describe('section composition', () => {
    it('renders all expected landing page sections', () => {
      render(<LandingPage />);

      expect(screen.getByTestId(TestIds.LANDING_HERO)).toBeDefined();
      expect(screen.getByTestId(TestIds.LANDING_STATS)).toBeDefined();
      expect(screen.getByTestId(TestIds.LANDING_FEATURES)).toBeDefined();
      expect(screen.getByTestId(TestIds.LANDING_TESTIMONIALS)).toBeDefined();
      expect(screen.getByTestId(TestIds.LANDING_CTA)).toBeDefined();
      expect(screen.getByTestId(TestIds.LANDING_FOOTER)).toBeDefined();
    });

    it('renders sections inside the main element', () => {
      render(<LandingPage />);
      const main = screen.getByTestId(TestIds.LANDING_PAGE);

      expect(main.querySelector(`[data-testid="${TestIds.LANDING_HERO}"]`)).not.toBeNull();
      expect(main.querySelector(`[data-testid="${TestIds.LANDING_FOOTER}"]`)).not.toBeNull();
    });
  });
});
