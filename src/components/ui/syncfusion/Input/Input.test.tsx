import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Mode } from '@/stores/mode';
import { render, screen } from '@/test/utils';

import Input from './index';

// Mock Syncfusion TextBoxComponent
vi.mock('@syncfusion/ej2-react-inputs', () => ({
  TextBoxComponent: vi.fn(
    ({ cssClass, htmlAttributes, floatLabelType: _floatLabelType, ...props }) => (
      <input className={cssClass} id={htmlAttributes?.id} type="text" {...props} />
    )
  ),
}));

// Mock useThemeStore
const mockMode = { current: Mode.Light as Mode };
vi.mock('@/stores/useThemeStore', () => ({
  useThemeStore: () => ({ mode: mockMode.current }),
}));

describe('Input', () => {
  beforeEach(() => {
    mockMode.current = Mode.Light;
  });

  describe('theme integration', () => {
    it('applies sf-light class in light mode', () => {
      render(<Input testId="input" />);
      const input = screen.getByTestId('input').querySelector('input');
      expect(input?.className).toContain('sf-light');
    });

    it('applies sf-dark class in dark mode', () => {
      mockMode.current = Mode.Dark;
      render(<Input testId="input" />);
      const input = screen.getByTestId('input').querySelector('input');
      expect(input?.className).toContain('sf-dark');
    });
  });

  describe('label', () => {
    it('renders label when provided', () => {
      render(<Input label="Username" testId="input" />);
      expect(screen.getByText('Username')).toBeInTheDocument();
    });
  });

  describe('error state', () => {
    it('renders error message and applies error classes', () => {
      render(<Input error="Required" testId="input" />);
      expect(screen.getByText('Required')).toBeInTheDocument();
      const input = screen.getByTestId('input').querySelector('input');
      expect(input?.className).toContain('e-error');
    });
  });

  describe('fullWidth', () => {
    it('applies full width classes', () => {
      render(<Input fullWidth testId="input" />);
      expect(screen.getByTestId('input').className).toContain('w-full');
    });
  });

  describe('accessibility', () => {
    it('sets aria-invalid when error is present', () => {
      render(<Input error="Error" testId="input" />);
      const input = screen.getByTestId('input').querySelector('input');
      expect(input?.getAttribute('aria-invalid')).toBe('true');
    });
  });
});
