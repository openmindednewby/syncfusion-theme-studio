import { FM } from '@/localization/helpers';
import { useThemeStore } from '@/stores/useThemeStore';

import { BadgesEditor } from './BadgesEditor';
import { ButtonsEditor } from './ButtonsEditor';
import { CardsEditor } from './CardsEditor';
import { DataGridEditor } from './DataGridEditor';
import { DatePickerEditor } from './DatePickerEditor';
import { DialogEditor } from './DialogEditor';
import { HeaderEditor } from './HeaderEditor';
import { InputsEditor } from './InputsEditor';
import { ModalsEditor } from './ModalsEditor';
import { SelectEditor } from './SelectEditor';
import { SidebarEditor } from './SidebarEditor';

export const ComponentsSection = (): JSX.Element => {
  const {
    theme,
    mode,
    updateHeaderConfig,
    updateSidebarConfig,
    updateButtonConfig,
    updateInputConfig,
    updateDataGridConfig,
    updateCardsConfig,
    updateModalsConfig,
    updateBadgesConfig,
    updateSelectConfig,
    updateDatePickerConfig,
    updateDialogConfig,
  } = useThemeStore();

  // Get the current mode's component configuration
  const components = theme.components[mode];

  return (
    <section className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-text-primary">
          {FM('themeSettings.components.title')}
        </h4>
        <p className="mt-1 text-xs text-text-muted">
          {FM('themeSettings.components.description')}
        </p>
        <p className="mt-1 text-xs font-medium text-primary-600">
          {FM('themeSettings.components.editingMode', mode === 'dark' ? 'Dark' : 'Light')}
        </p>
      </div>

      <div className="space-y-2">
        <HeaderEditor config={components.header} onUpdate={updateHeaderConfig} />
        <SidebarEditor config={components.sidebar} onUpdate={updateSidebarConfig} />
        <ButtonsEditor config={components.buttons} onUpdate={updateButtonConfig} />
        <InputsEditor config={components.inputs} onUpdate={updateInputConfig} />
        <SelectEditor config={components.select} onUpdate={updateSelectConfig} />
        <DatePickerEditor config={components.datePicker} onUpdate={updateDatePickerConfig} />
        <DataGridEditor config={components.dataGrid} onUpdate={updateDataGridConfig} />
        <DialogEditor config={components.dialog} onUpdate={updateDialogConfig} />
        <CardsEditor config={components.cards} onUpdate={updateCardsConfig} />
        <ModalsEditor config={components.modals} onUpdate={updateModalsConfig} />
        <BadgesEditor config={components.badges} onUpdate={updateBadgesConfig} />
      </div>
    </section>
  );
};
