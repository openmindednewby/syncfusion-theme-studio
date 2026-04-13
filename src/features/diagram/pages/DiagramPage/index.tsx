import { memo, useRef } from 'react';

import type { DiagramComponent } from '@syncfusion/ej2-react-diagrams';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { DiagramCanvas } from './components/DiagramCanvas';
import { DiagramToolbar } from './components/DiagramToolbar';
import { ShapePalette } from './components/ShapePalette';
import { TemplatePicker } from './components/TemplatePicker';
import { useDiagramEditor } from './hooks/useDiagramEditor';

const DiagramPage = memo((): JSX.Element => {
  const diagramRef = useRef<DiagramComponent | null>(null);
  const {
    templates,
    activeTemplateId,
    handleUndo,
    handleRedo,
    handleZoomIn,
    handleZoomOut,
    handleFitToPage,
    handleExportPng,
    handleExportSvg,
    handleLoadTemplate,
    handleClearCanvas,
  } = useDiagramEditor(diagramRef);

  return (
    <div className="space-y-4" data-testid={TestIds.DIAGRAM_PAGE}>
      <div>
        <h1 className="text-2xl font-bold text-text-primary">
          {FM('diagram.title')}
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          {FM('diagram.description')}
        </p>
      </div>

      <DiagramToolbar
        onClear={handleClearCanvas}
        onExportPng={handleExportPng}
        onExportSvg={handleExportSvg}
        onFitToPage={handleFitToPage}
        onRedo={handleRedo}
        onUndo={handleUndo}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />

      <div className="grid grid-cols-[240px_1fr] gap-4">
        {/* Left sidebar: templates + palette */}
        <div className="flex flex-col gap-4">
          <TemplatePicker
            activeTemplateId={activeTemplateId}
            templates={templates}
            onLoadTemplate={handleLoadTemplate}
          />
          <div className="min-h-0 flex-1">
            <ShapePalette />
          </div>
        </div>

        {/* Main canvas */}
        <DiagramCanvas onRef={diagramRef} />
      </div>
    </div>
  );
});

DiagramPage.displayName = 'DiagramPage';

export default DiagramPage;
