import { useState, useCallback } from 'react';

interface ColumnMenuState {
  openField: string | null;
  isOpen: (field: string) => boolean;
  toggle: (field: string) => void;
  close: () => void;
}

/** Manages which column's menu is currently open (only one at a time). */
export function useColumnMenu(): ColumnMenuState {
  const [openField, setOpenField] = useState<string | null>(null);

  const isOpen = useCallback(
    (field: string): boolean => openField === field,
    [openField],
  );

  const toggle = useCallback(
    (field: string): void => {
      setOpenField((prev) => (prev === field ? null : field));
    },
    [],
  );

  const close = useCallback((): void => {
    setOpenField(null);
  }, []);

  return { openField, isOpen, toggle, close };
}
