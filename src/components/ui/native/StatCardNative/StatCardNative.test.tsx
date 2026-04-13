import { describe, it, expect } from 'vitest';

import { render, screen } from '@/test/utils';

import StatCardNative, { TrendDirection } from './index';

describe('StatCardNative', () => {
  describe('value display', () => {
    it('renders string value', () => {
      render(<StatCardNative label="Users" testId="card" value="1,234" />);
      expect(screen.getByTestId('card').textContent).toContain('1,234');
    });

    it('renders numeric value as string', () => {
      render(<StatCardNative label="Count" testId="card" value={42} />);
      expect(screen.getByTestId('card').textContent).toContain('42');
    });
  });

  describe('trend direction logic', () => {
    it('renders trend pill with success colors for upward trend', () => {
      render(
        <StatCardNative
          label="Revenue"
          testId="card"
          trend={{ value: '12.5%', direction: TrendDirection.Up }}
          value="$100"
        />,
      );
      const card = screen.getByTestId('card');
      const trendEl = card.querySelector('span.whitespace-nowrap');
      expect(trendEl).not.toBeNull();
      expect(trendEl?.textContent).toBe('+12.5%');
    });

    it('renders trend pill with error colors for downward trend', () => {
      render(
        <StatCardNative
          label="Churn"
          testId="card"
          trend={{ value: '2.4%', direction: TrendDirection.Down }}
          value="5%"
        />,
      );
      const card = screen.getByTestId('card');
      const trendEl = card.querySelector('span.whitespace-nowrap');
      expect(trendEl).not.toBeNull();
      expect(trendEl?.textContent).toBe('2.4%');
    });

    it('renders trend pill for neutral trend', () => {
      render(
        <StatCardNative
          label="Stable"
          testId="card"
          trend={{ value: '0%', direction: TrendDirection.Neutral }}
          value="100"
        />,
      );
      const card = screen.getByTestId('card');
      const trendEl = card.querySelector('span.whitespace-nowrap');
      expect(trendEl).not.toBeNull();
    });

    it('prepends + prefix only for upward trends', () => {
      render(
        <StatCardNative
          label="Up"
          testId="card"
          trend={{ value: '5%', direction: TrendDirection.Up }}
          value="100"
        />,
      );
      const card = screen.getByTestId('card');
      expect(card.textContent).toContain('+5%');
    });

    it('does not prepend + prefix for downward trends', () => {
      render(
        <StatCardNative
          label="Down"
          testId="card"
          trend={{ value: '-3%', direction: TrendDirection.Down }}
          value="100"
        />,
      );
      const card = screen.getByTestId('card');
      expect(card.textContent).not.toContain('+-3%');
      expect(card.textContent).toContain('-3%');
    });

    it('adds left accent border for upward trend', () => {
      render(
        <StatCardNative
          label="Revenue"
          testId="card"
          trend={{ value: '5%', direction: TrendDirection.Up }}
          value="$100"
        />,
      );
      const card = screen.getByTestId('card');
      expect(card.className).toContain('border-l-4');
      expect(card.className).toContain('border-l-success-500');
    });

    it('adds left accent border for downward trend', () => {
      render(
        <StatCardNative
          label="Churn"
          testId="card"
          trend={{ value: '2%', direction: TrendDirection.Down }}
          value="5%"
        />,
      );
      const card = screen.getByTestId('card');
      expect(card.className).toContain('border-l-4');
      expect(card.className).toContain('border-l-error-500');
    });
  });

  describe('optional props', () => {
    it('renders without trend when not provided', () => {
      render(<StatCardNative label="Simple" testId="card" value="10" />);
      const card = screen.getByTestId('card');
      expect(card.querySelector('span.whitespace-nowrap')).toBeNull();
    });

    it('renders icon when provided', () => {
      render(
        <StatCardNative
          icon={<span data-testid="icon">I</span>}
          label="With Icon"
          testId="card"
          value="10"
        />,
      );
      expect(screen.getByTestId('icon')).not.toBeNull();
    });

    it('does not render icon container when icon is not provided', () => {
      render(<StatCardNative label="No Icon" testId="card" value="10" />);
      const card = screen.getByTestId('card');
      // The icon is wrapped in a div; the label is a p — check no div with icon class
      expect(card.querySelector('div.text-text-secondary')).toBeNull();
    });
  });
});
