import { describe, it, expect } from 'vitest';

import { render } from '@/test/utils';

import { ThemeStudioLogo } from './AppIcons';

describe('ThemeStudioLogo', () => {
  it('renders SVG with aria-hidden="true" for decorative icon', () => {
    const { container } = render(<ThemeStudioLogo />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
  });

  it('passes className to the SVG element', () => {
    const { container } = render(<ThemeStudioLogo className="test-class" />);
    const svg = container.querySelector('svg');
    expect(svg?.classList.contains('test-class')).toBe(true);
  });
});
