import { describe, it, expect, vi } from 'vitest';

import { render, screen, fireEvent } from '@/test/utils';

import FabNative, { FabPosition } from './index';

const ICON = <svg data-testid="fab-icon" />;

describe('FabNative', () => {
  describe('click behavior', () => {
    it('calls onClick callback when clicked', () => {
      const handleClick = vi.fn();
      render(
        <FabNative ariaLabel="Add item" icon={ICON} testId="fab" onClick={handleClick} />,
      );
      fireEvent.click(screen.getByTestId('fab'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(
        <FabNative disabled ariaLabel="Add item" icon={ICON} testId="fab" onClick={handleClick} />,
      );
      fireEvent.click(screen.getByTestId('fab'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not throw when onClick is not provided', () => {
      render(<FabNative ariaLabel="Add item" icon={ICON} testId="fab" />);
      fireEvent.click(screen.getByTestId('fab'));
    });
  });

  describe('disabled state', () => {
    it('sets disabled attribute when disabled prop is true', () => {
      render(<FabNative disabled ariaLabel="Add item" icon={ICON} testId="fab" />);
      expect(screen.getByTestId('fab').hasAttribute('disabled')).toBe(true);
    });

    it('does not set disabled attribute when disabled prop is false', () => {
      render(<FabNative ariaLabel="Add item" disabled={false} icon={ICON} testId="fab" />);
      expect(screen.getByTestId('fab').hasAttribute('disabled')).toBe(false);
    });
  });

  describe('accessibility', () => {
    it('sets aria-label from ariaLabel prop', () => {
      render(<FabNative ariaLabel="Create new" icon={ICON} testId="fab" />);
      expect(screen.getByTestId('fab').getAttribute('aria-label')).toBe('Create new');
    });
  });

  describe('position classes', () => {
    it('applies bottom-right position by default', () => {
      render(<FabNative ariaLabel="Add" icon={ICON} testId="fab" />);
      expect(screen.getByTestId('fab').className).toContain('native-fab-bottom-right');
    });

    it('applies bottom-left position when specified', () => {
      render(
        <FabNative ariaLabel="Add" icon={ICON} position={FabPosition.BottomLeft} testId="fab" />,
      );
      expect(screen.getByTestId('fab').className).toContain('native-fab-bottom-left');
    });

    it('applies top-right position when specified', () => {
      render(
        <FabNative ariaLabel="Add" icon={ICON} position={FabPosition.TopRight} testId="fab" />,
      );
      expect(screen.getByTestId('fab').className).toContain('native-fab-top-right');
    });

    it('applies top-left position when specified', () => {
      render(
        <FabNative ariaLabel="Add" icon={ICON} position={FabPosition.TopLeft} testId="fab" />,
      );
      expect(screen.getByTestId('fab').className).toContain('native-fab-top-left');
    });
  });

  describe('extended FAB', () => {
    it('renders label when provided', () => {
      render(<FabNative ariaLabel="Add" icon={ICON} label="Create" testId="fab" />);
      const fab = screen.getByTestId('fab');
      expect(fab.querySelector('.native-fab-label')).not.toBeNull();
      expect(fab.querySelector('.native-fab-label')?.textContent).toBe('Create');
    });

    it('applies extended class when label is provided', () => {
      render(<FabNative ariaLabel="Add" icon={ICON} label="Create" testId="fab" />);
      expect(screen.getByTestId('fab').className).toContain('native-fab-extended');
    });

    it('does not render label when not provided', () => {
      render(<FabNative ariaLabel="Add" icon={ICON} testId="fab" />);
      expect(screen.getByTestId('fab').querySelector('.native-fab-label')).toBeNull();
    });

    it('does not apply extended class when label is empty', () => {
      render(<FabNative ariaLabel="Add" icon={ICON} label="" testId="fab" />);
      expect(screen.getByTestId('fab').className).not.toContain('native-fab-extended');
    });
  });
});
