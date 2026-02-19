/**
 * InteractiveSection demonstrates a Syncfusion Toolbar with live click tracking.
 * Clicking any button updates the "last clicked" display and a counter.
 */
import { memo, useCallback, useState } from 'react';

import { type ClickEventArgs, ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/helpers';

const INITIAL_CLICK_COUNT = 0;

export const InteractiveSection = memo((): JSX.Element => {
  const [lastClicked, setLastClicked] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(INITIAL_CLICK_COUNT);

  const handleClicked = useCallback((args: ClickEventArgs) => {
    const label = args.item.text ?? '';
    if (label !== '') {
      setLastClicked(label);
      setClickCount((prev) => prev + 1);
    }
  }, []);

  const displayLabel = lastClicked ?? FM('components.toolbarShowcase.sections.noneYet');

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.toolbarShowcase.sections.interactive')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.toolbarShowcase.sections.interactiveDesc')}
        </p>
      </div>

      <ToolbarComponent clicked={handleClicked}>
        <ItemsDirective>
          <ItemDirective prefixIcon="e-icons e-bold" text={FM('components.nativeToolbar.bold')} tooltipText={FM('components.nativeToolbar.bold')} />
          <ItemDirective prefixIcon="e-icons e-italic" text={FM('components.nativeToolbar.italic')} tooltipText={FM('components.nativeToolbar.italic')} />
          <ItemDirective prefixIcon="e-icons e-underline" text={FM('components.nativeToolbar.underline')} tooltipText={FM('components.nativeToolbar.underline')} />
          <ItemDirective type="Separator" />
          <ItemDirective prefixIcon="e-icons e-align-left" text={FM('components.toolbarShowcase.items.alignLeft')} tooltipText={FM('components.toolbarShowcase.items.alignLeft')} />
          <ItemDirective prefixIcon="e-icons e-align-center" text={FM('components.toolbarShowcase.items.alignCenter')} tooltipText={FM('components.toolbarShowcase.items.alignCenter')} />
          <ItemDirective prefixIcon="e-icons e-align-right" text={FM('components.toolbarShowcase.items.alignRight')} tooltipText={FM('components.toolbarShowcase.items.alignRight')} />
        </ItemsDirective>
      </ToolbarComponent>

      <div className="flex gap-6 rounded-md bg-surface-hover px-4 py-3 text-sm" data-testid="sf-toolbar-interactive-state">
        <span className="text-text-secondary" data-testid="sf-toolbar-last-clicked">
          {FM('components.toolbarShowcase.sections.lastClicked', displayLabel)}
        </span>
        <span className="text-text-secondary" data-testid="sf-toolbar-click-count">
          {FM('components.toolbarShowcase.sections.clickCount', String(clickCount))}
        </span>
      </div>
      <CopyableCodeSnippet code='<ToolbarComponent clicked={handleClicked}>...</ToolbarComponent>' />
    </section>
  );
});

InteractiveSection.displayName = 'InteractiveSection';
