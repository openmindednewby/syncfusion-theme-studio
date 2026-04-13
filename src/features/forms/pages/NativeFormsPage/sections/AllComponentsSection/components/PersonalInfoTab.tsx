/**
 * PersonalInfoTab - Personal information tab for the All Components form.
 *
 * Native components used: FormNativeInput (4x), FormNativeTextarea,
 * FormNativeRadio (4x), AvatarNative, TooltipNative, BadgeNative,
 * HeadingNative, TextNative, InputMessageNative
 */

import {
  FormNativeInput,
  FormNativeTextarea,
  FormNativeRadio,
} from '@/components/ui/form-fields';
import {
  AvatarNative,
  TooltipNative,
  BadgeNative,
  BadgeNativeVariant,
  HeadingNative,
  HeadingLevel,
  TextNative,
  TextVariant,
  InputMessageNative,
  InputMessageStatus,
} from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

import type { AllComponentsFormData } from '../../../forms/AllComponentsForm/schema';
import type { Control } from 'react-hook-form';

interface Props {
  control: Control<AllComponentsFormData>;
}

export const PersonalInfoTab = ({ control }: Props): JSX.Element => (
  <div className="space-y-6 p-4">
    {/* Header with Avatar and Badge */}
    <div className="flex items-center gap-4">
      <AvatarNative initials="ER" testId="all-comp-avatar" />
      <div>
        <div className="flex items-center gap-2">
          <HeadingNative level={HeadingLevel.H3} testId="all-comp-heading">
            {FM('forms.native.allComponents.personalInfo.heading')}
          </HeadingNative>
          <BadgeNative testId="all-comp-badge" variant={BadgeNativeVariant.Info}>
            {FM('forms.native.allComponents.personalInfo.required')}
          </BadgeNative>
        </div>
        <TextNative testId="all-comp-text" variant={TextVariant.Secondary}>
          {FM('forms.native.allComponents.personalInfo.description')}
        </TextNative>
      </div>
    </div>

    {/* Title (Radio Group) */}
    <div>
      <label className="mb-2 block text-sm font-medium text-text-primary">
        {FM('forms.native.allComponents.fields.title')}
      </label>
      <div className="flex flex-wrap gap-4">
        <FormNativeRadio<AllComponentsFormData>
          control={control}
          label={FM('forms.native.allComponents.titles.mr')}
          name="title"
          radioValue="mr"
          testId="all-comp-title-mr"
        />
        <FormNativeRadio<AllComponentsFormData>
          control={control}
          label={FM('forms.native.allComponents.titles.mrs')}
          name="title"
          radioValue="mrs"
          testId="all-comp-title-mrs"
        />
        <FormNativeRadio<AllComponentsFormData>
          control={control}
          label={FM('forms.native.allComponents.titles.ms')}
          name="title"
          radioValue="ms"
          testId="all-comp-title-ms"
        />
        <FormNativeRadio<AllComponentsFormData>
          control={control}
          label={FM('forms.native.allComponents.titles.dr')}
          name="title"
          radioValue="dr"
          testId="all-comp-title-dr"
        />
      </div>
    </div>

    {/* Name Fields */}
    <div className="grid gap-4 md:grid-cols-2">
      <FormNativeInput<AllComponentsFormData>
        fullWidth
        required
        control={control}
        label={FM('forms.user.firstName')}
        name="firstName"
        placeholder={FM('forms.user.firstNamePlaceholder')}
        testId="all-comp-first-name"
      />
      <FormNativeInput<AllComponentsFormData>
        fullWidth
        required
        control={control}
        label={FM('forms.user.lastName')}
        name="lastName"
        placeholder={FM('forms.user.lastNamePlaceholder')}
        testId="all-comp-last-name"
      />
    </div>

    {/* Email with Tooltip */}
    <div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-text-primary">
          {FM('forms.fields.email')}
        </span>
        <TooltipNative
          content={FM('forms.native.allComponents.personalInfo.emailTooltip')}
          testId="all-comp-email-tooltip"
        >
          <span className="cursor-help text-text-muted">?</span>
        </TooltipNative>
      </div>
      <FormNativeInput<AllComponentsFormData>
        fullWidth
        required
        aria-label={FM('forms.fields.email')}
        control={control}
        name="email"
        placeholder={FM('forms.user.emailPlaceholder')}
        testId="all-comp-email"
        type="email"
      />
    </div>

    {/* Phone */}
    <FormNativeInput<AllComponentsFormData>
      fullWidth
      required
      control={control}
      label={FM('forms.user.phone')}
      name="phone"
      placeholder={FM('forms.user.phonePlaceholder')}
      testId="all-comp-phone"
      type="tel"
    />

    {/* Bio */}
    <FormNativeTextarea<AllComponentsFormData>
      fullWidth
      control={control}
      label={FM('forms.native.allComponents.fields.bio')}
      name="bio"
      placeholder={FM('forms.native.allComponents.fields.bioPlaceholder')}
      rows={3}
      testId="all-comp-bio"
    />

    {/* Info Message */}
    <InputMessageNative
      message={FM('forms.native.allComponents.personalInfo.infoMessage')}
      status={InputMessageStatus.Valid}
      testId="all-comp-info-message"
    />
  </div>
);
