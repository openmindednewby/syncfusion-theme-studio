import { memo } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import type { DiagramTemplate } from '../../../types';

interface TemplatePickerProps {
  readonly templates: DiagramTemplate[];
  readonly activeTemplateId: string;
  readonly onLoadTemplate: (templateId: string) => void;
}

const CARD_BASE = 'w-full rounded-lg border p-3 text-left text-sm transition-colors';
const CARD_ACTIVE = `${CARD_BASE} border-primary bg-primary/10 text-primary`;
const CARD_INACTIVE = `${CARD_BASE} border-border bg-surface hover:bg-surface-hover text-text-secondary`;

/** Renders template cards for loading pre-built diagram templates. */
export const TemplatePicker = memo(
  ({ templates, activeTemplateId, onLoadTemplate }: TemplatePickerProps): JSX.Element => (
    <div
      className="flex flex-col gap-2"
      data-testid={TestIds.DIAGRAM_TEMPLATE_PICKER}
    >
      <h2 className="text-sm font-semibold text-text-primary">
        {FM('diagram.templates.title')}
      </h2>
      {templates.map((template) => (
        <button
          key={template.id}
          className={template.id === activeTemplateId ? CARD_ACTIVE : CARD_INACTIVE}
          data-testid={TestIds.DIAGRAM_TEMPLATE_CARD}
          type="button"
          onClick={() => onLoadTemplate(template.id)}
        >
          <span className="font-medium">{FM(template.labelKey)}</span>
          <span className="mt-0.5 block text-xs opacity-75">
            {FM(template.descriptionKey)}
          </span>
        </button>
      ))}
    </div>
  ),
);

TemplatePicker.displayName = 'TemplatePicker';
