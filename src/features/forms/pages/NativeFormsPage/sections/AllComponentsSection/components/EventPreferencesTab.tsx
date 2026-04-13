/**
 * EventPreferencesTab - Event preferences tab for the All Components form.
 *
 * Native components used: FormNativeSelect, FormNativeDatePicker,
 * FormCheckbox (3x), FormNativeToggle (2x), FormNativeSpinner,
 * ChipNative, TagNative, CardNative
 */

import {
  FormNativeSelect,
  FormNativeDatePicker,
  FormCheckbox,
  FormNativeToggle,
  FormNativeSpinner,
} from '@/components/ui/form-fields';
import { ChipNative, ChipVariant, TagNative, TagVariant, CardNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

import type { AllComponentsFormData } from '../../../forms/AllComponentsForm/schema';
import type { Control } from 'react-hook-form';

const MAX_GUEST_PASSES = 5;

interface Props {
  control: Control<AllComponentsFormData>;
}

export const EventPreferencesTab = ({ control }: Props): JSX.Element => {
  const eventTrackOptions = [
    { value: 'frontend', label: FM('forms.native.allComponents.preferences.frontend') },
    { value: 'backend', label: FM('forms.native.allComponents.preferences.backend') },
    { value: 'devops', label: FM('forms.native.allComponents.preferences.devops') },
    { value: 'design', label: FM('forms.native.allComponents.preferences.design') },
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Event Track Selection */}
      <CardNative testId="all-comp-card">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-medium text-text-primary">
              {FM('forms.native.allComponents.preferences.trackTitle')}
            </h4>
            <ChipNative testId="all-comp-chip" variant={ChipVariant.Primary}>
              {FM('forms.native.allComponents.preferences.newLabel')}
            </ChipNative>
          </div>

          <FormNativeSelect<AllComponentsFormData>
            fullWidth
            required
            control={control}
            label={FM('forms.native.allComponents.fields.eventTrack')}
            name="eventTrack"
            options={eventTrackOptions}
            placeholder={FM('forms.native.allComponents.fields.selectTrack')}
            testId="all-comp-event-track"
          />

          <div className="flex flex-wrap gap-2">
            {eventTrackOptions.map((opt) => (
              <TagNative key={opt.value} label={opt.label} testId={`all-comp-tag-${opt.value}`} variant={TagVariant.Default} />
            ))}
          </div>
        </div>
      </CardNative>

      {/* Preferred Date */}
      <FormNativeDatePicker<AllComponentsFormData>
        fullWidth
        required
        control={control}
        label={FM('forms.native.allComponents.fields.preferredDate')}
        name="preferredDate"
        testId="all-comp-preferred-date"
      />

      {/* Workshops (Checkboxes) */}
      <div>
        <label className="mb-2 block text-sm font-medium text-text-primary">
          {FM('forms.native.allComponents.fields.workshops')}
        </label>
        <div className="space-y-2">
          <FormCheckbox<AllComponentsFormData>
            control={control}
            label={FM('forms.native.allComponents.workshops.react')}
            name="workshops"
            testId="all-comp-workshop-react"
            value="react"
          />
          <FormCheckbox<AllComponentsFormData>
            control={control}
            label={FM('forms.native.allComponents.workshops.typescript')}
            name="workshops"
            testId="all-comp-workshop-typescript"
            value="typescript"
          />
          <FormCheckbox<AllComponentsFormData>
            control={control}
            label={FM('forms.native.allComponents.workshops.testing')}
            name="workshops"
            testId="all-comp-workshop-testing"
            value="testing"
          />
        </div>
      </div>

      {/* Toggles */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex items-center justify-between rounded-md border border-border p-3">
          <span className="text-sm text-text-primary">
            {FM('forms.native.allComponents.fields.attendDinner')}
          </span>
          <FormNativeToggle<AllComponentsFormData>
            control={control}
            name="attendDinner"
            testId="all-comp-attend-dinner"
          />
        </div>
        <div className="flex items-center justify-between rounded-md border border-border p-3">
          <span className="text-sm text-text-primary">
            {FM('forms.native.allComponents.fields.receiveUpdates')}
          </span>
          <FormNativeToggle<AllComponentsFormData>
            control={control}
            name="receiveUpdates"
            testId="all-comp-receive-updates"
          />
        </div>
      </div>

      {/* Guest Passes Spinner */}
      <FormNativeSpinner<AllComponentsFormData>
        control={control}
        label={FM('forms.native.allComponents.fields.guestPasses')}
        max={MAX_GUEST_PASSES}
        min={0}
        name="guestPasses"
        testId="all-comp-guest-passes"
      />
    </div>
  );
};
