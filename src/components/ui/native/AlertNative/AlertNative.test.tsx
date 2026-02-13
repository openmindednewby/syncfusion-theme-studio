import { describe, it, expect, vi } from 'vitest';

import { render, screen, fireEvent } from '@/test/utils';

import AlertNative, { AlertSeverity } from './index';

const TEST_ID = 'test-alert';

describe('AlertNative', () => {
  describe('dismiss behavior', () => {
    it('calls onDismiss callback when dismiss button is clicked', () => {
      const handleDismiss = vi.fn();
      render(
        <AlertNative dismissible testId={TEST_ID} onDismiss={handleDismiss}>
          Content
        </AlertNative>,
      );
      fireEvent.click(screen.getByTestId(`${TEST_ID}-dismiss`));
      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });

    it('returns null after being dismissed', () => {
      render(
        <AlertNative dismissible testId={TEST_ID}>
          Content
        </AlertNative>,
      );
      expect(screen.getByTestId(TEST_ID)).toBeTruthy();
      fireEvent.click(screen.getByTestId(`${TEST_ID}-dismiss`));
      expect(screen.queryByTestId(TEST_ID)).toBeNull();
    });

    it('does not throw when onDismiss is not provided and dismiss is clicked', () => {
      render(
        <AlertNative dismissible testId={TEST_ID}>
          Content
        </AlertNative>,
      );
      fireEvent.click(screen.getByTestId(`${TEST_ID}-dismiss`));
      expect(screen.queryByTestId(TEST_ID)).toBeNull();
    });
  });

  describe('dismissible prop', () => {
    it('renders dismiss button when dismissible is true', () => {
      render(
        <AlertNative dismissible testId={TEST_ID}>
          Content
        </AlertNative>,
      );
      expect(screen.getByTestId(`${TEST_ID}-dismiss`)).toBeTruthy();
    });

    it('does not render dismiss button when dismissible is false', () => {
      render(
        <AlertNative dismissible={false} testId={TEST_ID}>
          Content
        </AlertNative>,
      );
      expect(screen.queryByTestId(`${TEST_ID}-dismiss`)).toBeNull();
    });

    it('does not render dismiss button by default', () => {
      render(<AlertNative testId={TEST_ID}>Content</AlertNative>);
      expect(screen.queryByTestId(`${TEST_ID}-dismiss`)).toBeNull();
    });
  });

  describe('showIcon prop', () => {
    it('renders an SVG icon when showIcon is true', () => {
      render(<AlertNative testId={TEST_ID}>Content</AlertNative>);
      const alert = screen.getByTestId(TEST_ID);
      const svg = alert.querySelector('svg.alert-icon');
      expect(svg).toBeTruthy();
    });

    it('does not render an SVG icon when showIcon is false', () => {
      render(
        <AlertNative showIcon={false} testId={TEST_ID}>
          Content
        </AlertNative>,
      );
      const alert = screen.getByTestId(TEST_ID);
      const svg = alert.querySelector('svg.alert-icon');
      expect(svg).toBeNull();
    });
  });

  describe('default severity', () => {
    it('applies info variant class by default', () => {
      render(<AlertNative testId={TEST_ID}>Content</AlertNative>);
      expect(screen.getByTestId(TEST_ID).className).toContain('alert-info');
    });

    it('applies success variant class when specified', () => {
      render(
        <AlertNative severity={AlertSeverity.Success} testId={TEST_ID}>
          Content
        </AlertNative>,
      );
      expect(screen.getByTestId(TEST_ID).className).toContain('alert-success');
    });

    it('applies warning variant class when specified', () => {
      render(
        <AlertNative severity={AlertSeverity.Warning} testId={TEST_ID}>
          Content
        </AlertNative>,
      );
      expect(screen.getByTestId(TEST_ID).className).toContain('alert-warning');
    });

    it('applies error variant class when specified', () => {
      render(
        <AlertNative severity={AlertSeverity.Error} testId={TEST_ID}>
          Content
        </AlertNative>,
      );
      expect(screen.getByTestId(TEST_ID).className).toContain('alert-error');
    });
  });

  describe('accessibility', () => {
    it('has role="alert" on the container', () => {
      render(<AlertNative testId={TEST_ID}>Content</AlertNative>);
      expect(screen.getByTestId(TEST_ID).getAttribute('role')).toBe('alert');
    });

    it('dismiss button has aria-label', () => {
      render(
        <AlertNative dismissible testId={TEST_ID}>
          Content
        </AlertNative>,
      );
      expect(screen.getByTestId(`${TEST_ID}-dismiss`).getAttribute('aria-label')).toBe(
        'Dismiss alert',
      );
    });
  });
});
