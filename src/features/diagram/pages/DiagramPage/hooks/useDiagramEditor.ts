
import { useCallback, useState } from 'react';

import { type DiagramComponent } from '@syncfusion/ej2-react-diagrams';

import { isValueDefined } from '@/utils';

import { useDiagramActions, useGetDiagram } from './useDiagramActions';
import { getDiagramTemplates } from '../../../data/diagramTemplates';

import type { DiagramTemplate } from '../../../types';

interface DiagramEditorResult {
  readonly templates: DiagramTemplate[];
  readonly activeTemplateId: string;
  readonly handleUndo: () => void;
  readonly handleRedo: () => void;
  readonly handleZoomIn: () => void;
  readonly handleZoomOut: () => void;
  readonly handleFitToPage: () => void;
  readonly handleExportPng: () => void;
  readonly handleExportSvg: () => void;
  readonly handleLoadTemplate: (templateId: string) => void;
  readonly handleClearCanvas: () => void;
}

/** Manages diagram editor state, actions, and template loading. */
export function useDiagramEditor(
  diagramRef: React.MutableRefObject<DiagramComponent | null>,
): DiagramEditorResult {
  const templates = getDiagramTemplates();
  const [activeTemplateId, setActiveTemplateId] = useState('');

  const resetTemplateId = useCallback(() => { setActiveTemplateId(''); }, []);
  const getDiagram = useGetDiagram(diagramRef);
  const actions = useDiagramActions(getDiagram, resetTemplateId);

  const handleLoadTemplate = useCallback(
    (templateId: string) => {
      const diagram = diagramRef.current;
      if (!isValueDefined(diagram)) return;

      const match: DiagramTemplate | undefined = templates.find((t) => t.id === templateId);
      if (!isValueDefined(match)) return;

      diagram.clear();
      match.nodes.forEach((node) => diagram.addNode(node));
      match.connectors.forEach((conn) => diagram.addConnector(conn));
      diagram.fitToPage();
      setActiveTemplateId(templateId);
    },
    [diagramRef, templates],
  );

  return {
    templates,
    activeTemplateId,
    ...actions,
    handleLoadTemplate,
  };
}
