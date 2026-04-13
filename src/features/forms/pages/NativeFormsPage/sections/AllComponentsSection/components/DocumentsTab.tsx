/**
 * DocumentsTab - Documents & final tab for the All Components form.
 *
 * Native components used: FormNativeFile, FormNativeSelect,
 * FormNativeInput, FormNativeToggle, AlertNative,
 * SplitButtonNative, FabNative
 */

import {
  FormNativeInput,
  FormNativeToggle,
  FormNativeFile,
} from '@/components/ui/form-fields';
import {
  AlertNative,
  AlertSeverity,
  SplitButtonNative,
  FabNative,
  FabPosition,
  ButtonNative,
  ButtonVariant,
} from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

import type { AllComponentsFormData } from '../../../forms/AllComponentsForm/schema';
import type { Control } from 'react-hook-form';

const SCROLL_UP_ARROW = '\u2191';
const SCROLL_UP_ICON = <span>{SCROLL_UP_ARROW}</span>;

interface Props {
  control: Control<AllComponentsFormData>;
  isSubmitting: boolean;
}

export const DocumentsTab = ({ control, isSubmitting }: Props): JSX.Element => {
  const splitButtonItems = [
    { id: 'submit-continue', text: FM('forms.native.allComponents.documents.submitContinue') },
    { id: 'submit-exit', text: FM('forms.native.allComponents.documents.submitExit') },
    { id: 'save-draft', text: FM('forms.native.allComponents.documents.saveDraft') },
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Alert */}
      <AlertNative severity={AlertSeverity.Info} testId="all-comp-alert">
        {FM('forms.native.allComponents.documents.uploadInfo')}
      </AlertNative>

      {/* File Upload */}
      <FormNativeFile<AllComponentsFormData>
        accept=".pdf,.doc,.docx,.jpg,.png"
        control={control}
        label={FM('forms.native.allComponents.fields.documents')}
        name="promoCode"
        testId="all-comp-file-upload"
      />

      {/* Promo Code */}
      <FormNativeInput<AllComponentsFormData>
        fullWidth
        control={control}
        label={FM('forms.native.allComponents.fields.promoCode')}
        name="promoCode"
        placeholder={FM('forms.native.allComponents.fields.promoCodePlaceholder')}
        testId="all-comp-promo-code"
      />

      {/* Terms Toggle */}
      <div className="flex items-center justify-between rounded-md border border-border p-4">
        <div>
          <span className="text-sm font-medium text-text-primary">
            {FM('forms.native.allComponents.fields.agreeToTerms')}
          </span>
          <p className="text-xs text-text-muted">
            {FM('forms.native.allComponents.documents.termsDescription')}
          </p>
        </div>
        <FormNativeToggle<AllComponentsFormData>
          control={control}
          name="agreeToTerms"
          testId="all-comp-agree-terms"
        />
      </div>

      {/* Submit Actions */}
      <div className="flex items-center justify-between pt-4">
        <SplitButtonNative
          items={splitButtonItems}
          testId="all-comp-split-button"
          onClick={() => undefined}
        >
          {FM('forms.native.allComponents.documents.submitOptions')}
        </SplitButtonNative>

        <ButtonNative
          disabled={isSubmitting}
          testId="all-comp-submit"
          type="submit"
          variant={ButtonVariant.Primary}
        >
          {isSubmitting
            ? FM('common.loading')
            : FM('forms.native.allComponents.documents.register')}
        </ButtonNative>
      </div>

      {/* Floating Action Button */}
      <FabNative
        ariaLabel={FM('forms.native.allComponents.documents.scrollToTop')}
        icon={SCROLL_UP_ICON}
        position={FabPosition.BottomRight}
        testId="all-comp-fab"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    </div>
  );
};
