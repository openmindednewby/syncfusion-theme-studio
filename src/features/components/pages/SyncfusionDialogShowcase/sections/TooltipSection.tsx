/**
 * TooltipSection - Demonstrates the Syncfusion TooltipComponent in all positions.
 */
import { memo, useEffect } from 'react';

import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/helpers';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils';

export const TooltipSection = memo((): JSX.Element => {
  useEffect(() => {
    loadSyncfusionCss(SyncfusionCssModule.Popups).catch(() => {});
  }, []);

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.dialogShowcase.sections.tooltip')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.dialogShowcase.sections.tooltipDesc')}
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        <TooltipComponent content={FM('components.tooltipTop')} position="TopCenter">
          <ButtonComponent cssClass="e-outline">{FM('components.hoverTop')}</ButtonComponent>
        </TooltipComponent>
        <TooltipComponent content={FM('components.tooltipBottom')} position="BottomCenter">
          <ButtonComponent cssClass="e-outline">{FM('components.hoverBottom')}</ButtonComponent>
        </TooltipComponent>
        <TooltipComponent content={FM('components.tooltipLeft')} position="LeftCenter">
          <ButtonComponent cssClass="e-outline">{FM('components.hoverLeft')}</ButtonComponent>
        </TooltipComponent>
        <TooltipComponent content={FM('components.tooltipRight')} position="RightCenter">
          <ButtonComponent cssClass="e-outline">{FM('components.hoverRight')}</ButtonComponent>
        </TooltipComponent>
      </div>
      <CopyableCodeSnippet code='<TooltipComponent content="Tooltip text" position="TopCenter"><ButtonComponent>Hover me</ButtonComponent></TooltipComponent>' />
    </section>
  );
});

TooltipSection.displayName = 'TooltipSection';
