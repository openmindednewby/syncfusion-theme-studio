import { describe, it, expect, vi } from 'vitest';

import { render, screen } from '@/test/utils';

import ForbiddenPage from './ForbiddenPage/index';
import ServerErrorPage from './ServerErrorPage/index';
import UnauthorizedPage from './UnauthorizedPage/index';

vi.mock('@/localization/utils/helpers', () => ({
  FM: (key: string) => key,
}));

describe('Error page testIds', () => {
  describe('UnauthorizedPage (401)', () => {
    it('uses unique testId ERROR_401_GO_HOME for the go-home button', () => {
      render(<UnauthorizedPage />);
      const button = screen.getByTestId('error-401-go-home');
      expect(button).toBeDefined();
      expect(button.tagName.toLowerCase()).toBe('button');
    });
  });

  describe('ForbiddenPage (403)', () => {
    it('uses unique testId ERROR_403_GO_HOME for the go-home button', () => {
      render(<ForbiddenPage />);
      const button = screen.getByTestId('error-403-go-home');
      expect(button).toBeDefined();
      expect(button.tagName.toLowerCase()).toBe('button');
    });
  });

  describe('ServerErrorPage (500)', () => {
    it('uses unique testId ERROR_500_GO_HOME for the go-home button', () => {
      render(<ServerErrorPage />);
      const button = screen.getByTestId('error-500-go-home');
      expect(button).toBeDefined();
      expect(button.tagName.toLowerCase()).toBe('button');
    });

    it('uses text-error-500 instead of text-red-500 for the icon', () => {
      const { container } = render(<ServerErrorPage />);
      const iconWrapper = container.querySelector('.text-error-500');
      expect(iconWrapper).not.toBeNull();
      const redWrapper = container.querySelector('.text-red-500');
      expect(redWrapper).toBeNull();
    });
  });

  describe('all error pages have unique testIds', () => {
    it('no two error pages share the same go-home testId', () => {
      const { unmount: u1 } = render(<UnauthorizedPage />);
      const btn401 = screen.getByTestId('error-401-go-home');
      expect(btn401.getAttribute('data-testid')).toBe('error-401-go-home');
      u1();

      const { unmount: u2 } = render(<ForbiddenPage />);
      const btn403 = screen.getByTestId('error-403-go-home');
      expect(btn403.getAttribute('data-testid')).toBe('error-403-go-home');
      u2();

      const { unmount: _u3 } = render(<ServerErrorPage />);
      const btn500 = screen.getByTestId('error-500-go-home');
      expect(btn500.getAttribute('data-testid')).toBe('error-500-go-home');
    });
  });
});
