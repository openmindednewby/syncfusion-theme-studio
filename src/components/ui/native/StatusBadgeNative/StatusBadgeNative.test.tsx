import { describe, it, expect } from 'vitest';

import { render, screen } from '@/test/utils';

import StatusBadgeNative from './index';

import type { StatusConfig } from './index';

const STATUS_MAP = new Map<string, StatusConfig>([
  ['Active', { labelKey: 'status.active', className: 'bg-success-50 text-success-700' }],
  ['Inactive', { labelKey: 'status.inactive', className: 'bg-surface-hover text-text-muted' }],
]);

describe('StatusBadgeNative', () => {
  describe('status resolution', () => {
    it('renders localized label for known status', () => {
      render(
        <StatusBadgeNative status="Active" statusMap={STATUS_MAP} testId="badge" />,
      );
      const badge = screen.getByTestId('badge');
      // FM() mock returns the key as-is
      expect(badge.textContent).toBe('status.active');
    });

    it('applies correct CSS classes for known status', () => {
      render(
        <StatusBadgeNative status="Active" statusMap={STATUS_MAP} testId="badge" />,
      );
      const badge = screen.getByTestId('badge');
      expect(badge.className).toContain('bg-success-50');
      expect(badge.className).toContain('text-success-700');
    });
  });

  describe('fallback behavior', () => {
    it('renders em dash for undefined status', () => {
      render(
        <StatusBadgeNative status={undefined} statusMap={STATUS_MAP} testId="badge" />,
      );
      const badge = screen.getByTestId('badge');
      expect(badge.textContent).toBe('\u2014');
      expect(badge.className).toContain('text-text-muted');
    });

    it('renders custom fallback text for undefined status', () => {
      render(
        <StatusBadgeNative
          fallbackText="N/A"
          status={undefined}
          statusMap={STATUS_MAP}
          testId="badge"
        />,
      );
      expect(screen.getByTestId('badge').textContent).toBe('N/A');
    });

    it('renders raw status string for unknown status value', () => {
      render(
        <StatusBadgeNative status="Unknown" statusMap={STATUS_MAP} testId="badge" />,
      );
      const badge = screen.getByTestId('badge');
      expect(badge.textContent).toBe('Unknown');
      expect(badge.className).toContain('text-text-muted');
    });
  });

  describe('numeric keys', () => {
    const numericMap = new Map<number, StatusConfig>([
      [1, { labelKey: 'status.one', className: 'bg-info-50 text-info-700' }],
    ]);

    it('resolves numeric status keys', () => {
      render(
        <StatusBadgeNative status={1} statusMap={numericMap} testId="badge" />,
      );
      expect(screen.getByTestId('badge').textContent).toBe('status.one');
    });

    it('renders stringified number for unknown numeric key', () => {
      render(
        <StatusBadgeNative status={999} statusMap={numericMap} testId="badge" />,
      );
      expect(screen.getByTestId('badge').textContent).toBe('999');
    });
  });
});
