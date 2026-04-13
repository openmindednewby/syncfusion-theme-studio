import { useCallback, useMemo } from 'react';

import { isValueDefined } from '@/utils/is';

interface UseTabNavigationOptions<T extends string> {
  tabs: readonly T[];
  activeTab: T;
  onTabChange: (tab: T) => void;
}

interface TabButtonProps {
  role: 'tab';
  'aria-selected': boolean;
  'aria-controls': string;
  id: string;
  tabIndex: number;
}

interface TabPanelProps {
  role: 'tabpanel';
  id: string;
  'aria-labelledby': string;
  tabIndex: number;
}

interface UseTabNavigationResult<T extends string> {
  tabListProps: { role: 'tablist'; onKeyDown: (e: React.KeyboardEvent) => void };
  getTabProps: (tabId: T) => TabButtonProps;
  tabPanelProps: TabPanelProps;
}

/** Returns the next tab index for a given key, or undefined if unrelated. */
function resolveNextIndex(key: string, currentIndex: number, length: number): number | undefined {
  if (key === 'ArrowRight' || key === 'ArrowDown') return (currentIndex + 1) % length;
  if (key === 'ArrowLeft' || key === 'ArrowUp') return (currentIndex - 1 + length) % length;
  if (key === 'Home') return 0;
  if (key === 'End') return length - 1;
  return undefined;
}

function buildTabButtonProps<T extends string>(tabId: T, activeTab: T): TabButtonProps {
  return {
    role: 'tab',
    'aria-selected': tabId === activeTab,
    'aria-controls': `tabpanel-${tabId}`,
    id: `tab-${tabId}`,
    tabIndex: tabId === activeTab ? 0 : -1,
  };
}

function buildTabPanelProps(activeTab: string): TabPanelProps {
  return {
    role: 'tabpanel',
    id: `tabpanel-${activeTab}`,
    'aria-labelledby': `tab-${activeTab}`,
    tabIndex: 0,
  };
}

/**
 * Hook providing accessible tab navigation with Arrow key support,
 * proper ARIA roles, and tab/panel relationship attributes.
 */
export function useTabNavigation<T extends string>({
  tabs,
  activeTab,
  onTabChange,
}: UseTabNavigationOptions<T>): UseTabNavigationResult<T> {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent): void => {
      const currentIndex = tabs.indexOf(activeTab);
      if (currentIndex < 0) return;
      const nextIndex = resolveNextIndex(e.key, currentIndex, tabs.length);
      if (!isValueDefined(nextIndex)) return;
      const nextTab = tabs[nextIndex];
      if (!isValueDefined(nextTab)) return;
      e.preventDefault();
      onTabChange(nextTab);
    },
    [tabs, activeTab, onTabChange],
  );

  const getTabProps = useCallback(
    (tabId: T): TabButtonProps => buildTabButtonProps(tabId, activeTab),
    [activeTab],
  );

  const tabPanelProps = useMemo(() => buildTabPanelProps(activeTab), [activeTab]);

  return {
    tabListProps: { role: 'tablist', onKeyDown: handleKeyDown },
    getTabProps,
    tabPanelProps,
  };
}
