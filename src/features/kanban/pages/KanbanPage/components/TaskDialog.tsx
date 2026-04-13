import { memo, useCallback, useMemo, useState } from 'react';

import { useDialog } from '@/hooks/useDialog';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils';

import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../../../constants';
import { KanbanStatus } from '../../../kanbanStatus';

import type { KanbanTaskItem } from '../../../types';

interface TaskDialogProps {
  task: KanbanTaskItem | null;
  onClose: () => void;
  onSave: (data: TaskFormData) => void;
}

export interface TaskFormData {
  title: string;
  summary: string;
  status: string;
  priority: string;
  assignee: string;
  tags: string;
  color: string;
  dueDate: string | null;
}

function statusLabel(s: KanbanStatus): string {
  return FM(`kanban.columns.${s === KanbanStatus.InProgress ? 'inProgress' : s.toLowerCase()}`);
}

const DEFAULT_FORM: TaskFormData = {
  title: '', summary: '', status: 'Backlog', priority: 'Normal',
  assignee: '', tags: '', color: '#3B82F6', dueDate: null,
};

const INPUT_CLASS =
  'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500';
const LABEL_CLASS = 'mb-1 block text-xs font-medium text-text-muted';

function toFormData(task: KanbanTaskItem | null): TaskFormData {
  if (!isValueDefined(task)) return DEFAULT_FORM;
  return {
    title: task.title, summary: task.summary, status: task.status,
    priority: task.priority, assignee: task.assignee, tags: task.tags,
    color: task.color, dueDate: task.dueDate,
  };
}

/** Dialog for creating or editing a kanban task. */
export const TaskDialog = memo(({ task, onClose, onSave }: TaskDialogProps): JSX.Element => {
  const [form, setForm] = useState<TaskFormData>(() => toFormData(task));
  const isEdit = isValueDefined(task);
  const dialogOptions = useMemo(() => ({ isOpen: true, onClose }), [onClose]);
  const { backdropProps, dialogProps, titleId } = useDialog(dialogOptions);

  const handleChange = useCallback(
    (field: keyof TaskFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => { e.preventDefault(); onSave(form); },
    [form, onSave],
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" data-testid={TestIds.KANBAN_DIALOG} {...backdropProps}>
      <div className="w-full max-w-lg rounded-lg border border-border bg-surface p-6 shadow-xl" {...dialogProps}>
        <h2 className="mb-4 text-lg font-semibold text-text-primary" id={titleId}>
          {isEdit ? FM('kanban.editTask') : FM('kanban.createTask')}
        </h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className={LABEL_CLASS} htmlFor="kanban-title">{FM('kanban.fields.title')}</label>
            <input required className={INPUT_CLASS} id="kanban-title" type="text" value={form.title} onChange={handleChange('title')} />
          </div>
          <div>
            <label className={LABEL_CLASS} htmlFor="kanban-summary">{FM('kanban.fields.summary')}</label>
            <textarea className={INPUT_CLASS} id="kanban-summary" rows={2} value={form.summary} onChange={handleChange('summary')} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LABEL_CLASS} htmlFor="kanban-status">{FM('kanban.fields.status')}</label>
              <select className={INPUT_CLASS} id="kanban-status" value={form.status} onChange={handleChange('status')}>
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{statusLabel(s)}</option>)}
              </select>
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="kanban-priority">{FM('kanban.fields.priority')}</label>
              <select className={INPUT_CLASS} id="kanban-priority" value={form.priority} onChange={handleChange('priority')}>
                {PRIORITY_OPTIONS.map((p) => <option key={p} value={p}>{FM(`kanban.priority.${p.toLowerCase()}`)}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LABEL_CLASS} htmlFor="kanban-assignee">{FM('kanban.fields.assignee')}</label>
              <input className={INPUT_CLASS} id="kanban-assignee" type="text" value={form.assignee} onChange={handleChange('assignee')} />
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="kanban-tags">{FM('kanban.fields.tags')}</label>
              <input className={INPUT_CLASS} id="kanban-tags" placeholder="Tag1, Tag2" type="text" value={form.tags} onChange={handleChange('tags')} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LABEL_CLASS} htmlFor="kanban-color">{FM('kanban.fields.color')}</label>
              <input className="h-9 w-full cursor-pointer rounded-md border border-border" id="kanban-color" type="color" value={form.color} onChange={handleChange('color')} />
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="kanban-duedate">{FM('kanban.fields.dueDate')}</label>
              <input className={INPUT_CLASS} id="kanban-duedate" type="date" value={form.dueDate ?? ''} onChange={(e) => setForm((prev) => ({ ...prev, dueDate: e.target.value !== '' ? e.target.value : null }))} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button className="rounded-md border border-border px-4 py-2 text-sm text-text-primary hover:bg-surface-hover" type="button" onClick={onClose}>
              {FM('common.cancel')}
            </button>
            <button className="rounded-md bg-primary-600 px-4 py-2 text-sm text-white hover:bg-primary-700" data-testid={TestIds.KANBAN_SAVE_BTN} type="submit">
              {FM('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

TaskDialog.displayName = 'TaskDialog';
