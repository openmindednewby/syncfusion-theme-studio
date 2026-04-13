/**
 * AllComponentsSection - Comprehensive form showcasing all 38 native components.
 *
 * Wraps the AllComponentsForm with supporting UI: breadcrumb, toolbar,
 * timeline, progress bar, and submit dialog.
 *
 * Native components used here: BreadcrumbNative, ToastNative (via hook)
 */
import { useState, useCallback } from 'react';

import { BreadcrumbNative, FormCompletionProgress, ToastSeverity } from '@/components/ui/native';
import { useToast } from '@/components/ui/native/ToastNative';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

import { DietaryTab } from './components/DietaryTab';
import { DocumentsTab } from './components/DocumentsTab';
import { EventPreferencesTab } from './components/EventPreferencesTab';
import { FormToolbar } from './components/FormToolbar';
import { PersonalInfoTab } from './components/PersonalInfoTab';
import { RegistrationTimeline } from './components/RegistrationTimeline';
import { SubmitDialog } from './components/SubmitDialog';
import { useFormCompletion } from './hooks/useFormCompletion';
import { FormSection } from '../../../SyncfusionFormsPage/components/FormSection';
import { AllComponentsForm } from '../../forms/AllComponentsForm';

import type { AllComponentsFormData } from '../../forms/AllComponentsForm/schema';
import type { Control } from 'react-hook-form';

/** Inner component that uses FormProvider context for completion tracking */
const FormContent = (): JSX.Element => {
  const progress = useFormCompletion();
  return (
    <FormCompletionProgress
      label={FM('forms.native.allComponents.progress.title')}
      progress={progress}
      testId="all-comp-progress"
    />
  );
};

export const AllComponentsSection = (): JSX.Element => {
  const breadcrumbItems = [
    { text: FM('forms.native.allComponents.breadcrumb.forms'), url: '/dashboard/forms' },
    { text: FM('forms.native.allComponents.breadcrumb.native'), url: '/dashboard/forms/native' },
    { text: FM('forms.native.allComponents.breadcrumb.allComponents') },
  ];
  const [showDialog, setShowDialog] = useState(false);
  const [pendingData, setPendingData] = useState<AllComponentsFormData | null>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback((data: AllComponentsFormData) => {
    setPendingData(data);
    setShowDialog(true);
  }, []);

  const handleConfirm = useCallback(() => {
    setShowDialog(false);
    if (isValueDefined(pendingData))
      addToast({
        severity: ToastSeverity.Success,
        title: FM('forms.native.allComponents.toast.successTitle'),
        message: FM('forms.native.allComponents.toast.success'),
      });

    setPendingData(null);
  }, [pendingData, addToast]);

  const handleDialogClose = useCallback(() => {
    setShowDialog(false);
    setPendingData(null);
  }, []);

  const handleReset = useCallback(() => {
    addToast({
      severity: ToastSeverity.Info,
      title: FM('forms.native.allComponents.toast.resetTitle'),
      message: FM('forms.native.allComponents.toast.reset'),
    });
  }, [addToast]);

  const renderPersonalTab = useCallback(
    (control: Control<AllComponentsFormData>) => (
      <PersonalInfoTab control={control} />
    ),
    [],
  );

  const renderPreferencesTab = useCallback(
    (control: Control<AllComponentsFormData>) => (
      <EventPreferencesTab control={control} />
    ),
    [],
  );

  const renderDietaryTab = useCallback(
    (control: Control<AllComponentsFormData>) => (
      <DietaryTab control={control} />
    ),
    [],
  );

  const renderDocumentsTab = useCallback(
    (control: Control<AllComponentsFormData>, isSubmitting: boolean) => (
      <DocumentsTab control={control} isSubmitting={isSubmitting} />
    ),
    [],
  );

  return (
    <div className="space-y-6">
      <BreadcrumbNative items={breadcrumbItems} testId="all-comp-breadcrumb" />

      <FormSection
        description={FM('forms.native.allComponents.description')}
        title={FM('forms.native.allComponents.title')}
      >
        <FormToolbar onReset={handleReset} />

        <div className="mt-4">
          <AllComponentsForm
            dietaryTab={renderDietaryTab}
            documentsTab={renderDocumentsTab}
            personalTab={renderPersonalTab}
            preferencesTab={renderPreferencesTab}
            sideContent={
              <div className="space-y-4">
                <RegistrationTimeline />
                <FormContent />
              </div>
            }
            onSubmit={handleSubmit}
          />
        </div>
      </FormSection>

      <SubmitDialog
        isOpen={showDialog}
        onClose={handleDialogClose}
        onConfirm={handleConfirm}
      />
    </div>
  );
};
