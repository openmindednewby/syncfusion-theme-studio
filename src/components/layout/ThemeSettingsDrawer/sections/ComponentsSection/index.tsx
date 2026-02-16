import { FM } from '@/localization/helpers';
import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';

import { AccordionEditor } from './AccordionEditor';
import { AlertsEditor } from './AlertsEditor';
import { BadgesEditor } from './BadgesEditor';
import { BreadcrumbEditor } from './BreadcrumbEditor';
import { ButtonsEditor } from './ButtonsEditor';
import { CardsEditor } from './CardsEditor';
import { ChipsEditor } from './ChipsEditor';
import { DataGridEditor } from './DataGridEditor';
import { DatePickerEditor } from './DatePickerEditor';
import { DialogEditor } from './DialogEditor';
import { ErrorMessagesEditor } from './ErrorMessagesEditor';
import { FlexBoxEditor } from './FlexBoxEditor';
import { HeaderEditor } from './HeaderEditor';
import { InputsEditor } from './InputsEditor';
import { MenuEditor } from './MenuEditor';
import { MessageEditor } from './MessageEditor';
import { ModalsEditor } from './ModalsEditor';
import { PaginationEditor } from './PaginationEditor';
import { SelectEditor } from './SelectEditor';
import { SidebarEditor } from './SidebarEditor';
import { ToastEditor } from './ToastEditor';
import { ToolbarEditor } from './ToolbarEditor';
import { TypographyComponentEditor } from './TypographyComponentEditor';

export const ComponentsSection = (): JSX.Element => {
  const {
    theme,
    mode,
    updateHeaderConfig,
    updateSidebarConfig,
    updateButtonConfig,
    updateButtonsConfig,
    updateInputConfig,
    updateDataGridConfig,
    updateCardsConfig,
    updateModalsConfig,
    updateBadgesConfig,
    updateSelectConfig,
    updateDatePickerConfig,
    updateDialogConfig,
    updateErrorMessagesConfig,
    updateFlexBoxConfig,
    updateAlertsConfig,
    updateToastConfig,
    updateMessageConfig,
    updateChipConfig,
    updateAccordionConfig,
    updateToolbarConfig,
    updateMenuConfig,
    updateBreadcrumbConfig,
    updatePaginationConfig,
    updateTypographyComponentLevel,
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
          {FM('themeSettings.components.editingMode', mode === Mode.Dark ? 'Dark' : 'Light')}
        </p>
      </div>

      <div className="space-y-2">
        <HeaderEditor config={components.header} onUpdate={updateHeaderConfig} />
        <SidebarEditor config={components.sidebar} onUpdate={updateSidebarConfig} />
        <ButtonsEditor config={components.buttons} onUpdate={updateButtonConfig} onUpdateConfig={updateButtonsConfig} />
        <InputsEditor config={components.inputs} onUpdate={updateInputConfig} />
        <SelectEditor config={components.select} onUpdate={updateSelectConfig} />
        <DatePickerEditor config={components.datePicker} onUpdate={updateDatePickerConfig} />
        <DataGridEditor config={components.dataGrid} onUpdate={updateDataGridConfig} />
        <DialogEditor config={components.dialog} onUpdate={updateDialogConfig} />
        <CardsEditor config={components.cards} onUpdate={updateCardsConfig} />
        <ModalsEditor config={components.modals} onUpdate={updateModalsConfig} />
        <BadgesEditor config={components.badges} onUpdate={updateBadgesConfig} />
        <ChipsEditor config={components.chips} onUpdate={updateChipConfig} />
        <ErrorMessagesEditor config={components.errorMessages} onUpdate={updateErrorMessagesConfig} />
        <FlexBoxEditor config={components.flexBox} onUpdate={updateFlexBoxConfig} />
        <AlertsEditor config={components.alerts} onUpdate={updateAlertsConfig} />
        <ToastEditor config={components.toast} onUpdate={updateToastConfig} />
        <MessageEditor config={components.message} onUpdate={updateMessageConfig} />
        <AccordionEditor config={components.accordion} onUpdate={updateAccordionConfig} />
        <ToolbarEditor config={components.toolbar} onUpdate={updateToolbarConfig} />
        <MenuEditor config={components.menu} onUpdate={updateMenuConfig} />
        <BreadcrumbEditor config={components.breadcrumb} onUpdate={updateBreadcrumbConfig} />
        <PaginationEditor config={components.pagination} onUpdate={updatePaginationConfig} />
        <TypographyComponentEditor config={theme.typographyComponents} onUpdate={updateTypographyComponentLevel} />
      </div>
    </section>
  );
};
