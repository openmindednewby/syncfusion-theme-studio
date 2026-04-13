import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';

import { useTabNavigation } from './useTabNavigation';

const TABS = ['account', 'appearance', 'notifications'] as const;
type TestTab = (typeof TABS)[number];

function createKeyEvent(key: string): React.KeyboardEvent {
  return {
    key,
    preventDefault: vi.fn(),
  } as unknown as React.KeyboardEvent;
}

describe('useTabNavigation', () => {
  describe('tabListProps', () => {
    it('returns role="tablist"', () => {
      const onTabChange = vi.fn();
      const { result } = renderHook(() =>
        useTabNavigation<TestTab>({
          tabs: TABS,
          activeTab: 'account',
          onTabChange,
        }),
      );

      expect(result.current.tabListProps.role).toBe('tablist');
    });
  });

  describe('getTabProps', () => {
    it('returns role="tab" for each tab', () => {
      const onTabChange = vi.fn();
      const { result } = renderHook(() =>
        useTabNavigation<TestTab>({
          tabs: TABS,
          activeTab: 'account',
          onTabChange,
        }),
      );

      const props = result.current.getTabProps('account');
      expect(props.role).toBe('tab');
    });

    it('sets aria-selected=true for the active tab', () => {
      const onTabChange = vi.fn();
      const { result } = renderHook(() =>
        useTabNavigation<TestTab>({
          tabs: TABS,
          activeTab: 'account',
          onTabChange,
        }),
      );

      expect(result.current.getTabProps('account')['aria-selected']).toBe(true);
      expect(result.current.getTabProps('appearance')['aria-selected']).toBe(
        false,
      );
    });

    it('sets tabIndex=0 for active tab and -1 for inactive', () => {
      const onTabChange = vi.fn();
      const { result } = renderHook(() =>
        useTabNavigation<TestTab>({
          tabs: TABS,
          activeTab: 'appearance',
          onTabChange,
        }),
      );

      expect(result.current.getTabProps('account').tabIndex).toBe(-1);
      expect(result.current.getTabProps('appearance').tabIndex).toBe(0);
      expect(result.current.getTabProps('notifications').tabIndex).toBe(-1);
    });

    it('sets aria-controls pointing to the panel id', () => {
      const onTabChange = vi.fn();
      const { result } = renderHook(() =>
        useTabNavigation<TestTab>({
          tabs: TABS,
          activeTab: 'account',
          onTabChange,
        }),
      );

      const props = result.current.getTabProps('account');
      expect(props['aria-controls']).toBe('tabpanel-account');
      expect(props.id).toBe('tab-account');
    });
  });

  describe('tabPanelProps', () => {
    it('returns role="tabpanel"', () => {
      const onTabChange = vi.fn();
      const { result } = renderHook(() =>
        useTabNavigation<TestTab>({
          tabs: TABS,
          activeTab: 'account',
          onTabChange,
        }),
      );

      expect(result.current.tabPanelProps.role).toBe('tabpanel');
    });

    it('links panel to the active tab via aria-labelledby', () => {
      const onTabChange = vi.fn();
      const { result } = renderHook(() =>
        useTabNavigation<TestTab>({
          tabs: TABS,
          activeTab: 'appearance',
          onTabChange,
        }),
      );

      expect(result.current.tabPanelProps.id).toBe('tabpanel-appearance');
      expect(result.current.tabPanelProps['aria-labelledby']).toBe(
        'tab-appearance',
      );
    });
  });

  describe('keyboard navigation', () => {
    it('moves to next tab on ArrowRight', () => {
      const onTabChange = vi.fn();
      const { result } = renderHook(() =>
        useTabNavigation<TestTab>({
          tabs: TABS,
          activeTab: 'account',
          onTabChange,
        }),
      );

      const event = createKeyEvent('ArrowRight');
      act(() => {
        result.current.tabListProps.onKeyDown(event);
      });

      expect(onTabChange).toHaveBeenCalledWith('appearance');
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('moves to previous tab on ArrowLeft', () => {
      const onTabChange = vi.fn();
      const { result } = renderHook(() =>
        useTabNavigation<TestTab>({
          tabs: TABS,
          activeTab: 'appearance',
          onTabChange,
        }),
      );

      const event = createKeyEvent('ArrowLeft');
      act(() => {
        result.current.tabListProps.onKeyDown(event);
      });

      expect(onTabChange).toHaveBeenCalledWith('account');
    });

    it('wraps from last tab to first on ArrowRight', () => {
      const onTabChange = vi.fn();
      const { result } = renderHook(() =>
        useTabNavigation<TestTab>({
          tabs: TABS,
          activeTab: 'notifications',
          onTabChange,
        }),
      );

      const event = createKeyEvent('ArrowRight');
      act(() => {
        result.current.tabListProps.onKeyDown(event);
      });

      expect(onTabChange).toHaveBeenCalledWith('account');
    });

    it('wraps from first tab to last on ArrowLeft', () => {
      const onTabChange = vi.fn();
      const { result } = renderHook(() =>
        useTabNavigation<TestTab>({
          tabs: TABS,
          activeTab: 'account',
          onTabChange,
        }),
      );

      const event = createKeyEvent('ArrowLeft');
      act(() => {
        result.current.tabListProps.onKeyDown(event);
      });

      expect(onTabChange).toHaveBeenCalledWith('notifications');
    });

    it('moves to next tab on ArrowDown', () => {
      const onTabChange = vi.fn();
      const { result } = renderHook(() =>
        useTabNavigation<TestTab>({
          tabs: TABS,
          activeTab: 'account',
          onTabChange,
        }),
      );

      const event = createKeyEvent('ArrowDown');
      act(() => {
        result.current.tabListProps.onKeyDown(event);
      });

      expect(onTabChange).toHaveBeenCalledWith('appearance');
    });

    it('moves to previous tab on ArrowUp', () => {
      const onTabChange = vi.fn();
      const { result } = renderHook(() =>
        useTabNavigation<TestTab>({
          tabs: TABS,
          activeTab: 'appearance',
          onTabChange,
        }),
      );

      const event = createKeyEvent('ArrowUp');
      act(() => {
        result.current.tabListProps.onKeyDown(event);
      });

      expect(onTabChange).toHaveBeenCalledWith('account');
    });

    it('moves to first tab on Home', () => {
      const onTabChange = vi.fn();
      const { result } = renderHook(() =>
        useTabNavigation<TestTab>({
          tabs: TABS,
          activeTab: 'notifications',
          onTabChange,
        }),
      );

      const event = createKeyEvent('Home');
      act(() => {
        result.current.tabListProps.onKeyDown(event);
      });

      expect(onTabChange).toHaveBeenCalledWith('account');
    });

    it('moves to last tab on End', () => {
      const onTabChange = vi.fn();
      const { result } = renderHook(() =>
        useTabNavigation<TestTab>({
          tabs: TABS,
          activeTab: 'account',
          onTabChange,
        }),
      );

      const event = createKeyEvent('End');
      act(() => {
        result.current.tabListProps.onKeyDown(event);
      });

      expect(onTabChange).toHaveBeenCalledWith('notifications');
    });

    it('does nothing for unrelated keys', () => {
      const onTabChange = vi.fn();
      const { result } = renderHook(() =>
        useTabNavigation<TestTab>({
          tabs: TABS,
          activeTab: 'account',
          onTabChange,
        }),
      );

      const event = createKeyEvent('Enter');
      act(() => {
        result.current.tabListProps.onKeyDown(event);
      });

      expect(onTabChange).not.toHaveBeenCalled();
      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });
});
