import { describe, it, expect, vi } from 'vitest';

import { render, screen, fireEvent } from '@/test/utils';

import ToggleNative from './index';

const TEST_ID = 'test-toggle';

describe('ToggleNative', () => {
  describe('onChange behavior', () => {
    it('calls onChange with true when toggling from unchecked', () => {
      const handleChange = vi.fn();
      render(
        <ToggleNative checked={false} testId={TEST_ID} onChange={handleChange} />,
      );
      fireEvent.click(screen.getByTestId(TEST_ID));
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('calls onChange with false when toggling from checked', () => {
      const handleChange = vi.fn();
      render(
        <ToggleNative checked testId={TEST_ID} onChange={handleChange} />,
      );
      fireEvent.click(screen.getByTestId(TEST_ID));
      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('calls onChange exactly once per click', () => {
      const handleChange = vi.fn();
      render(
        <ToggleNative checked={false} testId={TEST_ID} onChange={handleChange} />,
      );
      fireEvent.click(screen.getByTestId(TEST_ID));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('disabled state', () => {
    it('does not call onChange when disabled', () => {
      const handleChange = vi.fn();
      render(
        <ToggleNative disabled checked={false} testId={TEST_ID} onChange={handleChange} />,
      );
      fireEvent.click(screen.getByTestId(TEST_ID));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('has disabled attribute when disabled', () => {
      const handleChange = vi.fn();
      render(
        <ToggleNative disabled checked={false} testId={TEST_ID} onChange={handleChange} />,
      );
      expect(screen.getByTestId(TEST_ID)).toHaveProperty('disabled', true);
    });
  });

  describe('accessibility', () => {
    it('has role="switch"', () => {
      const handleChange = vi.fn();
      render(
        <ToggleNative checked={false} testId={TEST_ID} onChange={handleChange} />,
      );
      expect(screen.getByTestId(TEST_ID).getAttribute('role')).toBe('switch');
    });

    it('sets aria-checked to true when checked', () => {
      const handleChange = vi.fn();
      render(
        <ToggleNative checked testId={TEST_ID} onChange={handleChange} />,
      );
      expect(screen.getByTestId(TEST_ID).getAttribute('aria-checked')).toBe('true');
    });

    it('sets aria-checked to false when unchecked', () => {
      const handleChange = vi.fn();
      render(
        <ToggleNative checked={false} testId={TEST_ID} onChange={handleChange} />,
      );
      expect(screen.getByTestId(TEST_ID).getAttribute('aria-checked')).toBe('false');
    });

    it('sets aria-label when label prop is provided', () => {
      const handleChange = vi.fn();
      render(
        <ToggleNative
          checked={false}
          label="Enable feature"
          testId={TEST_ID}
          onChange={handleChange}
        />,
      );
      expect(screen.getByTestId(TEST_ID).getAttribute('aria-label')).toBe('Enable feature');
    });

    it('does not set aria-label when label prop is not provided', () => {
      const handleChange = vi.fn();
      render(
        <ToggleNative checked={false} testId={TEST_ID} onChange={handleChange} />,
      );
      expect(screen.getByTestId(TEST_ID).getAttribute('aria-label')).toBeNull();
    });
  });
});
