import { describe, it, expect } from 'vitest';

import { render, screen } from '@/test/utils';

import ServerErrorPage from './index';

describe('ServerErrorPage accessibility', () => {
  it('renders Go Home button with aria-label', () => {
    render(<ServerErrorPage />);
    const button = screen.getByTestId('error-500-go-home');
    expect(button.getAttribute('aria-label')).toBe('notFound.goHome');
  });
});
