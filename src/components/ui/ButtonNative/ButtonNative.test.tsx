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
      expect(screen.getByTestId('test-button').className).toContain('bg-primary-600');
    });

    it('applies danger variant classes when specified', () => {
      render(
        <ButtonNative testId="test-button" variant={ButtonVariant.Danger}>
          Danger
        </ButtonNative>,
      );
      expect(screen.getByTestId('test-button').className).toContain('bg-error-500');
    });

    it('applies outline variant classes when specified', () => {
      render(
        <ButtonNative testId="test-button" variant={ButtonVariant.Outline}>
          Outline
        </ButtonNative>,
      );
      const className = screen.getByTestId('test-button').className;
      expect(className).toContain('bg-transparent');
      expect(className).toContain('border');
    });

    it('applies ghost variant classes when specified', () => {
      render(
        <ButtonNative testId="test-button" variant={ButtonVariant.Ghost}>
          Ghost
        </ButtonNative>,
      );
      expect(screen.getByTestId('test-button').className).toContain('bg-transparent');
    });
  });

  describe('sizes', () => {
    it('applies medium size classes by default', () => {
      render(<ButtonNative testId="test-button">Medium</ButtonNative>);
      expect(screen.getByTestId('test-button').className).toContain('h-10');
    });

    it('applies small size classes when specified', () => {
      render(
        <ButtonNative size={ButtonSize.Sm} testId="test-button">
          Small
        </ButtonNative>,
      );
      expect(screen.getByTestId('test-button').className).toContain('h-8');
    });

    it('applies large size classes when specified', () => {
      render(
        <ButtonNative size={ButtonSize.Lg} testId="test-button">
          Large
        </ButtonNative>,
      );
      expect(screen.getByTestId('test-button').className).toContain('h-12');
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
});
