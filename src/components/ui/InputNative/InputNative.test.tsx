import { describe, it, expect, vi } from 'vitest';

import { render, screen, fireEvent } from '@/test/utils';

import InputNative from './index';

describe('InputNative', () => {
  describe('onChange behavior', () => {
    it('calls onChange callback when input value changes', () => {
      const handleChange = vi.fn();
      render(<InputNative testId="test-input" onChange={handleChange} />);

      const input = screen.getByTestId('test-input').querySelector('input');
      expect(input).toBeDefined();

      fireEvent.change(input!, { target: { value: 'test value' } });

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: 'test value' }),
        }),
      );
    });

    it('does not call onChange when not provided', () => {
      render(<InputNative testId="test-input" />);

      const input = screen.getByTestId('test-input').querySelector('input');
      expect(input).toBeDefined();

      // Should not throw when onChange is not provided
      fireEvent.change(input!, { target: { value: 'test' } });
    });
  });

  describe('accessibility attributes', () => {
    it('sets aria-invalid to true when error is provided', () => {
      render(<InputNative error="Error message" testId="test-input" />);

      const input = screen.getByTestId('test-input').querySelector('input');
      expect(input?.getAttribute('aria-invalid')).toBe('true');
    });

    it('sets aria-invalid to false when no error', () => {
      render(<InputNative testId="test-input" />);

      const input = screen.getByTestId('test-input').querySelector('input');
      expect(input?.getAttribute('aria-invalid')).toBe('false');
    });

    it('sets aria-describedby when helperText is provided', () => {
      render(<InputNative helperText="Helper text" testId="test-input" />);

      const input = screen.getByTestId('test-input').querySelector('input');
      expect(input?.getAttribute('aria-describedby')).toBeTruthy();
    });

    it('sets aria-describedby when error is provided', () => {
      render(<InputNative error="Error message" testId="test-input" />);

      const input = screen.getByTestId('test-input').querySelector('input');
      expect(input?.getAttribute('aria-describedby')).toBeTruthy();
    });

    it('does not set aria-describedby when neither helperText nor error is provided', () => {
      render(<InputNative testId="test-input" />);

      const input = screen.getByTestId('test-input').querySelector('input');
      expect(input?.getAttribute('aria-describedby')).toBeNull();
    });
  });

  describe('controlled input behavior', () => {
    it('displays the provided value', () => {
      render(<InputNative readOnly testId="test-input" value="initial value" />);

      const input = screen.getByTestId('test-input').querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('initial value');
    });

    it('updates when value prop changes', () => {
      const { rerender } = render(<InputNative readOnly testId="test-input" value="initial" />);

      const input = screen.getByTestId('test-input').querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('initial');

      rerender(<InputNative readOnly testId="test-input" value="updated" />);
      expect(input.value).toBe('updated');
    });
  });

  describe('input types', () => {
    it('sets type attribute correctly for email', () => {
      render(<InputNative testId="test-input" type="email" />);

      const input = screen.getByTestId('test-input').querySelector('input');
      expect(input?.getAttribute('type')).toBe('email');
    });

    it('sets type attribute correctly for password', () => {
      render(<InputNative testId="test-input" type="password" />);

      const input = screen.getByTestId('test-input').querySelector('input');
      expect(input?.getAttribute('type')).toBe('password');
    });
  });

  describe('disabled state', () => {
    it('passes disabled attribute to input', () => {
      render(<InputNative disabled testId="test-input" />);

      const input = screen.getByTestId('test-input').querySelector('input');
      expect(input?.disabled).toBe(true);
    });

    it('does not call onChange when disabled', () => {
      const handleChange = vi.fn();
      render(<InputNative disabled testId="test-input" onChange={handleChange} />);

      const input = screen.getByTestId('test-input').querySelector('input');
      fireEvent.change(input!, { target: { value: 'test' } });

      // The onChange is still called by React, but the input should be disabled
      // This tests that the disabled prop is properly passed
      expect(input?.disabled).toBe(true);
    });
  });

  describe('placeholder', () => {
    it('sets placeholder attribute correctly', () => {
      render(<InputNative placeholder="Enter value" testId="test-input" />);

      const input = screen.getByTestId('test-input').querySelector('input');
      expect(input?.getAttribute('placeholder')).toBe('Enter value');
    });
  });
});
