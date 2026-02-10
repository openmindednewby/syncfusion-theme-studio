import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { SplitterComponent, PanesDirective, PaneDirective } from '@syncfusion/ej2-react-layouts';

import { ThemeEditorPanel } from '@/components/layout/ThemeEditorPanel';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { loadSyncfusionCss } from '@/utils';

import { DataGridSection } from '../ComponentsPage/sections';

const BACK_ARROW = '\u2190';
const SPLITTER_PANE_SIZE_EDITOR = '380px';
const SPLITTER_PANE_SIZE_MIN_EDITOR = '280px';
const SPLITTER_PANE_SIZE_MAX_EDITOR = '600px';
const SPLITTER_PANE_SIZE_MIN_CONTENT = '400px';

const DataGridPage = (): JSX.Element => {
  // Load layouts CSS on mount (needed for SplitterComponent)
  useEffect(() => {
    loadSyncfusionCss('layouts').catch(() => {});
  }, []);

  return (
    <div className="h-full -m-6" data-testid={TestIds.DATA_GRID_PAGE}>
    <SplitterComponent
      height="100%"
      separatorSize={4}
      width="100%"
    >
      <PanesDirective>
        {/* Theme Editor Panel */}
        <PaneDirective
          collapsible
          content={() => <ThemeEditorPanel />}
          max={SPLITTER_PANE_SIZE_MAX_EDITOR}
          min={SPLITTER_PANE_SIZE_MIN_EDITOR}
          size={SPLITTER_PANE_SIZE_EDITOR}
        />
        {/* DataGrid Showcase */}
        <PaneDirective
          content={() => (
            <div className="h-full overflow-y-auto p-6">
              <div className="space-y-8" data-testid={TestIds.DATA_GRID_SHOWCASE}>
                {/* Back navigation */}
                <div className="flex items-center gap-4">
                  <Link
                    className="text-primary-600 hover:text-primary-700 flex items-center gap-2 transition-colors"
                    data-testid={TestIds.DATA_GRID_BACK_LINK}
                    to="/dashboard/components"
                  >
                    <span aria-hidden="true">{BACK_ARROW}</span>
                    <span>{FM('components.dataGrid.backToComponents')}</span>
                  </Link>
                </div>

                <h2 className="text-2xl font-bold text-text-primary">
                  {FM('components.sections.dataGrid')}
                </h2>

                {/* DataGrid Section */}
                <DataGridSection />
              </div>
            </div>
          )}
          min={SPLITTER_PANE_SIZE_MIN_CONTENT}
        />
      </PanesDirective>
    </SplitterComponent>
    </div>
  );
};

export default DataGridPage;
