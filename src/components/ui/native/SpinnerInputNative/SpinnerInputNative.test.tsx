import { describe, it, expect, vi } from 'vitest';

import { render, screen } from '@/test/utils';

import { SpinnerVariant } from './spinnerVariant';

import SpinnerInputNative from './index';

describe('SpinnerInputNative', () => {
  describe('aria-label accessibility (Vertical variant)', () => {
    it('sets aria-label on input when label prop is provided', () => {
      render(<SpinnerInputNative label="Font size" testId="spinner" value={12} />);

      const input = screen.getByTestId('spinner').querySelector('input');
      expect(input?.getAttribute('aria-label')).toBe('Font size');
    });

    it('does not set aria-label when label prop is omitted', () => {
      render(<SpinnerInputNative testId="spinner" value={12} />);

      const input = screen.getByTestId('spinner').querySelector('input');
      expect(input?.getAttribute('aria-label')).toBeNull();
    });

    it('renders visible label element when label prop is provided', () => {
      render(<SpinnerInputNative label="Line height" testId="spinner" value={1} />);

      const container = screen.getByTestId('spinner');
      const labelEl = container.querySelector('label');
      expect(labelEl).toBeDefined();
      expect(labelEl?.textContent).toContain('Line height');
    });
  });

  describe('aria-label accessibility (Horizontal variant)', () => {
    it('sets aria-label on input when label prop is provided', () => {
      render(
        <SpinnerInputNative
          label="Border width"
          testId="spinner"
          value={2}
          variant={SpinnerVariant.Horizontal}
        />,
      );

      const input = screen.getByTestId('spinner').querySelector('input');
      expect(input?.getAttribute('aria-label')).toBe('Border width');
    });

    it('does not set aria-label when label prop is omitted', () => {
      render(
        <SpinnerInputNative
          testId="spinner"
          value={2}
          variant={SpinnerVariant.Horizontal}
        />,
      );

      const input = screen.getByTestId('spinner').querySelector('input');
      expect(input?.getAttribute('aria-label')).toBeNull();
    });
  });

  describe('aria-invalid and aria-describedby', () => {
    it('sets aria-invalid to true when error is provided', () => {
      render(<SpinnerInputNative error="Invalid" testId="spinner" value={0} />);

      const input = screen.getByTestId('spinner').querySelector('input');
      expect(input?.getAttribute('aria-invalid')).toBe('true');
    });

    it('sets aria-invalid to false when no error', () => {
      render(<SpinnerInputNative testId="spinner" value={0} />);

      const input = screen.getByTestId('spinner').querySelector('input');
      expect(input?.getAttribute('aria-invalid')).toBe('false');
    });

    it('sets aria-describedby when helperText is provided', () => {
      render(<SpinnerInputNative helperText="Pixels" testId="spinner" value={0} />);

      const input = screen.getByTestId('spinner').querySelector('input');
      expect(input?.getAttribute('aria-describedby')).toBeTruthy();
    });
  });

  describe('increment and decrement callbacks', () => {
    it('calls onValueChange with incremented value on increment click', () => {
      const handleChange = vi.fn();
      render(
        <SpinnerInputNative
          testId="spinner"
          value={5}
          onValueChange={handleChange}
        />,
      );

      const buttons = screen.getByTestId('spinner').querySelectorAll('button');
      // Vertical: first button is increment (up), second is decrement (down)
      const incrementBtn = buttons[0];
      incrementBtn?.click();

      expect(handleChange).toHaveBeenCalledWith(6);
    });

    it('calls onValueChange with decremented value on decrement click', () => {
      const handleChange = vi.fn();
      render(
        <SpinnerInputNative
          testId="spinner"
          value={5}
          onValueChange={handleChange}
        />,
      );

      const buttons = screen.getByTestId('spinner').querySelectorAll('button');
      // Vertical: second button is decrement (down)
      const decrementBtn = buttons[1];
      decrementBtn?.click();

      expect(handleChange).toHaveBeenCalledWith(4);
    });

    it('does not increment beyond max', () => {
      const handleChange = vi.fn();
      render(
        <SpinnerInputNative
          max={10}
          testId="spinner"
          value={10}
          onValueChange={handleChange}
        />,
      );

      const buttons = screen.getByTestId('spinner').querySelectorAll('button');
      buttons[0]?.click();

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('does not decrement below min', () => {
      const handleChange = vi.fn();
      render(
        <SpinnerInputNative
          min={0}
          testId="spinner"
          value={0}
          onValueChange={handleChange}
        />,
      );

      const buttons = screen.getByTestId('spinner').querySelectorAll('button');
      buttons[1]?.click();

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('does not call onValueChange when disabled', () => {
      const handleChange = vi.fn();
      render(
        <SpinnerInputNative
          disabled
          testId="spinner"
          value={5}
          onValueChange={handleChange}
        />,
      );

      const buttons = screen.getByTestId('spinner').querySelectorAll('button');
      buttons[0]?.click();
      buttons[1]?.click();

      expect(handleChange).not.toHaveBeenCalled();
    });
  });
});
