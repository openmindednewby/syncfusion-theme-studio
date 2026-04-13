/**
 * InputSpecSection - Visual specs matching each design input section.
 * Shows text input, search, spinner, and textarea for both light and dark.
 */
import { memo } from 'react';

import { FM } from '@/localization/utils/helpers';
import { Mode } from '@/stores/mode';

import {
  SpecSearchInput,
  SpecSpinnerInput,
  SpecTextInput,
} from './InputSpecParts';
import { SpecTextarea } from './InputSpecVariants';
import { SpinnerInputSpec } from './SpinnerInputSpec';

export const InputSpecSection = memo((): JSX.Element => (
  <section className="card space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.inputShowcase.sections.designSpec')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.inputShowcase.sections.designSpecDesc')}
      </p>
    </div>

    {/* Text Input - matches Figma "Input" */}
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-text-primary">
        {FM('components.inputShowcase.spec.textInput')}
      </h4>
      <div className="flex flex-wrap gap-6">
        <div className="space-y-1">
          <span className="text-xs text-text-secondary">
            {FM('components.inputShowcase.spec.lightMode')}
          </span>
          <SpecTextInput placeholder={FM('components.inputs.dropDownListPlaceholder')} variant={Mode.Light} />
        </div>
        <div className="space-y-1">
          <span className="text-xs text-text-secondary">
            {FM('components.inputShowcase.spec.darkMode')}
          </span>
          <SpecTextInput placeholder={FM('components.inputs.dropDownListPlaceholder')} variant={Mode.Dark} />
        </div>
      </div>
    </div>

    {/* Text Input with Clear - matches Figma input with X button */}
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-text-primary">
        {FM('components.inputShowcase.spec.clearableInput')}
      </h4>
      <div className="flex flex-wrap gap-6">
        <div className="space-y-1">
          <span className="text-xs text-text-secondary">
            {FM('components.inputShowcase.spec.lightMode')}
          </span>
          <SpecTextInput showClear value={FM('components.inputs.typedTextValue')} variant={Mode.Light} />
        </div>
        <div className="space-y-1">
          <span className="text-xs text-text-secondary">
            {FM('components.inputShowcase.spec.darkMode')}
          </span>
          <SpecTextInput showClear value={FM('components.inputs.typedTextValue')} variant={Mode.Dark} />
        </div>
      </div>
    </div>

    {/* Search Input - matches Figma search variant */}
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-text-primary">
        {FM('components.inputShowcase.spec.searchInput')}
      </h4>
      <div className="flex flex-wrap gap-6">
        <div className="space-y-1">
          <span className="text-xs text-text-secondary">
            {FM('components.inputShowcase.spec.lightMode')}
          </span>
          <SpecSearchInput variant={Mode.Light} />
        </div>
        <div className="space-y-1">
          <span className="text-xs text-text-secondary">
            {FM('components.inputShowcase.spec.darkMode')}
          </span>
          <SpecSearchInput variant={Mode.Dark} />
        </div>
      </div>
    </div>

    {/* Spinner Input - matches Figma numeric spinner */}
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-text-primary">
        {FM('components.inputShowcase.spec.spinnerInput')}
      </h4>
      <div className="flex flex-wrap gap-6">
        <div className="space-y-1">
          <span className="text-xs text-text-secondary">
            {FM('components.inputShowcase.spec.lightMode')}
          </span>
          <SpecSpinnerInput variant={Mode.Light} />
        </div>
        <div className="space-y-1">
          <span className="text-xs text-text-secondary">
            {FM('components.inputShowcase.spec.darkMode')}
          </span>
          <SpecSpinnerInput variant={Mode.Dark} />
        </div>
      </div>
    </div>

    {/* Horizontal Spinner - matches Figma spinner2 variant */}
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-text-primary">
        {FM('components.inputShowcase.spec.spinner2Input')}
      </h4>
      <div className="flex flex-wrap gap-6">
        <div className="space-y-1">
          <span className="text-xs text-text-secondary">
            {FM('components.inputShowcase.spec.lightMode')}
          </span>
          <SpinnerInputSpec variant={Mode.Light} />
        </div>
        <div className="space-y-1">
          <span className="text-xs text-text-secondary">
            {FM('components.inputShowcase.spec.darkMode')}
          </span>
          <SpinnerInputSpec variant={Mode.Dark} />
        </div>
      </div>
    </div>

    {/* Textarea - matches Figma multiline input */}
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-text-primary">
        {FM('components.inputShowcase.spec.textarea')}
      </h4>
      <div className="flex flex-wrap gap-6">
        <div className="space-y-1">
          <span className="text-xs text-text-secondary">
            {FM('components.inputShowcase.spec.lightMode')}
          </span>
          <SpecTextarea variant={Mode.Light} />
        </div>
        <div className="space-y-1">
          <span className="text-xs text-text-secondary">
            {FM('components.inputShowcase.spec.darkMode')}
          </span>
          <SpecTextarea variant={Mode.Dark} />
        </div>
      </div>
    </div>
  </section>
));

InputSpecSection.displayName = 'InputSpecSection';
