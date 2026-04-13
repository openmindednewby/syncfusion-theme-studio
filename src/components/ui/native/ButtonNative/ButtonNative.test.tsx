import { describe, it, expect, vi } from 'vitest';

import { render, screen, fireEvent } from '@/test/utils';

import ButtonNative, { ButtonVariant, ButtonSize } from './index';

describe('ButtonNative', () => {
  describe('click behavior', () => {
    it('calls onClick callback when clicked', () => {
      const handleClick = vi.fn();
      render(
        <ButtonNative testId="test-button" onClick={handleClick}>
          Click me
        </ButtonNative>,
      );
      fireEvent.click(screen.getByTestId('test-button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(
        <ButtonNative disabled testId="test-button" onClick={handleClick}>
          Click me
        </ButtonNative>,
      );
      fireEvent.click(screen.getByTestId('test-button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not throw when onClick is not provided', () => {
      render(<ButtonNative testId="test-button">Click me</ButtonNative>);
      fireEvent.click(screen.getByTestId('test-button'));
    });
  });

  describe('button type attribute', () => {
    it('defaults to type="button"', () => {
      render(<ButtonNative testId="test-button">Click me</ButtonNative>);
      expect(screen.getByTestId('test-button').getAttribute('type')).toBe('button');
    });

    it('sets type="submit" when specified', () => {
      render(
        <ButtonNative testId="test-button" type="submit">
          Submit
        </ButtonNative>,
      );
      expect(screen.getByTestId('test-button').getAttribute('type')).toBe('submit');
    });

    it('sets type="reset" when specified', () => {
      render(
        <ButtonNative testId="test-button" type="reset">
          Reset
        </ButtonNative>,
      );
      expect(screen.getByTestId('test-button').getAttribute('type')).toBe('reset');
    });
  });

  describe('disabled state', () => {
    it('sets disabled attribute when disabled prop is true', () => {
      render(
        <ButtonNative disabled testId="test-button">
          Click me
        </ButtonNative>,
      );
      expect(screen.getByTestId('test-button').hasAttribute('disabled')).toBe(true);
    });

    it('does not set disabled attribute when disabled prop is false', () => {
      render(
        <ButtonNative disabled={false} testId="test-button">
          Click me
        </ButtonNative>,
      );
      expect(screen.getByTestId('test-button').hasAttribute('disabled')).toBe(false);
    });
  });

  describe('accessibility', () => {
    it('sets aria-label when provided', () => {
      render(
        <ButtonNative ariaLabel="Accessible button" testId="test-button">
          Click me
        </ButtonNative>,
      );
      expect(screen.getByTestId('test-button').getAttribute('aria-label')).toBe('Accessible button');
    });

    it('does not set aria-label when not provided', () => {
      render(<ButtonNative testId="test-button">Click me</ButtonNative>);
      expect(screen.getByTestId('test-button').getAttribute('aria-label')).toBeNull();
    });
  });

  describe('form submission', () => {
    it('triggers form submit when type="submit" inside a form', () => {
      const handleSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
      render(
        <form onSubmit={handleSubmit}>
          <ButtonNative testId="test-button" type="submit">
            Submit
          </ButtonNative>
        </form>,
      );
      fireEvent.click(screen.getByTestId('test-button'));
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('does not trigger form submit when type="button"', () => {
      const handleSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
      render(
        <form onSubmit={handleSubmit}>
          <ButtonNative testId="test-button" type="button">
            Click me
          </ButtonNative>
        </form>,
      );
      fireEvent.click(screen.getByTestId('test-button'));
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });

  describe('variants', () => {
    it('applies primary variant classes by default', () => {
      render(<ButtonNative testId="test-button">Primary</ButtonNative>);
      expect(screen.getByTestId('test-button').className).toContain('native-btn-primary');
    });

    it('applies danger variant classes when specified', () => {
      render(
        <ButtonNative testId="test-button" variant={ButtonVariant.Danger}>
          Danger
        </ButtonNative>,
      );
      expect(screen.getByTestId('test-button').className).toContain('native-btn-danger');
    });

    it('applies outline variant classes when specified', () => {
      render(
        <ButtonNative testId="test-button" variant={ButtonVariant.Outline}>
          Outline
        </ButtonNative>,
      );
      expect(screen.getByTestId('test-button').className).toContain('native-btn-outline');
    });

    it('applies ghost variant classes when specified', () => {
      render(
        <ButtonNative testId="test-button" variant={ButtonVariant.Ghost}>
          Ghost
        </ButtonNative>,
      );
      expect(screen.getByTestId('test-button').className).toContain('native-btn-ghost');
    });
  });

  describe('sizes', () => {
    it('applies medium size classes by default', () => {
      render(<ButtonNative testId="test-button">Medium</ButtonNative>);
      expect(screen.getByTestId('test-button').className).toContain('native-btn-md');
    });

    it('applies small size classes when specified', () => {
      render(
        <ButtonNative size={ButtonSize.Sm} testId="test-button">
          Small
        </ButtonNative>,
      );
      expect(screen.getByTestId('test-button').className).toContain('native-btn-sm');
    });

    it('applies large size classes when specified', () => {
      render(
        <ButtonNative size={ButtonSize.Lg} testId="test-button">
          Large
        </ButtonNative>,
      );
      expect(screen.getByTestId('test-button').className).toContain('native-btn-lg');
    });
  });

  describe('fullWidth', () => {
    it('applies w-full class when fullWidth is true', () => {
      render(
        <ButtonNative fullWidth testId="test-button">
          Full Width
        </ButtonNative>,
      );
      expect(screen.getByTestId('test-button').className).toContain('w-full');
    });

    it('does not apply w-full class when fullWidth is false', () => {
      render(
        <ButtonNative fullWidth={false} testId="test-button">
          Not Full Width
        </ButtonNative>,
      );
      expect(screen.getByTestId('test-button').className).not.toContain('w-full');
    });
  });

  describe('loading state', () => {
    it('sets disabled attribute when loading is true', () => {
      render(
        <ButtonNative loading testId="test-button">
          Save
        </ButtonNative>,
      );
      expect(screen.getByTestId('test-button').hasAttribute('disabled')).toBe(true);
    });

    it('sets aria-busy when loading is true', () => {
      render(
        <ButtonNative loading testId="test-button">
          Save
        </ButtonNative>,
      );
      expect(screen.getByTestId('test-button').getAttribute('aria-busy')).toBe('true');
    });

    it('does not set aria-busy when loading is false', () => {
      render(
        <ButtonNative testId="test-button">
          Save
        </ButtonNative>,
      );
      expect(screen.getByTestId('test-button').getAttribute('aria-busy')).toBeNull();
    });

    it('renders spinner element when loading', () => {
      render(
        <ButtonNative loading testId="test-button">
          Save
        </ButtonNative>,
      );
      const button = screen.getByTestId('test-button');
      const spinner = button.querySelector('.native-btn-spinner');
      expect(spinner).not.toBeNull();
      expect(spinner?.getAttribute('aria-hidden')).toBe('true');
    });

    it('does not render spinner when not loading', () => {
      render(
        <ButtonNative testId="test-button">
          Save
        </ButtonNative>,
      );
      const button = screen.getByTestId('test-button');
      expect(button.querySelector('.native-btn-spinner')).toBeNull();
    });

    it('does not call onClick when loading', () => {
      const handleClick = vi.fn();
      render(
        <ButtonNative loading testId="test-button" onClick={handleClick}>
          Save
        </ButtonNative>,
      );
      fireEvent.click(screen.getByTestId('test-button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('leftIcon', () => {
    it('renders left icon when provided', () => {
      render(
        <ButtonNative leftIcon={<span data-testid="left-icon">L</span>} testId="test-button">
          Save
        </ButtonNative>,
      );
      expect(screen.getByTestId('left-icon')).toBeDefined();
      const button = screen.getByTestId('test-button');
      expect(button.querySelector('.native-btn-icon-left')).not.toBeNull();
    });

    it('hides left icon when loading', () => {
      render(
        <ButtonNative loading leftIcon={<span data-testid="left-icon">L</span>} testId="test-button">
          Save
        </ButtonNative>,
      );
      const button = screen.getByTestId('test-button');
      expect(button.querySelector('.native-btn-icon-left')).toBeNull();
    });
  });

  describe('rightIcon', () => {
    it('renders right icon when provided', () => {
      render(
        <ButtonNative rightIcon={<span data-testid="right-icon">R</span>} testId="test-button">
          Save
        </ButtonNative>,
      );
      expect(screen.getByTestId('right-icon')).toBeDefined();
      const button = screen.getByTestId('test-button');
      expect(button.querySelector('.native-btn-icon-right')).not.toBeNull();
    });

    it('hides right icon when loading', () => {
      render(
        <ButtonNative loading rightIcon={<span data-testid="right-icon">R</span>} testId="test-button">
          Save
        </ButtonNative>,
      );
      const button = screen.getByTestId('test-button');
      expect(button.querySelector('.native-btn-icon-right')).toBeNull();
    });
  });

  describe('both icons', () => {
    it('renders both left and right icons together', () => {
      render(
        <ButtonNative
          leftIcon={<span data-testid="left-icon">L</span>}
          rightIcon={<span data-testid="right-icon">R</span>}
          testId="test-button"
        >
          Save
        </ButtonNative>,
      );
      const button = screen.getByTestId('test-button');
      expect(button.querySelector('.native-btn-icon-left')).not.toBeNull();
      expect(button.querySelector('.native-btn-icon-right')).not.toBeNull();
      expect(screen.getByTestId('left-icon')).toBeDefined();
      expect(screen.getByTestId('right-icon')).toBeDefined();
    });
  });
});
