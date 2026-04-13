import { describe, it, expect, vi } from 'vitest';

import { render, screen, fireEvent } from '@/test/utils';

import CheckboxNative from './index';

describe('CheckboxNative', () => {
  describe('aria-label accessibility', () => {
    it('sets aria-label on checkbox when label prop is provided', () => {
      render(<CheckboxNative label="Accept terms" testId="cb" />);

      const input = screen.getByTestId('cb').querySelector('input');
      expect(input?.getAttribute('aria-label')).toBe('Accept terms');
    });

    it('does not set aria-label when label prop is omitted', () => {
      render(<CheckboxNative testId="cb" />);

      const input = screen.getByTestId('cb').querySelector('input');
      expect(input?.getAttribute('aria-label')).toBeNull();
    });

    it('renders visible label element when label prop is provided', () => {
      render(<CheckboxNative label="Subscribe" testId="cb" />);

      const container = screen.getByTestId('cb');
      const labelEl = container.querySelector('label');
      expect(labelEl).toBeDefined();
      expect(labelEl?.textContent).toContain('Subscribe');
    });
  });

  describe('aria-invalid and aria-describedby', () => {
    it('sets aria-invalid to true when error is provided', () => {
      render(<CheckboxNative error="Required" testId="cb" />);

      const input = screen.getByTestId('cb').querySelector('input');
      expect(input?.getAttribute('aria-invalid')).toBe('true');
    });

    it('sets aria-invalid to false when no error', () => {
      render(<CheckboxNative testId="cb" />);

      const input = screen.getByTestId('cb').querySelector('input');
      expect(input?.getAttribute('aria-invalid')).toBe('false');
    });

    it('sets aria-describedby when helperText is provided', () => {
      render(<CheckboxNative helperText="Optional" testId="cb" />);

      const input = screen.getByTestId('cb').querySelector('input');
      expect(input?.getAttribute('aria-describedby')).toBeTruthy();
    });

    it('does not set aria-describedby when neither helperText nor error', () => {
      render(<CheckboxNative testId="cb" />);

      const input = screen.getByTestId('cb').querySelector('input');
      expect(input?.getAttribute('aria-describedby')).toBeNull();
    });
  });

  describe('onChange behavior', () => {
    it('calls onChange callback when checkbox is clicked', () => {
      const handleChange = vi.fn();
      render(<CheckboxNative testId="cb" onChange={handleChange} />);

      const input = screen.getByTestId('cb').querySelector('input');
      fireEvent.click(input!);

      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('disabled state', () => {
    it('passes disabled attribute to checkbox input', () => {
      render(<CheckboxNative disabled testId="cb" />);

      const input = screen.getByTestId('cb').querySelector('input');
      expect(input?.disabled).toBe(true);
    });
  });
});
