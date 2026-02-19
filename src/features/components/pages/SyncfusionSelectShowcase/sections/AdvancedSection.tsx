/**
 * AdvancedSection - Demonstrates Syncfusion ComboBox, AutoComplete,
 * and MultiSelect dropdown variants.
 */
import { memo, useId, useEffect, useMemo } from 'react';

import {
  ComboBoxComponent,
  AutoCompleteComponent,
  MultiSelectComponent,
} from '@syncfusion/ej2-react-dropdowns';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/helpers';
import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils';

const countryData = [
  { id: 'us', text: 'United States' },
  { id: 'uk', text: 'United Kingdom' },
  { id: 'ca', text: 'Canada' },
  { id: 'au', text: 'Australia' },
  { id: 'de', text: 'Germany' },
  { id: 'fr', text: 'France' },
  { id: 'jp', text: 'Japan' },
  { id: 'br', text: 'Brazil' },
];

const skillsData = [
  { id: 'react', text: 'React' },
  { id: 'typescript', text: 'TypeScript' },
  { id: 'javascript', text: 'JavaScript' },
  { id: 'nodejs', text: 'Node.js' },
  { id: 'python', text: 'Python' },
  { id: 'java', text: 'Java' },
  { id: 'csharp', text: 'C#' },
  { id: 'go', text: 'Go' },
];

const searchData = [
  'React documentation',
  'React hooks tutorial',
  'React best practices',
  'React performance optimization',
  'React testing library',
  'React router',
  'React state management',
  'React context API',
];

const FIELD_MAPPING = { value: 'id', text: 'text' };

export const AdvancedSection = memo((): JSX.Element => {
  const comboId = useId();
  const autoCompleteId = useId();
  const multiSelectId = useId();
  const { mode } = useThemeStore();

  const themeCssClass = useMemo(
    () => (mode === Mode.Dark ? 'sf-dark' : 'sf-light'),
    [mode],
  );

  useEffect(() => {
    loadSyncfusionCss(SyncfusionCssModule.Dropdowns).catch(() => {});
  }, []);

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.selectShowcase.sections.advanced')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.selectShowcase.sections.advancedDesc')}
        </p>
      </div>
      <div className="grid max-w-lg gap-6">
        <div className="space-y-1">
          <label className="text-sm font-medium text-text-primary" htmlFor={comboId}>
            {FM('components.selectShowcase.comboBoxLabel')}
          </label>
          <ComboBoxComponent
            allowFiltering
            cssClass={themeCssClass}
            dataSource={countryData}
            fields={FIELD_MAPPING}
            id={comboId}
            placeholder={FM('components.selectShowcase.comboBoxPlaceholder')}
          />
          <span className="text-sm text-text-secondary">
            {FM('components.selectShowcase.comboBoxHelper')}
          </span>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-text-primary" htmlFor={autoCompleteId}>
            {FM('components.selectShowcase.autoCompleteLabel')}
          </label>
          <AutoCompleteComponent
            highlight
            cssClass={themeCssClass}
            dataSource={searchData}
            id={autoCompleteId}
            placeholder={FM('components.selectShowcase.autoCompletePlaceholder')}
          />
          <span className="text-sm text-text-secondary">
            {FM('components.selectShowcase.autoCompleteHelper')}
          </span>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-text-primary" htmlFor={multiSelectId}>
            {FM('components.selectShowcase.multiSelectLabel')}
          </label>
          <MultiSelectComponent
            cssClass={themeCssClass}
            dataSource={skillsData}
            fields={FIELD_MAPPING}
            id={multiSelectId}
            mode="Box"
            placeholder={FM('components.selectShowcase.multiSelectPlaceholder')}
          />
          <span className="text-sm text-text-secondary">
            {FM('components.selectShowcase.multiSelectHelper')}
          </span>
        </div>
      </div>
      <CopyableCodeSnippet code='<ComboBoxComponent allowFiltering dataSource={data} fields={{ value: "id", text: "text" }} />' />
    </section>
  );
});

AdvancedSection.displayName = 'AdvancedSection';
