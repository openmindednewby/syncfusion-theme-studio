import { createRef } from 'react';

import { describe, it, expect } from 'vitest';

import { render, screen } from '@/test/utils';

import TextNative, { TextVariant } from './index';

describe('TextNative', () => {
  describe('default rendering', () => {
    it('renders p tag by default', () => {
      render(<TextNative testId="default">Text</TextNative>);
      expect(screen.getByTestId('default').tagName).toBe('P');
    });
  });

  describe('as prop', () => {
    it('renders span when as="span"', () => {
      render(<TextNative as="span" testId="span">Text</TextNative>);
      expect(screen.getByTestId('span').tagName).toBe('SPAN');
    });
  });

  describe('variant CSS variables', () => {
    it('applies body variant CSS variables by default', () => {
      render(<TextNative testId="body">Text</TextNative>);
      const el = screen.getByTestId('body');
      expect(el.style.fontSize).toBe('var(--typo-body-size)');
      expect(el.style.color).toBe('var(--typo-body-color)');
    });

    it('applies muted variant CSS variables', () => {
      render(<TextNative testId="muted" variant={TextVariant.Muted}>Text</TextNative>);
      const el = screen.getByTestId('muted');
      expect(el.style.fontSize).toBe('var(--typo-muted-size)');
      expect(el.style.color).toBe('var(--typo-muted-color)');
    });

    it('applies caption variant CSS variables', () => {
      render(<TextNative testId="caption" variant={TextVariant.Caption}>Text</TextNative>);
      expect(screen.getByTestId('caption').style.fontSize).toBe('var(--typo-caption-size)');
    });

    it('applies secondary variant CSS variables', () => {
      render(<TextNative testId="sec" variant={TextVariant.Secondary}>Text</TextNative>);
      expect(screen.getByTestId('sec').style.color).toBe('var(--typo-secondary-color)');
    });

    it('applies label variant CSS variables', () => {
      render(<TextNative testId="lbl" variant={TextVariant.Label}>Text</TextNative>);
      expect(screen.getByTestId('lbl').style.fontWeight).toBe('var(--typo-label-weight)');
    });

    it('applies bodySmall variant CSS variables', () => {
      render(<TextNative testId="bs" variant={TextVariant.BodySmall}>Text</TextNative>);
      expect(screen.getByTestId('bs').style.fontSize).toBe('var(--typo-body-small-size)');
    });
  });

  describe('className passthrough', () => {
    it('applies provided className', () => {
      render(<TextNative className="mt-2" testId="classy">Text</TextNative>);
      expect(screen.getByTestId('classy').className).toContain('mt-2');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to the element', () => {
      const ref = createRef<HTMLElement>();
      render(<TextNative ref={ref} testId="ref-test">Text</TextNative>);
      expect(ref.current).toBe(screen.getByTestId('ref-test'));
    });
  });
});
