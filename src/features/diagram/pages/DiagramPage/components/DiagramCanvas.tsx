import { memo, useEffect } from 'react';

import {
  DiagramComponent,
  Inject,
  UndoRedo,
  ConnectorEditing,
  Snapping,
  PrintAndExport,
  DataBinding,
} from '@syncfusion/ej2-react-diagrams';
import type { ConnectorModel, NodeModel } from '@syncfusion/ej2-react-diagrams';

import { TestIds } from '@/shared/testIds';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils';

import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  GRID_INTERVAL,
} from '../../../constants';

interface DiagramCanvasProps {
  readonly onRef: React.RefObject<DiagramComponent>;
}

const SNAP_CONSTRAINT_SHOW_LINES = 1;

/** Syncfusion tailwind theme accent */
const THEME_ACCENT = '#4f46e5';

const NODE_DEFAULTS: NodeModel = {
  style: { fill: THEME_ACCENT, strokeColor: '#c7d2fe' },
};

const CONNECTOR_DEFAULTS: ConnectorModel = {
  type: 'Orthogonal',
  style: { strokeColor: THEME_ACCENT },
  targetDecorator: { style: { fill: THEME_ACCENT, strokeColor: THEME_ACCENT } },
};

const DiagramCanvas = memo(({ onRef }: DiagramCanvasProps): JSX.Element => {
  useEffect(() => {
    loadSyncfusionCss(SyncfusionCssModule.Diagrams).catch(() => {});
  }, []);

  return (
    <div
      className="overflow-hidden rounded-lg border border-border bg-surface"
      data-testid={TestIds.DIAGRAM_CANVAS}
    >
      <DiagramComponent
        ref={onRef}
        connectorDefaults={CONNECTOR_DEFAULTS}
        height={CANVAS_HEIGHT}
        nodeDefaults={NODE_DEFAULTS}
        rulerSettings={{ showRulers: false }}
        scrollSettings={{ scrollLimit: 'Infinity' }}
        snapSettings={{
          constraints: SNAP_CONSTRAINT_SHOW_LINES,
          horizontalGridlines: { lineIntervals: [GRID_INTERVAL] },
          verticalGridlines: { lineIntervals: [GRID_INTERVAL] },
        }}
        width={CANVAS_WIDTH}
      >
        <Inject services={[UndoRedo, ConnectorEditing, Snapping, PrintAndExport, DataBinding]} />
      </DiagramComponent>
    </div>
  );
});

DiagramCanvas.displayName = 'DiagramCanvas';

export { DiagramCanvas };
