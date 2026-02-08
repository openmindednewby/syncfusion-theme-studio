import { FM } from '@/localization/helpers';
import { useThemeStore } from '@/stores/useThemeStore';

import { BadgesEditor } from './BadgesEditor';
import { ButtonsEditor } from './ButtonsEditor';
import { CardsEditor } from './CardsEditor';
import { DataGridEditor } from './DataGridEditor';
import { HeaderEditor } from './HeaderEditor';
import { InputsEditor } from './InputsEditor';
import { ModalsEditor } from './ModalsEditor';
import { SidebarEditor } from './SidebarEditor';

export const ComponentsSection = (): JSX.Element => {
  const {
    theme,
    updateHeaderConfig,
    updateSidebarConfig,
    updateButtonConfig,
    updateInputConfig,
    updateDataGridConfig,
    updateCardsConfig,
    updateModalsConfig,
    updateBadgesConfig,
  } = useThemeStore();

  return (
    <section className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-text-primary">
          {FM('themeSettings.components.title')}
        </h4>
        <p className="mt-1 text-xs text-text-muted">
          {FM('themeSettings.components.description')}
        </p>
      </div>

      <div className="space-y-2">
        <HeaderEditor config={theme.components.header} onUpdate={updateHeaderConfig} />
        <SidebarEditor config={theme.components.sidebar} onUpdate={updateSidebarConfig} />
        <ButtonsEditor config={theme.components.buttons} onUpdate={updateButtonConfig} />
        <InputsEditor config={theme.components.inputs} onUpdate={updateInputConfig} />
        <DataGridEditor config={theme.components.dataGrid} onUpdate={updateDataGridConfig} />
        <CardsEditor config={theme.components.cards} onUpdate={updateCardsConfig} />
        <ModalsEditor config={theme.components.modals} onUpdate={updateModalsConfig} />
        <BadgesEditor config={theme.components.badges} onUpdate={updateBadgesConfig} />
      </div>
    </section>
  );
};
