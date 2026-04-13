import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AiPanelState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

/** Store for managing the AI Assistant panel open/close state. */
export const useAiPanel = create<AiPanelState>()(
  devtools(
    (set) => ({
      isOpen: false,
      open: () => set({ isOpen: true }, false, 'open'),
      close: () => set({ isOpen: false }, false, 'close'),
      toggle: () => set((state) => ({ isOpen: !state.isOpen }), false, 'toggle'),
    }),
    { name: 'AiPanelStore' },
  ),
);
