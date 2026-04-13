import { describe, it, expect } from 'vitest';

import { render, screen } from '@/test/utils';

import ForbiddenPage from './index';

describe('ForbiddenPage accessibility', () => {
  it('renders Go Home button with aria-label', () => {
    render(<ForbiddenPage />);
    const button = screen.getByTestId('error-403-go-home');
    expect(button.getAttribute('aria-label')).toBe('notFound.goHome');
  });
});
