import { describe, it, expect, vi } from 'vitest';

import { render, screen, fireEvent } from '@/test/utils';

import IconButtonNative, { IconButtonVariant, ButtonSize } from './index';

const ICON = <svg data-testid="test-icon" />;

describe('IconButtonNative', () => {
  describe('click behavior', () => {
    it('calls onClick callback when clicked', () => {
      const handleClick = vi.fn();
      render(
        <IconButtonNative ariaLabel="Edit" icon={ICON} testId="ib" onClick={handleClick} />,
      );
      fireEvent.click(screen.getByTestId('ib'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(
        <IconButtonNative disabled ariaLabel="Edit" icon={ICON} testId="ib" onClick={handleClick} />,
      );
      fireEvent.click(screen.getByTestId('ib'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not throw when onClick is not provided', () => {
      render(<IconButtonNative ariaLabel="Edit" icon={ICON} testId="ib" />);
      fireEvent.click(screen.getByTestId('ib'));
    });
  });

  describe('disabled state', () => {
    it('sets disabled attribute when disabled prop is true', () => {
      render(<IconButtonNative disabled ariaLabel="Edit" icon={ICON} testId="ib" />);
      expect(screen.getByTestId('ib').hasAttribute('disabled')).toBe(true);
    });

    it('does not set disabled attribute when disabled prop is false', () => {
      render(<IconButtonNative ariaLabel="Edit" disabled={false} icon={ICON} testId="ib" />);
      expect(screen.getByTestId('ib').hasAttribute('disabled')).toBe(false);
    });
  });

  describe('accessibility', () => {
    it('sets aria-label from ariaLabel prop', () => {
      render(<IconButtonNative ariaLabel="Delete item" icon={ICON} testId="ib" />);
      expect(screen.getByTestId('ib').getAttribute('aria-label')).toBe('Delete item');
    });
  });

  describe('loading state', () => {
    it('sets disabled attribute when loading is true', () => {
      render(<IconButtonNative loading ariaLabel="Edit" icon={ICON} testId="ib" />);
      expect(screen.getByTestId('ib').hasAttribute('disabled')).toBe(true);
    });

    it('sets aria-busy when loading is true', () => {
      render(<IconButtonNative loading ariaLabel="Edit" icon={ICON} testId="ib" />);
      expect(screen.getByTestId('ib').getAttribute('aria-busy')).toBe('true');
    });

    it('does not set aria-busy when loading is false', () => {
      render(<IconButtonNative ariaLabel="Edit" icon={ICON} testId="ib" />);
      expect(screen.getByTestId('ib').getAttribute('aria-busy')).toBeNull();
    });

    it('renders spinner element when loading', () => {
      render(<IconButtonNative loading ariaLabel="Edit" icon={ICON} testId="ib" />);
      const button = screen.getByTestId('ib');
      expect(button.querySelector('.native-btn-spinner')).not.toBeNull();
    });

    it('hides icon when loading', () => {
      render(<IconButtonNative loading ariaLabel="Edit" icon={ICON} testId="ib" />);
      const button = screen.getByTestId('ib');
      expect(button.querySelector('.native-icon-btn-icon')).toBeNull();
    });

    it('does not call onClick when loading', () => {
      const handleClick = vi.fn();
      render(
        <IconButtonNative loading ariaLabel="Edit" icon={ICON} testId="ib" onClick={handleClick} />,
      );
      fireEvent.click(screen.getByTestId('ib'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('variants', () => {
    it('applies primary variant classes by default', () => {
      render(<IconButtonNative ariaLabel="Edit" icon={ICON} testId="ib" />);
      expect(screen.getByTestId('ib').className).toContain('native-icon-btn-primary');
    });

    it('applies secondary variant classes when specified', () => {
      render(
        <IconButtonNative
          ariaLabel="Edit"
          icon={ICON}
          testId="ib"
          variant={IconButtonVariant.Secondary}
        />,
      );
      expect(screen.getByTestId('ib').className).toContain('native-icon-btn-secondary');
    });

    it('applies tertiary variant classes when specified', () => {
      render(
        <IconButtonNative
          ariaLabel="Edit"
          icon={ICON}
          testId="ib"
          variant={IconButtonVariant.Tertiary}
        />,
      );
      expect(screen.getByTestId('ib').className).toContain('native-icon-btn-tertiary');
    });
  });

  describe('sizes', () => {
    it('applies medium size classes by default', () => {
      render(<IconButtonNative ariaLabel="Edit" icon={ICON} testId="ib" />);
      expect(screen.getByTestId('ib').className).toContain('native-icon-btn-md');
    });

    it('applies small size classes when specified', () => {
      render(
        <IconButtonNative ariaLabel="Edit" icon={ICON} size={ButtonSize.Sm} testId="ib" />,
      );
      expect(screen.getByTestId('ib').className).toContain('native-icon-btn-sm');
    });

    it('applies large size classes when specified', () => {
      render(
        <IconButtonNative ariaLabel="Edit" icon={ICON} size={ButtonSize.Lg} testId="ib" />,
      );
      expect(screen.getByTestId('ib').className).toContain('native-icon-btn-lg');
    });
  });
});
