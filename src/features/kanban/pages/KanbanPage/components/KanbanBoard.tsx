import { memo, useCallback, useEffect, useMemo, useRef } from 'react';

import {
  ColumnsDirective,
  ColumnDirective,
  KanbanComponent,
} from '@syncfusion/ej2-react-kanban';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined, loadSyncfusionCss, SyncfusionCssModule } from '@/utils';

import { TaskCard } from './TaskCard';
import { KANBAN_COLUMNS, WIP_LIMITS } from '../../../constants';

import type { KanbanTaskItem } from '../../../types';

interface KanbanBoardProps {
  tasks: KanbanTaskItem[];
  searchQuery: string;
  onEdit: (task: KanbanTaskItem) => void;
  onDelete: (id: number) => void;
  onStatusChange: (taskId: number, newStatus: string) => void;
}

interface DragEventData {
  id: unknown;
  status: unknown;
}

interface DragStopArgs {
  data?: DragEventData[];
}

/** Syncfusion Kanban board wrapper with drag-and-drop support. */
export const KanbanBoard = memo(
  ({ tasks, searchQuery, onEdit, onDelete, onStatusChange }: KanbanBoardProps): JSX.Element => {
    const kanbanRef = useRef<KanbanComponent>(null);

    useEffect(() => {
      loadSyncfusionCss(SyncfusionCssModule.Kanban).catch(() => {});
      loadSyncfusionCss(SyncfusionCssModule.Navigations).catch(() => {});
      loadSyncfusionCss(SyncfusionCssModule.Buttons).catch(() => {});
    }, []);

    const filteredTasks = useMemo(() => {
      if (searchQuery === '') return tasks;
      const lower = searchQuery.toLowerCase();
      return tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(lower) ||
          t.summary.toLowerCase().includes(lower) ||
          t.assignee.toLowerCase().includes(lower) ||
          t.tags.toLowerCase().includes(lower),
      );
    }, [tasks, searchQuery]);

    const handleDragStop = useCallback(
      (args: DragStopArgs) => {
        const draggedData = args.data?.[0];
        if (!isValueDefined(draggedData)) return;
        const taskId = Number(draggedData.id);
        const newStatus = String(draggedData.status);
        onStatusChange(taskId, newStatus);
      },
      [onStatusChange],
    );

    const cardTemplate = useCallback(
      (data: KanbanTaskItem) => (
        <TaskCard task={data} onDelete={onDelete} onEdit={onEdit} />
      ),
      [onEdit, onDelete],
    );

    return (
      <div className="kanban-board-wrapper" data-testid={TestIds.KANBAN_BOARD}>
        <KanbanComponent
          ref={kanbanRef}
          cardSettings={{
            contentField: 'summary',
            headerField: 'title',
            tagsField: 'tags',
            grabberField: 'color',
            template: cardTemplate,
          }}
          cssClass="kanban-theme"
          dataSource={filteredTasks}
          dragStop={handleDragStop}
          keyField="status"
        >
          <ColumnsDirective>
            {KANBAN_COLUMNS.map((col) => (
              <ColumnDirective
                key={col.keyField}
                allowDrag
                allowDrop
                headerText={FM(col.headerText)}
                keyField={col.keyField}
                maxCount={(WIP_LIMITS[col.keyField] ?? 0) > 0 ? WIP_LIMITS[col.keyField] : undefined}
              />
            ))}
          </ColumnsDirective>
        </KanbanComponent>
      </div>
    );
  },
);

KanbanBoard.displayName = 'KanbanBoard';
