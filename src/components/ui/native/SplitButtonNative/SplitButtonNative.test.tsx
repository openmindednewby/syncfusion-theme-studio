import { describe, it, expect, vi } from 'vitest';

import { render, screen, fireEvent } from '@/test/utils';

import SplitButtonNative from './index';

import type { SplitButtonItem } from './index';

const ITEMS: SplitButtonItem[] = [
  { id: 'save', text: 'Save' },
  { id: 'save-as', text: 'Save As' },
  { id: 'export', text: 'Export', disabled: true },
];

describe('SplitButtonNative', () => {
  describe('primary button click', () => {
    it('calls onClick when primary button is clicked', () => {
      const handleClick = vi.fn();
      render(
        <SplitButtonNative items={ITEMS} testId="sb" onClick={handleClick}>
          Save
        </SplitButtonNative>,
      );
      const mainBtn = screen.getByTestId('sb').querySelector('.native-split-btn-main')!;
      fireEvent.click(mainBtn);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(
        <SplitButtonNative disabled items={ITEMS} testId="sb" onClick={handleClick}>
          Save
        </SplitButtonNative>,
      );
      const mainBtn = screen.getByTestId('sb').querySelector('.native-split-btn-main')!;
      fireEvent.click(mainBtn);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('dropdown open/close', () => {
    it('opens dropdown when chevron is clicked', () => {
      render(
        <SplitButtonNative items={ITEMS} testId="sb">
          Save
        </SplitButtonNative>,
      );
      expect(screen.queryByTestId('sb-dropdown')).toBeNull();
      fireEvent.click(screen.getByTestId('sb-trigger'));
      expect(screen.getByTestId('sb-dropdown')).toBeDefined();
    });

    it('closes dropdown when chevron is clicked again', () => {
      render(
        <SplitButtonNative items={ITEMS} testId="sb">
          Save
        </SplitButtonNative>,
      );
      fireEvent.click(screen.getByTestId('sb-trigger'));
      expect(screen.getByTestId('sb-dropdown')).toBeDefined();
      fireEvent.click(screen.getByTestId('sb-trigger'));
      expect(screen.queryByTestId('sb-dropdown')).toBeNull();
    });

    it('closes dropdown when clicking outside', () => {
      render(
        <SplitButtonNative items={ITEMS} testId="sb">
          Save
        </SplitButtonNative>,
      );
      fireEvent.click(screen.getByTestId('sb-trigger'));
      expect(screen.getByTestId('sb-dropdown')).toBeDefined();
      fireEvent.mouseDown(document.body);
      expect(screen.queryByTestId('sb-dropdown')).toBeNull();
    });

    it('does not open dropdown when disabled', () => {
      render(
        <SplitButtonNative disabled items={ITEMS} testId="sb">
          Save
        </SplitButtonNative>,
      );
      fireEvent.click(screen.getByTestId('sb-trigger'));
      expect(screen.queryByTestId('sb-dropdown')).toBeNull();
    });
  });

  describe('dropdown item click', () => {
    it('calls onItemClick with correct item when clicked', () => {
      const handleItemClick = vi.fn();
      render(
        <SplitButtonNative items={ITEMS} testId="sb" onItemClick={handleItemClick}>
          Save
        </SplitButtonNative>,
      );
      fireEvent.click(screen.getByTestId('sb-trigger'));
      fireEvent.click(screen.getByTestId('sb-item-save-as'));
      expect(handleItemClick).toHaveBeenCalledWith({ id: 'save-as', text: 'Save As' });
    });

    it('closes dropdown after item click', () => {
      render(
        <SplitButtonNative items={ITEMS} testId="sb">
          Save
        </SplitButtonNative>,
      );
      fireEvent.click(screen.getByTestId('sb-trigger'));
      fireEvent.click(screen.getByTestId('sb-item-save'));
      expect(screen.queryByTestId('sb-dropdown')).toBeNull();
    });

    it('does not call onItemClick for disabled items', () => {
      const handleItemClick = vi.fn();
      render(
        <SplitButtonNative items={ITEMS} testId="sb" onItemClick={handleItemClick}>
          Save
        </SplitButtonNative>,
      );
      fireEvent.click(screen.getByTestId('sb-trigger'));
      fireEvent.click(screen.getByTestId('sb-item-export'));
      expect(handleItemClick).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('sets aria-expanded on trigger based on dropdown state', () => {
      render(
        <SplitButtonNative items={ITEMS} testId="sb">
          Save
        </SplitButtonNative>,
      );
      const trigger = screen.getByTestId('sb-trigger');
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      fireEvent.click(trigger);
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });

    it('sets aria-haspopup on trigger', () => {
      render(
        <SplitButtonNative items={ITEMS} testId="sb">
          Save
        </SplitButtonNative>,
      );
      expect(screen.getByTestId('sb-trigger').getAttribute('aria-haspopup')).toBe('true');
    });

    it('renders dropdown as menu role', () => {
      render(
        <SplitButtonNative items={ITEMS} testId="sb">
          Save
        </SplitButtonNative>,
      );
      fireEvent.click(screen.getByTestId('sb-trigger'));
      expect(screen.getByTestId('sb-dropdown').getAttribute('role')).toBe('menu');
    });
  });

  describe('disabled state', () => {
    it('disables both primary and trigger buttons when disabled', () => {
      render(
        <SplitButtonNative disabled items={ITEMS} testId="sb">
          Save
        </SplitButtonNative>,
      );
      const container = screen.getByTestId('sb');
      const mainBtn = container.querySelector('.native-split-btn-main')!;
      const trigger = screen.getByTestId('sb-trigger');
      expect(mainBtn.hasAttribute('disabled')).toBe(true);
      expect(trigger.hasAttribute('disabled')).toBe(true);
    });
  });
});
