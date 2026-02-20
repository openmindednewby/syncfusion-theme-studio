/**
 * SplitButtonSection - Demonstrates SplitButtonNative with dropdown items.
 */
import { memo, useCallback } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { SplitButtonNative } from '@/components/ui/native';
import type { SplitButtonItem } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

export const SplitButtonSection = memo((): JSX.Element => {
  const sampleItems: SplitButtonItem[] = [
    { id: 'save', text: FM('components.buttonShowcase.splitButtonSave') },
    { id: 'save-as', text: FM('components.buttonShowcase.splitButtonSaveAs') },
    { id: 'export', text: FM('components.buttonShowcase.splitButtonExport') },
  ];

  const disabledItems: SplitButtonItem[] = [
    { id: 'option-a', text: FM('components.buttonShowcase.splitButtonOptionA') },
    { id: 'option-b', text: FM('components.buttonShowcase.splitButtonOptionB'), disabled: true },
    { id: 'option-c', text: FM('components.buttonShowcase.splitButtonOptionC') },
  ];
  const handleItemClick = useCallback((_item: SplitButtonItem) => {
    // No-op for showcase
  }, []);

  const handlePrimaryClick = useCallback(() => {
    // No-op for showcase
  }, []);

  return (
    <section className="card space-y-4" data-testid={TestIds.NATIVE_SPLIT_BUTTON_SECTION}>
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.buttonShowcase.sections.splitButton')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.buttonShowcase.sections.splitButtonDesc')}
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        <SplitButtonNative
          items={sampleItems}
          testId="split-btn-showcase-default"
          onClick={handlePrimaryClick}
          onItemClick={handleItemClick}
        >
          {FM('components.buttonShowcase.splitButtonSave')}
        </SplitButtonNative>
        <SplitButtonNative
          disabled
          items={disabledItems}
          testId="split-btn-showcase-disabled"
          onClick={handlePrimaryClick}
          onItemClick={handleItemClick}
        >
          {FM('components.buttons.disabled')}
        </SplitButtonNative>
      </div>
      <CopyableCodeSnippet code="<SplitButtonNative items={items} onClick={handleClick} onItemClick={handleItemClick}>Save</SplitButtonNative>" />
    </section>
  );
});

SplitButtonSection.displayName = 'SplitButtonSection';
