import { FM } from '@/localization/utils/helpers';
import type { GridDropdownConfig } from '@/stores/theme/types';

import { AnimationSubsection } from './AnimationSubsection';
import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../../components/ColorPicker';
import { EditorTextInput } from '../../../components/EditorTextInput';

interface GridDropdownEditorProps {
  config: GridDropdownConfig;
  onUpdate: (updates: Partial<GridDropdownConfig>) => void;
}

const L = (key: string): string => FM(`themeSettings.components.gridDropdown.${key}`);

const GRID_DROPDOWN_PROPERTY_COUNT = 24;

export const GridDropdownEditor = ({ config, onUpdate }: GridDropdownEditorProps): JSX.Element => (
  <CollapsibleSection propertyCount={GRID_DROPDOWN_PROPERTY_COUNT} title={L('title')}>
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">{L('trigger')}</p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker label={L('triggerBackground')} value={config.triggerBackground} onChange={(v) => onUpdate({ triggerBackground: v })} />
          <ColorPicker label={L('triggerBackgroundHover')} value={config.triggerBackgroundHover} onChange={(v) => onUpdate({ triggerBackgroundHover: v })} />
          <ColorPicker label={L('triggerBorderColor')} value={config.triggerBorderColor} onChange={(v) => onUpdate({ triggerBorderColor: v })} />
          <ColorPicker label={L('triggerIconColor')} value={config.triggerIconColor} onChange={(v) => onUpdate({ triggerIconColor: v })} />
          <EditorTextInput label={L('triggerSize')} value={config.triggerSize} onChange={(v) => onUpdate({ triggerSize: v })} />
          <EditorTextInput label={L('triggerBorderRadius')} value={config.triggerBorderRadius} onChange={(v) => onUpdate({ triggerBorderRadius: v })} />
          <EditorTextInput label={L('triggerBorderWidth')} value={config.triggerBorderWidth} onChange={(v) => onUpdate({ triggerBorderWidth: v })} />
          <EditorTextInput label={L('triggerDisabledOpacity')} value={config.triggerDisabledOpacity} onChange={(v) => onUpdate({ triggerDisabledOpacity: v })} />
          <EditorTextInput label={L('triggerDisabledIconColor')} value={config.triggerDisabledIconColor} onChange={(v) => onUpdate({ triggerDisabledIconColor: v })} />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">{L('popup')}</p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker label={L('popupBackground')} value={config.popupBackground} onChange={(v) => onUpdate({ popupBackground: v })} />
          <ColorPicker label={L('popupBorderColor')} value={config.popupBorderColor} onChange={(v) => onUpdate({ popupBorderColor: v })} />
          <EditorTextInput label={L('popupBorderRadius')} value={config.popupBorderRadius} onChange={(v) => onUpdate({ popupBorderRadius: v })} />
          <EditorTextInput label={L('popupShadow')} value={config.popupShadow} onChange={(v) => onUpdate({ popupShadow: v })} />
          <EditorTextInput label={L('popupPadding')} value={config.popupPadding} onChange={(v) => onUpdate({ popupPadding: v })} />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">{L('items')}</p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker label={L('itemTextColor')} value={config.itemTextColor} onChange={(v) => onUpdate({ itemTextColor: v })} />
          <ColorPicker label={L('itemTextColorHover')} value={config.itemTextColorHover} onChange={(v) => onUpdate({ itemTextColorHover: v })} />
          <ColorPicker label={L('itemBackgroundHover')} value={config.itemBackgroundHover} onChange={(v) => onUpdate({ itemBackgroundHover: v })} />
          <EditorTextInput label={L('itemPaddingV')} value={config.itemPaddingV} onChange={(v) => onUpdate({ itemPaddingV: v })} />
          <EditorTextInput label={L('itemPaddingH')} value={config.itemPaddingH} onChange={(v) => onUpdate({ itemPaddingH: v })} />
          <EditorTextInput label={L('itemFontSize')} value={config.itemFontSize} onChange={(v) => onUpdate({ itemFontSize: v })} />
          <EditorTextInput label={L('itemBorderRadius')} value={config.itemBorderRadius} onChange={(v) => onUpdate({ itemBorderRadius: v })} />
          <ColorPicker label={L('itemDangerTextColor')} value={config.itemDangerTextColor} onChange={(v) => onUpdate({ itemDangerTextColor: v })} />
          <ColorPicker label={L('itemDangerBackgroundHover')} value={config.itemDangerBackgroundHover} onChange={(v) => onUpdate({ itemDangerBackgroundHover: v })} />
        </div>
      </div>
      <AnimationSubsection
        animationDuration={config.transitionDuration}
        showEffectSelector={false}
        onDurationChange={(duration) => onUpdate({ transitionDuration: duration })}
      />
    </div>
  </CollapsibleSection>
);
