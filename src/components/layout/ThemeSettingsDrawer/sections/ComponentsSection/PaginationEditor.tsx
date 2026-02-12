import { FM } from '@/localization/helpers';
import type { PaginationConfig } from '@/stores/theme/types/paginationTypes';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';
import { TextInputRow } from '../../TextInputRow';

interface PaginationEditorProps {
  config: PaginationConfig;
  onUpdate: (updates: Partial<PaginationConfig>) => void;
}

const PAGINATION_PROPERTY_COUNT = 16;

const ContainerFields = ({ config, onUpdate }: PaginationEditorProps): JSX.Element => (
  <>
    <p className="text-xs font-medium text-text-secondary">
      {FM('themeSettings.components.pagination.containerSection')}
    </p>
    <ColorPicker
      label={FM('themeSettings.components.pagination.background')}
      value={config.background}
      onChange={(value) => onUpdate({ background: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.pagination.borderColor')}
      value={config.borderColor}
      onChange={(value) => onUpdate({ borderColor: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.pagination.textColor')}
      value={config.textColor}
      onChange={(value) => onUpdate({ textColor: value })}
    />
  </>
);

const ButtonFields = ({ config, onUpdate }: PaginationEditorProps): JSX.Element => (
  <>
    <p className="text-xs font-medium text-text-secondary">
      {FM('themeSettings.components.pagination.buttonsSection')}
    </p>
    <ColorPicker
      label={FM('themeSettings.components.pagination.buttonBackground')}
      value={config.buttonBackground}
      onChange={(value) => onUpdate({ buttonBackground: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.pagination.buttonTextColor')}
      value={config.buttonTextColor}
      onChange={(value) => onUpdate({ buttonTextColor: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.pagination.buttonHoverBackground')}
      value={config.buttonHoverBackground}
      onChange={(value) => onUpdate({ buttonHoverBackground: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.pagination.buttonHoverTextColor')}
      value={config.buttonHoverTextColor}
      onChange={(value) => onUpdate({ buttonHoverTextColor: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.pagination.buttonActiveBackground')}
      value={config.buttonActiveBackground}
      onChange={(value) => onUpdate({ buttonActiveBackground: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.pagination.buttonActiveTextColor')}
      value={config.buttonActiveTextColor}
      onChange={(value) => onUpdate({ buttonActiveTextColor: value })}
    />
    <TextInputRow
      label={FM('themeSettings.components.pagination.buttonBorderRadius')}
      value={config.buttonBorderRadius}
      onChange={(value) => onUpdate({ buttonBorderRadius: value })}
    />
  </>
);

const NavigationFields = ({ config, onUpdate }: PaginationEditorProps): JSX.Element => (
  <>
    <p className="text-xs font-medium text-text-secondary">
      {FM('themeSettings.components.pagination.navigationSection')}
    </p>
    <ColorPicker
      label={FM('themeSettings.components.pagination.navTextColor')}
      value={config.navTextColor}
      onChange={(value) => onUpdate({ navTextColor: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.pagination.navDisabledColor')}
      value={config.navDisabledColor}
      onChange={(value) => onUpdate({ navDisabledColor: value })}
    />
  </>
);

const SelectFields = ({ config, onUpdate }: PaginationEditorProps): JSX.Element => (
  <>
    <p className="text-xs font-medium text-text-secondary">
      {FM('themeSettings.components.pagination.selectSection')}
    </p>
    <ColorPicker
      label={FM('themeSettings.components.pagination.selectBackground')}
      value={config.selectBackground}
      onChange={(value) => onUpdate({ selectBackground: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.pagination.selectBorderColor')}
      value={config.selectBorderColor}
      onChange={(value) => onUpdate({ selectBorderColor: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.pagination.selectTextColor')}
      value={config.selectTextColor}
      onChange={(value) => onUpdate({ selectTextColor: value })}
    />
  </>
);

const InfoFields = ({ config, onUpdate }: PaginationEditorProps): JSX.Element => (
  <>
    <p className="text-xs font-medium text-text-secondary">
      {FM('themeSettings.components.pagination.infoSection')}
    </p>
    <ColorPicker
      label={FM('themeSettings.components.pagination.infoTextColor')}
      value={config.infoTextColor}
      onChange={(value) => onUpdate({ infoTextColor: value })}
    />
  </>
);

export const PaginationEditor = ({ config, onUpdate }: PaginationEditorProps): JSX.Element => (
  <CollapsibleSection
    propertyCount={PAGINATION_PROPERTY_COUNT}
    title={FM('themeSettings.components.pagination.title')}
  >
    <div className="space-y-4">
      <div className="space-y-2">
        <ContainerFields config={config} onUpdate={onUpdate} />
      </div>
      <div className="space-y-2">
        <ButtonFields config={config} onUpdate={onUpdate} />
      </div>
      <div className="space-y-2">
        <NavigationFields config={config} onUpdate={onUpdate} />
      </div>
      <div className="space-y-2">
        <SelectFields config={config} onUpdate={onUpdate} />
      </div>
      <div className="space-y-2">
        <InfoFields config={config} onUpdate={onUpdate} />
      </div>
    </div>
  </CollapsibleSection>
);
