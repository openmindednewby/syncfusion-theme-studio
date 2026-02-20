import { FM } from '@/localization/utils/helpers';
import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';

import { AccordionEditor } from './components/AccordionEditor';
import { AlertBadgesEditor } from './components/AlertBadgesEditor';
import { AlertsEditor } from './components/AlertsEditor';
import { BadgesEditor } from './components/BadgesEditor';
import { BreadcrumbEditor } from './components/BreadcrumbEditor';
import { ButtonsGroupEditor } from './components/ButtonsGroupEditor';
import { CardsEditor } from './components/CardsEditor';
import { ChipsEditor } from './components/ChipsEditor';
import { DataGridEditor } from './components/DataGridEditor';
import { DatePickerEditor } from './components/DatePickerEditor';
import { DialogEditor } from './components/DialogEditor';
import { ErrorMessagesEditor } from './components/ErrorMessagesEditor';
import { ExternalLinkEditor } from './components/ExternalLinkEditor';
import { FlexBoxEditor } from './components/FlexBoxEditor';
import { FormControlsGroupEditor } from './components/FormControlsGroupEditor';
import { HeaderEditor } from './components/HeaderEditor';
import { InputsEditor } from './components/InputsEditor';
import { MenuEditor } from './components/MenuEditor';
import { MessageEditor } from './components/MessageEditor';
import { ModalsEditor } from './components/ModalsEditor';
import { PaginationEditor } from './components/PaginationEditor';
import { SelectEditor } from './components/SelectEditor';
import { SidebarEditor } from './components/SidebarEditor';
import { TextDescriptionEditor } from './components/TextDescriptionEditor';
import { ToastEditor } from './components/ToastEditor';
import { ToolbarEditor } from './components/ToolbarEditor';
import { TypographyComponentEditor } from './components/TypographyComponentEditor';

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
    updateAlertBadgesConfig,
    updateTextDescriptionConfig,
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
    updateIconButtonConfig,
    updateFabConfig,
    updateSplitButtonConfig,
    updateCheckboxConfig,
    updateRadioConfig,
    updateToggleConfig,
    updateExternalLinkConfig,
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
        <ButtonsGroupEditor
          buttonsConfig={components.buttons}
          fabConfig={components.fab}
          iconButtonsConfig={components.iconButtons}
          splitButtonConfig={components.splitButton}
          onUpdateButtonConfig={updateButtonConfig}
          onUpdateButtonsConfig={updateButtonsConfig}
          onUpdateFabConfig={updateFabConfig}
          onUpdateIconButtonConfig={updateIconButtonConfig}
          onUpdateSplitButtonConfig={updateSplitButtonConfig}
        />
        <FormControlsGroupEditor
          checkboxConfig={components.checkbox}
          radioConfig={components.radio}
          toggleConfig={components.toggle}
          onUpdateCheckboxConfig={updateCheckboxConfig}
          onUpdateRadioConfig={updateRadioConfig}
          onUpdateToggleConfig={updateToggleConfig}
        />
        <InputsEditor config={components.inputs} onUpdate={updateInputConfig} />
        <SelectEditor config={components.select} onUpdate={updateSelectConfig} />
        <DatePickerEditor config={components.datePicker} onUpdate={updateDatePickerConfig} />
        <DataGridEditor config={components.dataGrid} onUpdate={updateDataGridConfig} />
        <DialogEditor config={components.dialog} onUpdate={updateDialogConfig} />
        <CardsEditor config={components.cards} onUpdate={updateCardsConfig} />
        <ModalsEditor config={components.modals} onUpdate={updateModalsConfig} />
        <BadgesEditor config={components.badges} onUpdate={updateBadgesConfig} />
        <AlertBadgesEditor config={components.alertBadges} onUpdate={updateAlertBadgesConfig} />
        <TextDescriptionEditor config={components.textDescription} onUpdate={updateTextDescriptionConfig} />
        <ExternalLinkEditor config={components.externalLink} onUpdate={updateExternalLinkConfig} />
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
