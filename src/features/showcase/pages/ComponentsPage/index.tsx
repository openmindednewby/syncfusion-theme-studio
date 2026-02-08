import { lazy, Suspense, useEffect } from 'react';

import { SplitterComponent, PanesDirective, PaneDirective } from '@syncfusion/ej2-react-layouts';

import { SectionSkeleton } from '@/components/common';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { loadSyncfusionCss } from '@/utils';

import {
  AdvancedDropdownsSection,
  AdvancedInputsSection,
  ButtonsSection,
  CardsSection,
  ColorsSection,
  InputsSection,
  SelectionSection,
} from './sections';

// Lazy load heavy Syncfusion sections to improve initial load performance
const CalendarsSection = lazy(async () =>
  import('./sections/CalendarsSection').then((m) => ({ default: m.CalendarsSection }))
);
const NavigationsSection = lazy(async () =>
  import('./sections/NavigationsSection').then((m) => ({ default: m.NavigationsSection }))
);
const PopupsSection = lazy(async () =>
  import('./sections/PopupsSection').then((m) => ({ default: m.PopupsSection }))
);
const DataGridSection = lazy(async () =>
  import('./sections/DataGridSection').then((m) => ({ default: m.DataGridSection }))
);

const SPLITTER_PANE_SIZE_MIN_CONTENT = '400px';

// Skeleton heights MUST match actual rendered content heights to prevent CLS
const CALENDARS_SKELETON_HEIGHT = '220px';
const NAVIGATIONS_SKELETON_HEIGHT = '650px';
const POPUPS_SKELETON_HEIGHT = '200px';
const DATAGRID_SKELETON_HEIGHT = '450px';

const ComponentsPage = (): JSX.Element => {
  // Load layouts CSS on mount (needed for SplitterComponent)
  useEffect(() => {
    loadSyncfusionCss('layouts').catch(() => {});
  }, []);

  return (
    <div className="h-full -m-6" data-testid={TestIds.THEME_SPLITTER}>
      <SplitterComponent height="100%" separatorSize={4} width="100%">
        <PanesDirective>
          
          {/* Component Showcase */}
          <PaneDirective
            content={() => (
              <div className="h-full overflow-y-auto p-6">
                <div className="space-y-8" data-testid={TestIds.SHOWCASE_GRID}>
                  <h2 className="text-2xl font-bold text-text-primary">{FM('components.title')}</h2>

                  {/* Colors */}
                  <ColorsSection />

                  {/* Buttons */}
                  <ButtonsSection />

                  {/* Inputs */}
                  <InputsSection />

                  {/* Selection Controls */}
                  <SelectionSection />

                  {/* Advanced Inputs */}
                  <AdvancedInputsSection />

                  {/* Advanced Dropdowns */}
                  <AdvancedDropdownsSection />

                  {/* Calendars - Lazy loaded */}
                  <Suspense
                    fallback={
                      <SectionSkeleton height={CALENDARS_SKELETON_HEIGHT} title="Calendars" />
                    }
                  >
                    <CalendarsSection />
                  </Suspense>

                  {/* Navigation Components - Lazy loaded */}
                  <Suspense
                    fallback={
                      <SectionSkeleton height={NAVIGATIONS_SKELETON_HEIGHT} title="Navigation" />
                    }
                  >
                    <NavigationsSection />
                  </Suspense>

                  {/* Popups - Lazy loaded */}
                  <Suspense
                    fallback={
                      <SectionSkeleton height={POPUPS_SKELETON_HEIGHT} title="Popups & Dialogs" />
                    }
                  >
                    <PopupsSection />
                  </Suspense>

                  {/* DataGrid - Lazy loaded (heaviest component) */}
                  <Suspense
                    fallback={
                      <SectionSkeleton height={DATAGRID_SKELETON_HEIGHT} title="Data Grid" />
                    }
                  >
                    <DataGridSection />
                  </Suspense>

                  {/* Cards and Badges */}
                  <CardsSection />
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

export default ComponentsPage;
