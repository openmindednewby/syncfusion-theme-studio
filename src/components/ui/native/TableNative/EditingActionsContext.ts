/** Context exposing table editing actions to column templates. */
import { createContext, useContext } from 'react';

export interface EditingActions {
  startEdit: (rowId: unknown) => void;
  deleteRow: (rowId: unknown) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  editingRowId: unknown;
}

const EditingActionsContext = createContext<EditingActions | null>(null);
EditingActionsContext.displayName = 'EditingActionsContext';

export const EditingActionsProvider = EditingActionsContext.Provider;

/** Returns editing actions if inside an editing-enabled table, otherwise null. */
export function useEditingActions(): EditingActions | null {
  return useContext(EditingActionsContext);
}
