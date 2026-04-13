import { describe, it, expect } from 'vitest';

import { render, screen } from '@/test/utils';

import UnauthorizedPage from './index';

describe('UnauthorizedPage accessibility', () => {
  it('renders Go Home button with aria-label', () => {
    render(<UnauthorizedPage />);
    const button = screen.getByTestId('error-401-go-home');
    expect(button.getAttribute('aria-label')).toBe('notFound.goHome');
  });
});
