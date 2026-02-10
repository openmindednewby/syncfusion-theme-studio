import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface SidebarState {
  isCollapsed: boolean;
  toggle: () => void;
  setCollapsed: (collapsed: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
  devtools(
    persist(
      (set) => ({
        isCollapsed: false,
        toggle: () => set((state) => ({ isCollapsed: !state.isCollapsed }), false, 'toggle'),
        setCollapsed: (collapsed) => set({ isCollapsed: collapsed }, false, 'setCollapsed'),
      }),
      { name: 'sidebar-storage' },
    ),
    { name: 'SidebarStore' },
  ),
);
