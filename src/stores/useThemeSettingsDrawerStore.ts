import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

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
  devtools(
    persist(
      (set) => ({
        isOpen: true, // Default to open
        open: () => set({ isOpen: true }, false, 'open'),
        close: () => set({ isOpen: false }, false, 'close'),
        toggle: () => set((state) => ({ isOpen: !state.isOpen }), false, 'toggle'),
      }),
      {
        name: 'theme-settings-panel',
      },
    ),
    { name: 'ThemeSettingsDrawerStore' },
  ),
);
