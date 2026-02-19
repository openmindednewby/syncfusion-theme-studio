import { FM } from '@/localization/helpers';
import type {
  ButtonsComponentConfig,
  ButtonStateColors,
  ButtonVariant,
  FabConfig,
  IconButtonConfig,
  SplitButtonConfig,
} from '@/stores/theme/types';

import { ButtonsEditor } from './ButtonsEditor';
import { CollapsibleSection } from './CollapsibleSection';
import { FabEditor } from './FabEditor';
import { IconButtonsEditor } from './IconButtonsEditor';
import { SplitButtonEditor } from './SplitButtonEditor';

interface ButtonsGroupEditorProps {
  buttonsConfig: ButtonsComponentConfig;
  fabConfig: FabConfig;
  iconButtonsConfig: IconButtonConfig;
  onUpdateButtonConfig: (variant: ButtonVariant, updates: Partial<ButtonStateColors>) => void;
  onUpdateButtonsConfig: (updates: Partial<ButtonsComponentConfig>) => void;
  onUpdateFabConfig: (updates: Partial<FabConfig>) => void;
  onUpdateIconButtonConfig: (updates: Partial<IconButtonConfig>) => void;
  onUpdateSplitButtonConfig: (updates: Partial<SplitButtonConfig>) => void;
  splitButtonConfig: SplitButtonConfig;
}

export const ButtonsGroupEditor = ({
  buttonsConfig,
  fabConfig,
  iconButtonsConfig,
  onUpdateButtonConfig,
  onUpdateButtonsConfig,
  onUpdateFabConfig,
  onUpdateIconButtonConfig,
  onUpdateSplitButtonConfig,
  splitButtonConfig,
}: ButtonsGroupEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.buttonsGroup.title')}>
    <div className="space-y-2">
      <ButtonsEditor config={buttonsConfig} onUpdate={onUpdateButtonConfig} onUpdateConfig={onUpdateButtonsConfig} />
      <IconButtonsEditor config={iconButtonsConfig} onUpdate={onUpdateIconButtonConfig} />
      <FabEditor config={fabConfig} onUpdate={onUpdateFabConfig} />
      <SplitButtonEditor config={splitButtonConfig} onUpdate={onUpdateSplitButtonConfig} />
    </div>
  </CollapsibleSection>
);
