import { describe, it, expect, vi } from 'vitest';

import { render, screen, fireEvent } from '@/test/utils';

import SeeMoreButton from './index';

const TEST_ID = 'test-see-more';

describe('SeeMoreButton', () => {
  it('renders see-more key when collapsed', () => {
    render(
      <SeeMoreButton isExpanded={false} testId={TEST_ID} onToggle={vi.fn()} />,
    );
    expect(screen.getByTestId(TEST_ID).textContent).toContain('seeMore');
  });

  it('renders see-less key when expanded', () => {
    render(
      <SeeMoreButton isExpanded testId={TEST_ID} onToggle={vi.fn()} />,
    );
    expect(screen.getByTestId(TEST_ID).textContent).toContain('seeLess');
  });

  it('calls onToggle on click', () => {
    const handleToggle = vi.fn();
    render(
      <SeeMoreButton isExpanded={false} testId={TEST_ID} onToggle={handleToggle} />,
    );
    fireEvent.click(screen.getByTestId(TEST_ID));
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it('sets aria-expanded to false when collapsed', () => {
    render(
      <SeeMoreButton isExpanded={false} testId={TEST_ID} onToggle={vi.fn()} />,
    );
    expect(screen.getByTestId(TEST_ID).getAttribute('aria-expanded')).toBe('false');
  });

  it('sets aria-expanded to true when expanded', () => {
    render(
      <SeeMoreButton isExpanded testId={TEST_ID} onToggle={vi.fn()} />,
    );
    expect(screen.getByTestId(TEST_ID).getAttribute('aria-expanded')).toBe('true');
  });
});
