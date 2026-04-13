/**
 * Shared hook managing mutable row data, modal states, and action handlers
 * for the Interactive Playground edit/delete/view/export/archive actions.
 */
import { useCallback, useMemo, useState } from 'react';

import { ToastSeverity, useToast } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

type Row = Record<string, unknown>;
type AddToast = ReturnType<typeof useToast>['addToast'];

const NAME_KEY = 'name';
const ID_KEY = 'id';
const getRowName = (row: Row): string => String(row[NAME_KEY] ?? '');

interface ModalState<T> { isOpen: boolean; row: T | null }
const CLOSED: ModalState<Row> = { isOpen: false, row: null };

interface Deps { setRows: React.Dispatch<React.SetStateAction<Row[]>>; addToast: AddToast }

export interface PlaygroundActions {
  rows: Row[];
  editState: ModalState<Row>;
  viewState: ModalState<Row>;
  deleteState: ModalState<Row>;
  archiveState: ModalState<Row>;
  handleEdit: (row: Row) => void;
  handleEditSave: (values: Row) => void;
  handleEditClose: () => void;
  handleDelete: (row: Row) => void;
  handleDeleteConfirm: () => void;
  handleDeleteClose: () => void;
  handleView: (row: Row) => void;
  handleViewClose: () => void;
  handleExport: (row: Row) => void;
  handleArchive: (row: Row) => void;
  handleArchiveConfirm: () => void;
  handleArchiveClose: () => void;
  handleInlineSave: (editedRow: Row) => void;
  handleInlineDelete: (row: Row) => void;
}

function downloadRowAsJson(row: Row): void {
  const json = JSON.stringify(row, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const fileName = getRowName(row).replace(/\s+/g, '_');
  a.download = `${fileName !== '' ? fileName : 'export'}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

const removeRow = (targetId: unknown) => (prev: Row[]): Row[] => prev.filter((r) => r[ID_KEY] !== targetId);

interface ConfirmOpts {
  state: ModalState<Row>;
  setState: (s: ModalState<Row>) => void;
  deps: Deps;
  toastKey: string;
  severity: ToastSeverity;
}

function useConfirmHandlers({ state, setState, deps, toastKey, severity }: ConfirmOpts): {
  handleOpen: (row: Row) => void; handleConfirm: () => void; handleClose: () => void;
} {
  const handleOpen = useCallback((row: Row) => setState({ isOpen: true, row }), [setState]);
  const handleClose = useCallback(() => setState(CLOSED), [setState]);
  const handleConfirm = useCallback(() => {
    const target = state.row;
    if (!target) return;
    deps.setRows(removeRow(target[ID_KEY]));
    deps.addToast({ severity, title: FM(`gridShowcase.${toastKey}ToastTitle`), message: FM(`gridShowcase.${toastKey}ToastMessage`, getRowName(target)) });
    setState(CLOSED);
  }, [state.row, deps, setState, toastKey, severity]);
  return { handleOpen, handleConfirm, handleClose };
}

function useEditHandlers(
  editState: ModalState<Row>,
  setEditState: (s: ModalState<Row>) => void,
  deps: Deps,
): { handleEdit: (row: Row) => void; handleEditSave: (values: Row) => void; handleEditClose: () => void } {
  const handleEdit = useCallback((row: Row) => setEditState({ isOpen: true, row }), [setEditState]);
  const handleEditClose = useCallback(() => setEditState(CLOSED), [setEditState]);
  const handleEditSave = useCallback((values: Row) => {
    const target = editState.row;
    if (!target) return;
    deps.setRows((prev) => prev.map((r) => (r[ID_KEY] === target[ID_KEY] ? { ...r, ...values } : r)));
    deps.addToast({ severity: ToastSeverity.Success, title: FM('gridShowcase.editToastTitle'), message: FM('gridShowcase.editToastMessage', getRowName(values)) });
    setEditState(CLOSED);
  }, [editState.row, deps, setEditState]);
  return { handleEdit, handleEditSave, handleEditClose };
}

function useInlineHandlers(deps: Deps): { handleInlineSave: (row: Row) => void; handleInlineDelete: (row: Row) => void } {
  const handleInlineSave = useCallback((editedRow: Row) => {
    deps.setRows((prev) => prev.map((r) => (r[ID_KEY] === editedRow[ID_KEY] ? editedRow : r)));
    deps.addToast({ severity: ToastSeverity.Success, title: FM('gridShowcase.editToastTitle'), message: FM('gridShowcase.editToastMessage', getRowName(editedRow)) });
  }, [deps]);
  const handleInlineDelete = useCallback((row: Row) => {
    deps.setRows(removeRow(row[ID_KEY]));
    deps.addToast({ severity: ToastSeverity.Success, title: FM('gridShowcase.deleteToastTitle'), message: FM('gridShowcase.deleteToastMessage', getRowName(row)) });
  }, [deps]);
  return { handleInlineSave, handleInlineDelete };
}

export function usePlaygroundActions(initialData: Row[]): PlaygroundActions {
  const [rows, setRows] = useState<Row[]>(initialData);
  const [editState, setEditState] = useState<ModalState<Row>>(CLOSED);
  const [viewState, setViewState] = useState<ModalState<Row>>(CLOSED);
  const [deleteState, setDeleteState] = useState<ModalState<Row>>(CLOSED);
  const [archiveState, setArchiveState] = useState<ModalState<Row>>(CLOSED);
  const { addToast } = useToast();
  const deps = useMemo<Deps>(() => ({ setRows, addToast }), [addToast]);
  const edit = useEditHandlers(editState, setEditState, deps);
  const delOpts = useMemo<ConfirmOpts>(() => ({ state: deleteState, setState: setDeleteState, deps, toastKey: 'delete', severity: ToastSeverity.Success }), [deleteState, deps]);
  const archiveOpts = useMemo<ConfirmOpts>(() => ({ state: archiveState, setState: setArchiveState, deps, toastKey: 'archive', severity: ToastSeverity.Info }), [archiveState, deps]);
  const del = useConfirmHandlers(delOpts);
  const archive = useConfirmHandlers(archiveOpts);
  const handleView = useCallback((row: Row) => setViewState({ isOpen: true, row }), []);
  const handleViewClose = useCallback(() => setViewState(CLOSED), []);
  const handleExport = useCallback((row: Row) => {
    downloadRowAsJson(row);
    deps.addToast({ severity: ToastSeverity.Info, title: FM('gridShowcase.exportToastTitle'), message: FM('gridShowcase.exportToastMessage', getRowName(row)) });
  }, [deps]);
  const inline = useInlineHandlers(deps);
  return {
    rows, editState, viewState, deleteState, archiveState, ...edit,
    handleDelete: del.handleOpen, handleDeleteConfirm: del.handleConfirm, handleDeleteClose: del.handleClose,
    handleView, handleViewClose, handleExport,
    handleArchive: archive.handleOpen, handleArchiveConfirm: archive.handleConfirm, handleArchiveClose: archive.handleClose,
    ...inline,
  };
}
