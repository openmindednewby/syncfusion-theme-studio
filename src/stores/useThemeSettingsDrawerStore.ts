import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeSettingsPanelState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

/**
 * Store for managing the Theme Settings Panel state.
 * Uses Zustand persist middleware to remember collapsed/expanded state across page reloads.
 */
export const useThemeSettingsDrawerStore = create<ThemeSettingsPanelState>()(
  persist(
    (set) => ({
      isOpen: true, // Default to open
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: 'theme-settings-panel',
    }
  )
);
