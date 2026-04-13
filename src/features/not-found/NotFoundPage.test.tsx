import { describe, it, expect, vi } from 'vitest';

import { render, screen } from '@/test/utils';

import NotFoundPage from './NotFoundPage';

vi.mock('@/localization/utils/helpers', () => ({
  FM: (key: string) => key,
}));

describe('NotFoundPage', () => {
  it('uses unique testId ERROR_404_GO_HOME for the go-home button', () => {
    render(<NotFoundPage />);
    const button = screen.getByTestId('error-404-go-home');
    expect(button).toBeDefined();
    expect(button.tagName.toLowerCase()).toBe('button');
  });

  it('uses FM() for aria-label instead of hardcoded string', () => {
    render(<NotFoundPage />);
    const button = screen.getByTestId('error-404-go-home');
    // FM mock returns the key, so aria-label should be the translation key
    expect(button.getAttribute('aria-label')).toBe('notFound.goHome');
  });
});
