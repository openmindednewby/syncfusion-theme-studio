import { memo, useEffect, useMemo } from 'react';

import {
  SymbolPaletteComponent,
} from '@syncfusion/ej2-react-diagrams';
import type { ConnectorModel, NodeModel, PaletteModel } from '@syncfusion/ej2-react-diagrams';

import { TestIds } from '@/shared/testIds';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils';

import {
  PALETTE_HEIGHT,
  PALETTE_SYMBOL_HEIGHT,
  PALETTE_SYMBOL_WIDTH,
  PALETTE_WIDTH,
} from '../../../constants';


const BASIC_SHAPE_SIZE = 40;
const FLOW_SHAPE_SIZE = 40;

/** Syncfusion tailwind theme accent — used for palette symbol rendering on canvas. */
const THEME_ACCENT = '#4f46e5';
const THEME_ACCENT_LIGHT = '#818cf8';

function getBasicShapes(): NodeModel[] {
  const style = { fill: THEME_ACCENT, strokeColor: THEME_ACCENT_LIGHT };
  return [
    { id: 'rect', shape: { type: 'Basic', shape: 'Rectangle' }, style, width: BASIC_SHAPE_SIZE, height: BASIC_SHAPE_SIZE },
    { id: 'ellipse', shape: { type: 'Basic', shape: 'Ellipse' }, style, width: BASIC_SHAPE_SIZE, height: BASIC_SHAPE_SIZE },
    { id: 'triangle', shape: { type: 'Basic', shape: 'Triangle' }, style, width: BASIC_SHAPE_SIZE, height: BASIC_SHAPE_SIZE },
    { id: 'diamond', shape: { type: 'Basic', shape: 'Diamond' }, style, width: BASIC_SHAPE_SIZE, height: BASIC_SHAPE_SIZE },
    { id: 'hexagon', shape: { type: 'Basic', shape: 'Hexagon' }, style, width: BASIC_SHAPE_SIZE, height: BASIC_SHAPE_SIZE },
    { id: 'pentagon', shape: { type: 'Basic', shape: 'Pentagon' }, style, width: BASIC_SHAPE_SIZE, height: BASIC_SHAPE_SIZE },
  ];
}

function getFlowShapes(): NodeModel[] {
  const style = { fill: THEME_ACCENT, strokeColor: THEME_ACCENT_LIGHT };
  return [
    { id: 'flow-process', shape: { type: 'Flow', shape: 'Process' }, style, width: FLOW_SHAPE_SIZE, height: FLOW_SHAPE_SIZE },
    { id: 'flow-decision', shape: { type: 'Flow', shape: 'Decision' }, style, width: FLOW_SHAPE_SIZE, height: FLOW_SHAPE_SIZE },
    { id: 'flow-terminator', shape: { type: 'Flow', shape: 'Terminator' }, style, width: FLOW_SHAPE_SIZE, height: FLOW_SHAPE_SIZE },
    { id: 'flow-document', shape: { type: 'Flow', shape: 'Document' }, style, width: FLOW_SHAPE_SIZE, height: FLOW_SHAPE_SIZE },
    { id: 'flow-data', shape: { type: 'Flow', shape: 'Data' }, style, width: FLOW_SHAPE_SIZE, height: FLOW_SHAPE_SIZE },
    { id: 'flow-predefined', shape: { type: 'Flow', shape: 'PreDefinedProcess' }, style, width: FLOW_SHAPE_SIZE, height: FLOW_SHAPE_SIZE },
  ];
}

function getConnectorSymbols(): ConnectorModel[] {
  const connStyle = { strokeColor: THEME_ACCENT, strokeWidth: 2 };
  const decoratorStyle = { fill: THEME_ACCENT, strokeColor: THEME_ACCENT };
  return [
    { id: 'conn-orthogonal', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: FLOW_SHAPE_SIZE, y: FLOW_SHAPE_SIZE }, style: connStyle, targetDecorator: { style: decoratorStyle } },
    { id: 'conn-straight', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: FLOW_SHAPE_SIZE, y: FLOW_SHAPE_SIZE }, style: connStyle, targetDecorator: { style: decoratorStyle } },
    { id: 'conn-bezier', type: 'Bezier', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: FLOW_SHAPE_SIZE, y: FLOW_SHAPE_SIZE }, style: connStyle, targetDecorator: { style: decoratorStyle } },
  ];
}

const SYMBOL_SIZE = { width: PALETTE_SYMBOL_WIDTH, height: PALETTE_SYMBOL_HEIGHT };

/** Shape palette with basic shapes, flowchart shapes, and connectors for drag-and-drop. */
export const ShapePalette = memo((): JSX.Element => {
  useEffect(() => {
    Promise.all([
      loadSyncfusionCss(SyncfusionCssModule.Diagrams),
      loadSyncfusionCss(SyncfusionCssModule.Navigations),
    ]).catch(() => {});
  }, []);

  const palettes: PaletteModel[] = useMemo(
    () => [
      { id: 'basic', title: 'Basic Shapes', expanded: true, symbols: getBasicShapes() },
      { id: 'flow', title: 'Flowchart Shapes', expanded: true, symbols: getFlowShapes() },
      { id: 'connectors', title: 'Connectors', expanded: false, symbols: getConnectorSymbols() },
    ],
    [],
  );

  return (
    <div
      className="overflow-hidden rounded-lg border border-border bg-surface"
      data-testid={TestIds.DIAGRAM_PALETTE}
    >
      <SymbolPaletteComponent
        enableSearch
        height={PALETTE_HEIGHT}
        palettes={palettes}
        symbolHeight={SYMBOL_SIZE.height}
        symbolWidth={SYMBOL_SIZE.width}
        width={PALETTE_WIDTH}
      />
    </div>
  );
});

ShapePalette.displayName = 'ShapePalette';
