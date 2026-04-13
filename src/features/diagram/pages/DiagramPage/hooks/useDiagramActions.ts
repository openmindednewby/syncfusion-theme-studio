import { useCallback } from 'react';

import type { DiagramComponent } from '@syncfusion/ej2-react-diagrams';

import { ZOOM_FACTOR } from '../../../constants';

export type GetDiagram = () => DiagramComponent | null;

interface DiagramActions {
  readonly handleUndo: () => void;
  readonly handleRedo: () => void;
  readonly handleZoomIn: () => void;
  readonly handleZoomOut: () => void;
  readonly handleFitToPage: () => void;
  readonly handleExportPng: () => void;
  readonly handleExportSvg: () => void;
  readonly handleClearCanvas: () => void;
}

/** Creates a getDiagram accessor from a ref. */
export function useGetDiagram(
  diagramRef: React.RefObject<DiagramComponent | null>,
): GetDiagram {
  return useCallback((): DiagramComponent | null => diagramRef.current, [diagramRef]);
}

/** Provides undo/redo, zoom, export, and clear actions for a diagram. */
export function useDiagramActions(getDiagram: GetDiagram, onClear?: () => void): DiagramActions {
  const handleUndo = useCallback(() => { getDiagram()?.undo(); }, [getDiagram]);
  const handleRedo = useCallback(() => { getDiagram()?.redo(); }, [getDiagram]);
  const handleFitToPage = useCallback(() => { getDiagram()?.fitToPage(); }, [getDiagram]);
  const handleZoomIn = useCallback(() => { getDiagram()?.zoomTo({ type: 'ZoomIn', zoomFactor: ZOOM_FACTOR }); }, [getDiagram]);
  const handleZoomOut = useCallback(() => { getDiagram()?.zoomTo({ type: 'ZoomOut', zoomFactor: ZOOM_FACTOR }); }, [getDiagram]);
  const handleExportPng = useCallback(() => { getDiagram()?.exportDiagram({ mode: 'Download', format: 'PNG', fileName: 'diagram' }); }, [getDiagram]);
  const handleExportSvg = useCallback(() => { getDiagram()?.exportDiagram({ mode: 'Download', format: 'SVG', fileName: 'diagram' }); }, [getDiagram]);
  const handleClearCanvas = useCallback(() => { getDiagram()?.clear(); onClear?.(); }, [getDiagram, onClear]);

  return { handleUndo, handleRedo, handleZoomIn, handleZoomOut, handleFitToPage, handleExportPng, handleExportSvg, handleClearCanvas };
}
