// Grid dropdown CSS variable injection utilities

import { isValueDefined } from '@/utils/is';

import type { ComponentConfigSingle } from '../types';

export function injectGridDropdownVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  if (!isValueDefined(c.gridDropdown)) return;
  const d = c.gridDropdown;
  const p = '--component-grid-dropdown';

  root.style.setProperty(`${p}-trigger-bg`, `rgb(${d.triggerBackground})`);
  root.style.setProperty(`${p}-trigger-bg-hover`, `rgb(${d.triggerBackgroundHover})`);
  root.style.setProperty(`${p}-trigger-border`, `rgb(${d.triggerBorderColor})`);
  root.style.setProperty(`${p}-trigger-icon`, `rgb(${d.triggerIconColor})`);
  root.style.setProperty(`${p}-trigger-size`, d.triggerSize);
  root.style.setProperty(`${p}-trigger-radius`, d.triggerBorderRadius);
  root.style.setProperty(`${p}-trigger-border-width`, d.triggerBorderWidth);
  root.style.setProperty(`${p}-trigger-disabled-opacity`, d.triggerDisabledOpacity);
  root.style.setProperty(`${p}-trigger-disabled-icon`, `rgb(${d.triggerDisabledIconColor})`);
  root.style.setProperty(`${p}-popup-bg`, `rgb(${d.popupBackground})`);
  root.style.setProperty(`${p}-popup-border`, `rgb(${d.popupBorderColor})`);
  root.style.setProperty(`${p}-popup-radius`, d.popupBorderRadius);
  root.style.setProperty(`${p}-popup-shadow`, d.popupShadow);
  root.style.setProperty(`${p}-popup-padding`, d.popupPadding);
  root.style.setProperty(`${p}-item-text`, `rgb(${d.itemTextColor})`);
  root.style.setProperty(`${p}-item-text-hover`, `rgb(${d.itemTextColorHover})`);
  root.style.setProperty(`${p}-item-bg-hover`, `rgb(${d.itemBackgroundHover})`);
  root.style.setProperty(`${p}-item-padding-v`, d.itemPaddingV);
  root.style.setProperty(`${p}-item-padding-h`, d.itemPaddingH);
  root.style.setProperty(`${p}-item-font-size`, d.itemFontSize);
  root.style.setProperty(`${p}-item-radius`, d.itemBorderRadius);
  root.style.setProperty(`${p}-item-danger-text`, `rgb(${d.itemDangerTextColor})`);
  root.style.setProperty(`${p}-item-danger-bg-hover`, `rgb(${d.itemDangerBackgroundHover})`);
  root.style.setProperty(`${p}-transition`, d.transitionDuration);
}
