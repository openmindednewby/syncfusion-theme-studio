import { describe, it, expect, vi } from 'vitest';

import { render, screen, fireEvent } from '@/test/utils';

import { AppErrorFallback } from './AppErrorFallback';

vi.mock('@/localization/utils/helpers', () => ({
  FM: (key: string) => key,
}));

describe('AppErrorFallback', () => {
  describe('accessibility', () => {
    it('renders the reload button with aria-label', () => {
      render(<AppErrorFallback />);
      const button = screen.getByRole('button');
      expect(button.getAttribute('aria-label')).toBe('Reload Page');
    });
  });

  describe('reload behavior', () => {
    it('calls window.location.reload when button is clicked', () => {
      const reloadMock = vi.fn();
      Object.defineProperty(window, 'location', {
        value: { reload: reloadMock },
        writable: true,
      });

      render(<AppErrorFallback />);
      fireEvent.click(screen.getByRole('button'));
      expect(reloadMock).toHaveBeenCalledTimes(1);
    });
  });
});
