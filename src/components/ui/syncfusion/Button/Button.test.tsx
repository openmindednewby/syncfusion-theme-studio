import { describe, it, expect, vi, beforeEach } from 'vitest';

import { render, screen, fireEvent } from '@/test/utils';

import Button from './index';

// Mock Syncfusion ButtonComponent
vi.mock('@syncfusion/ej2-react-buttons', () => ({
  ButtonComponent: vi.fn(({ children, onClick, cssClass, disabled, ...props }) => (
    <button
      className={cssClass}
      disabled={disabled}
      type="button"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )),
}));

// Mock useThemeStore
const mockMode = { current: 'light' as 'light' | 'dark' };
vi.mock('@/stores/useThemeStore', () => ({
  useThemeStore: () => ({ mode: mockMode.current }),
}));

describe('Button', () => {
  beforeEach(() => {
    mockMode.current = 'light';
  });

  describe('click behavior', () => {
    it('calls onClick callback when clicked', () => {
      const handleClick = vi.fn();
      render(<Button testId="btn" onClick={handleClick}>Click</Button>);
      fireEvent.click(screen.getByTestId('btn'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(<Button disabled testId="btn" onClick={handleClick}>Click</Button>);
      expect(screen.getByTestId('btn')).toBeDisabled();
    });
  });

  describe('theme integration', () => {
    it('applies sf-light class in light mode', () => {
      mockMode.current = 'light';
      render(<Button testId="btn">Light</Button>);
      expect(screen.getByTestId('btn').className).toContain('sf-light');
    });

    it('applies sf-dark class in dark mode', () => {
      mockMode.current = 'dark';
      render(<Button testId="btn">Dark</Button>);
      expect(screen.getByTestId('btn').className).toContain('sf-dark');
    });
  });

  describe('variants', () => {
    it('applies primary variant by default', () => {
      render(<Button testId="btn">Primary</Button>);
      const cls = screen.getByTestId('btn').className;
      expect(cls).toContain('e-primary');
      expect(cls).toContain('sf-btn-primary');
    });

    it('applies danger variant', () => {
      render(<Button testId="btn" variant="danger">Danger</Button>);
      const cls = screen.getByTestId('btn').className;
      expect(cls).toContain('e-danger');
      expect(cls).toContain('sf-btn-danger');
    });
  });

  describe('sizes', () => {
    it('applies small size', () => {
      render(<Button size="sm" testId="btn">Small</Button>);
      expect(screen.getByTestId('btn').className).toContain('e-small');
    });

    it('applies large size', () => {
      render(<Button size="lg" testId="btn">Large</Button>);
      expect(screen.getByTestId('btn').className).toContain('e-large');
    });
  });

  describe('fullWidth', () => {
    it('applies full width classes', () => {
      render(<Button fullWidth testId="btn">Full</Button>);
      const cls = screen.getByTestId('btn').className;
      expect(cls).toContain('e-block');
      expect(cls).toContain('sf-btn-full');
    });
  });

  describe('loading state', () => {
    it('applies loading class and disables button', () => {
      render(<Button loading testId="btn">Loading</Button>);
      const btn = screen.getByTestId('btn');
      expect(btn.className).toContain('sf-btn-loading');
      expect(btn).toBeDisabled();
    });
  });

  describe('accessibility', () => {
    it('sets aria-label when provided', () => {
      render(<Button ariaLabel="Submit form" testId="btn">Submit</Button>);
      expect(screen.getByTestId('btn').getAttribute('aria-label')).toBe('Submit form');
    });
  });
});
