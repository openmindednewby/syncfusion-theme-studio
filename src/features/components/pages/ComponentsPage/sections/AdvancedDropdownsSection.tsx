import { useId, useEffect, useMemo } from 'react';

import {
  ComboBoxComponent,
  AutoCompleteComponent,
  MultiSelectComponent,
} from '@syncfusion/ej2-react-dropdowns';

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

export const AdvancedDropdownsSection = (): JSX.Element => {
  const comboId = useId();
  const autoCompleteId = useId();
  const multiSelectId = useId();
  const comboErrorId = useId();
  const autoCompleteDisabledId = useId();
  const multiSelectChipsId = useId();
  const { mode } = useThemeStore();

  const themeCssClass = useMemo(
    () => (mode === Mode.Dark ? 'sf-dark' : 'sf-light'),
    [mode],
  );

  const errorCssClass = useMemo(
    () => `${themeCssClass} e-error`,
    [themeCssClass],
  );

  // Load dropdowns CSS on mount
  useEffect(() => {
    loadSyncfusionCss(SyncfusionCssModule.Dropdowns).catch(() => {});
  }, []);

  return (
    <section className="space-y-6">
      <h3 className="text-xl font-semibold text-text-primary">{FM('components.advancedDropdowns')}</h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* ComboBox */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary" htmlFor={comboId}>
            {FM('components.comboBox')}
          </label>
          <ComboBoxComponent
            allowFiltering
            cssClass={themeCssClass}
            dataSource={countryData}
            fields={{ value: 'id', text: 'text' }}
            id={comboId}
            placeholder="Select or type country"
          />
        </div>

        {/* AutoComplete */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary" htmlFor={autoCompleteId}>
            {FM('components.autoComplete')}
          </label>
          <AutoCompleteComponent
            highlight
            cssClass={themeCssClass}
            dataSource={searchData}
            id={autoCompleteId}
            placeholder="Search for React topics..."
          />
        </div>

        {/* MultiSelect */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary" htmlFor={multiSelectId}>
            {FM('components.multiSelect')}
          </label>
          <MultiSelectComponent
            cssClass={themeCssClass}
            dataSource={skillsData}
            fields={{ value: 'id', text: 'text' }}
            id={multiSelectId}
            mode="Box"
            placeholder="Select skills"
          />
        </div>

        {/* ComboBox with Error */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary" htmlFor={comboErrorId}>
            {FM('components.comboBoxError')}
          </label>
          <ComboBoxComponent
            cssClass={errorCssClass}
            dataSource={countryData}
            fields={{ value: 'id', text: 'text' }}
            id={comboErrorId}
            placeholder="Required field"
          />
        </div>

        {/* AutoComplete Disabled */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary" htmlFor={autoCompleteDisabledId}>
            {FM('components.autoCompleteDisabled')}
          </label>
          <AutoCompleteComponent
            cssClass={themeCssClass}
            dataSource={searchData}
            enabled={false}
            id={autoCompleteDisabledId}
            placeholder="Disabled"
            value="React documentation"
          />
        </div>

        {/* MultiSelect Chips Mode */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary" htmlFor={multiSelectChipsId}>
            {FM('components.multiSelectChips')}
          </label>
          <MultiSelectComponent
            cssClass={themeCssClass}
            dataSource={skillsData}
            fields={{ value: 'id', text: 'text' }}
            id={multiSelectChipsId}
            mode="Default"
            placeholder="Select technologies"
            value={['react', 'typescript']}
          />
        </div>
      </div>
    </section>
  );
};
