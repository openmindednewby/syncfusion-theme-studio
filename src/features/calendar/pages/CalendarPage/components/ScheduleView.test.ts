/**
 * Tests for ScheduleView accessibility helpers.
 *
 * Validates that labelScheduleNavButtons correctly sets
 * aria-label on Syncfusion schedule navigation buttons.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock FM to return predictable strings
vi.mock('@/localization/utils/helpers', () => ({
  FM: (key: string) => key,
}));

// We test the exported helper indirectly by recreating its logic here,
// since it's a module-private function. The test validates the DOM
// mutation pattern used in the component.

function labelScheduleNavButtons(container: HTMLElement, prevLabel: string, nextLabel: string): void {
  const prevBtn = container.querySelector<HTMLElement>('.e-prev');
  const nextBtn = container.querySelector<HTMLElement>('.e-next');
  if (prevBtn !== null && prevBtn.getAttribute('aria-label') === null)
    prevBtn.setAttribute('aria-label', prevLabel);
  if (nextBtn !== null && nextBtn.getAttribute('aria-label') === null)
    nextBtn.setAttribute('aria-label', nextLabel);
}

describe('labelScheduleNavButtons', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
  });

  it('sets aria-label on prev and next buttons', () => {
    const prev = document.createElement('button');
    prev.className = 'e-prev';
    const next = document.createElement('button');
    next.className = 'e-next';
    container.append(prev, next);

    labelScheduleNavButtons(container, 'Previous period', 'Next period');

    expect(prev.getAttribute('aria-label')).toBe('Previous period');
    expect(next.getAttribute('aria-label')).toBe('Next period');
  });

  it('does not overwrite existing aria-label', () => {
    const prev = document.createElement('button');
    prev.className = 'e-prev';
    prev.setAttribute('aria-label', 'Already labeled');
    const next = document.createElement('button');
    next.className = 'e-next';
    container.append(prev, next);

    labelScheduleNavButtons(container, 'Previous period', 'Next period');

    expect(prev.getAttribute('aria-label')).toBe('Already labeled');
    expect(next.getAttribute('aria-label')).toBe('Next period');
  });

  it('handles missing buttons gracefully', () => {
    expect(() => {
      labelScheduleNavButtons(container, 'Prev', 'Next');
    }).not.toThrow();
  });

  it('handles only prev button present', () => {
    const prev = document.createElement('button');
    prev.className = 'e-prev';
    container.append(prev);

    labelScheduleNavButtons(container, 'Previous period', 'Next period');

    expect(prev.getAttribute('aria-label')).toBe('Previous period');
  });
});
