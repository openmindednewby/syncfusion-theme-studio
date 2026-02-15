import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { SubNavId } from '@/components/layout/Sidebar/subNavId';

interface SidebarState {
  isCollapsed: boolean;
  activeSubNav: SubNavId | null;
  toggle: () => void;
  setCollapsed: (collapsed: boolean) => void;
  setActiveSubNav: (id: SubNavId) => void;
  returnToMainMenu: () => void;
}

export const useSidebarStore = create<SidebarState>()(
  devtools(
    persist(
      (set) => ({
        isCollapsed: false,
        activeSubNav: null,
        toggle: () => set((state) => ({ isCollapsed: !state.isCollapsed }), false, 'toggle'),
        setCollapsed: (collapsed) => set({ isCollapsed: collapsed }, false, 'setCollapsed'),
        setActiveSubNav: (id) => set({ activeSubNav: id }, false, 'setActiveSubNav'),
        returnToMainMenu: () => set({ activeSubNav: null }, false, 'returnToMainMenu'),
      }),
      { name: 'sidebar-storage' },
    ),
    { name: 'SidebarStore' },
  ),
);
