import { createRef } from 'react';

import { describe, it, expect } from 'vitest';

import { render, screen } from '@/test/utils';

import HeadingNative, { HeadingLevel } from './index';

describe('HeadingNative', () => {
  describe('HTML tag rendering', () => {
    it('renders h1 tag for HeadingLevel.H1', () => {
      render(<HeadingNative level={HeadingLevel.H1} testId="h1">Title</HeadingNative>);
      expect(screen.getByTestId('h1').tagName).toBe('H1');
    });

    it('renders h2 tag by default', () => {
      render(<HeadingNative testId="default">Title</HeadingNative>);
      expect(screen.getByTestId('default').tagName).toBe('H2');
    });

    it('renders h3 tag for HeadingLevel.H3', () => {
      render(<HeadingNative level={HeadingLevel.H3} testId="h3">Title</HeadingNative>);
      expect(screen.getByTestId('h3').tagName).toBe('H3');
    });

    it('renders h4 tag for HeadingLevel.H4', () => {
      render(<HeadingNative level={HeadingLevel.H4} testId="h4">Title</HeadingNative>);
      expect(screen.getByTestId('h4').tagName).toBe('H4');
    });
  });

  describe('CSS variable references', () => {
    it('applies typography CSS variables for h1', () => {
      render(<HeadingNative level={HeadingLevel.H1} testId="styled">Title</HeadingNative>);
      const el = screen.getByTestId('styled');
      expect(el.style.fontSize).toBe('var(--typo-h1-size)');
      expect(el.style.fontWeight).toBe('var(--typo-h1-weight)');
      expect(el.style.lineHeight).toBe('var(--typo-h1-line-height)');
      expect(el.style.letterSpacing).toBe('var(--typo-h1-letter-spacing)');
      expect(el.style.color).toBe('var(--typo-h1-color)');
    });
  });

  describe('className passthrough', () => {
    it('applies provided className', () => {
      render(<HeadingNative className="mb-4" testId="classy">Title</HeadingNative>);
      expect(screen.getByTestId('classy').className).toContain('mb-4');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to the heading element', () => {
      const ref = createRef<HTMLHeadingElement>();
      render(<HeadingNative ref={ref} testId="ref-test">Title</HeadingNative>);
      expect(ref.current).toBe(screen.getByTestId('ref-test'));
    });
  });

  describe('style override', () => {
    it('merges inline style overrides', () => {
      render(<HeadingNative style={{ marginTop: '8px' }} testId="override">Title</HeadingNative>);
      expect(screen.getByTestId('override').style.marginTop).toBe('8px');
    });
  });
});
