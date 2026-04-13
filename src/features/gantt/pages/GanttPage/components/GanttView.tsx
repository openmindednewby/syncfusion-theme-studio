import { memo, useCallback, useEffect, useMemo, useRef } from 'react';

import {
  ColumnDirective,
  ColumnsDirective,
  CriticalPath,
  DayMarkers,
  Edit,
  Filter,
  GanttComponent,
  Inject,
  Resize,
  Selection,
  Sort,
  Toolbar,
} from '@syncfusion/ej2-react-gantt';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined, loadSyncfusionCss, SyncfusionCssModule } from '@/utils';

import type { GanttTaskItem } from '../../../types';

const GANTT_HEIGHT = 'calc(100vh - 120px)';
const DATE_FORMAT = 'MM/dd/yyyy';

interface GanttViewProps {
  tasks: GanttTaskItem[];
  onTaskUpdate: (task: GanttTaskItem) => void;
}

interface GanttDataRow {
  id: number;
  taskName: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  progress: number;
  parentTaskId: number | null;
  dependencies: string | null;
  assignee: string;
  priority: string;
}

interface ActionCompleteArgs {
  requestType?: string;
  data?: GanttDataRow;
}

const GANTT_SERVICES = [Edit, Toolbar, Selection, Sort, Filter, DayMarkers, Resize, CriticalPath];

const TOOLBAR_ITEMS = ['ZoomIn', 'ZoomOut', 'ZoomToFit', 'CriticalPath', 'ExpandAll', 'CollapseAll'];

const EDIT_SETTINGS = {
  allowEditing: true,
  allowTaskbarEditing: true,
  mode: 'Auto' as const,
};

const TASK_FIELDS = {
  id: 'id',
  name: 'taskName',
  startDate: 'startDate',
  endDate: 'endDate',
  duration: 'duration',
  progress: 'progress',
  parentID: 'parentTaskId',
  dependency: 'dependencies',
};

const TIMELINE_SETTINGS = {
  topTier: { unit: 'Month' as const },
  bottomTier: { unit: 'Week' as const },
};

const LABEL_SETTINGS = {
  leftLabel: 'taskName',
  rightLabel: 'assignee',
};

const SPLITTER_SETTINGS = { position: '35%' };

/** Convert string dates to Date objects for Syncfusion GanttComponent. */
function toGanttRows(tasks: GanttTaskItem[]): GanttDataRow[] {
  return tasks.map((t) => ({
    ...t,
    startDate: new Date(t.startDate),
    endDate: new Date(t.endDate),
  }));
}

/** Syncfusion Gantt chart wrapper with editing, zoom, and dependency support. */
export const GanttView = memo(({ tasks, onTaskUpdate }: GanttViewProps): JSX.Element => {
  const ganttRef = useRef<GanttComponent>(null);

  useEffect(() => {
    Promise.all([
      loadSyncfusionCss(SyncfusionCssModule.Gantt),
      loadSyncfusionCss(SyncfusionCssModule.Navigations),
      loadSyncfusionCss(SyncfusionCssModule.Layouts),
    ]).then(() => {
      ganttRef.current?.refresh();
    }).catch(() => {});
  }, []);

  const dataSource = useMemo(() => toGanttRows(tasks), [tasks]);

  const handleActionComplete = useCallback(
    (args: ActionCompleteArgs) => {
      const isUpdateAction = args.requestType === 'save' || args.requestType === 'taskbarEditing';
      const row = args.data;
      if (!isUpdateAction || !isValueDefined(row)) return;

      onTaskUpdate({
        ...row,
        startDate: row.startDate.toISOString(),
        endDate: row.endDate.toISOString(),
      });
    },
    [onTaskUpdate],
  );

  return (
    <div data-testid={TestIds.GANTT_CHART}>
      <GanttComponent
        ref={ganttRef}
        allowFiltering
        allowResizing
        allowSelection
        allowSorting
        highlightWeekends
        actionComplete={handleActionComplete}
        collapseAllParentTasks={false}
        dataSource={dataSource}
        dateFormat={DATE_FORMAT}
        editSettings={EDIT_SETTINGS}
        enableCriticalPath={false}
        height={GANTT_HEIGHT}
        labelSettings={LABEL_SETTINGS}
        projectEndDate={new Date('2026-05-31')}
        projectStartDate={new Date('2026-03-01')}
        splitterSettings={SPLITTER_SETTINGS}
        taskFields={TASK_FIELDS}
        timelineSettings={TIMELINE_SETTINGS}
        toolbar={TOOLBAR_ITEMS}
        treeColumnIndex={1}
      >
        <ColumnsDirective>
          <ColumnDirective isPrimaryKey field="id" headerText={FM('gantt.columns.id')} width="80" />
          <ColumnDirective field="taskName" headerText={FM('gantt.columns.taskName')} width="250" />
          <ColumnDirective field="startDate" format={DATE_FORMAT} headerText={FM('gantt.columns.startDate')} width="130" />
          <ColumnDirective field="endDate" format={DATE_FORMAT} headerText={FM('gantt.columns.endDate')} width="130" />
          <ColumnDirective field="duration" headerText={FM('gantt.columns.duration')} width="100" />
          <ColumnDirective field="progress" headerText={FM('gantt.columns.progress')} width="100" />
          <ColumnDirective field="assignee" headerText={FM('gantt.columns.assignee')} width="150" />
          <ColumnDirective field="priority" headerText={FM('gantt.columns.priority')} width="120" />
        </ColumnsDirective>
        <Inject services={GANTT_SERVICES} />
      </GanttComponent>
    </div>
  );
});

GanttView.displayName = 'GanttView';
