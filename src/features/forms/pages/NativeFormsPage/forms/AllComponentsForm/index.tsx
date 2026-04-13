/**
 * All Components Form - Event Registration using all 38 native components
 *
 * Multi-tab form demonstrating every native UI component in the library.
 * Uses TabsNative for navigation between form sections.
 */
import { useState, useCallback, type ReactNode } from 'react';

import { FormProvider, type Control } from 'react-hook-form';

import type { TabItem } from '@/components/ui/native';
import { TabsNative } from '@/components/ui/native';
import { useFormWithSchema } from '@/lib/forms';
import { FM } from '@/localization/utils/helpers';

import { allComponentsSchema, defaultAllComponentsValues, type AllComponentsFormData } from './schema';

const FORM_CONFIG = {
  schema: allComponentsSchema,
  defaultValues: defaultAllComponentsValues,
};

const TAB_PERSONAL = 'personal';
const TAB_PREFERENCES = 'preferences';
const TAB_DIETARY = 'dietary';
const TAB_DOCUMENTS = 'documents';

interface Props {
  onSubmit: (data: AllComponentsFormData) => void;
  personalTab: (control: Control<AllComponentsFormData>) => JSX.Element;
  preferencesTab: (control: Control<AllComponentsFormData>) => JSX.Element;
  dietaryTab: (control: Control<AllComponentsFormData>) => JSX.Element;
  documentsTab: (control: Control<AllComponentsFormData>, isSubmitting: boolean) => JSX.Element;
  /** Content rendered inside FormProvider (has access to form context) */
  sideContent?: ReactNode;
}

export const AllComponentsForm = ({
  onSubmit,
  personalTab,
  preferencesTab,
  dietaryTab,
  documentsTab,
  sideContent,
}: Props): JSX.Element => {
  const form = useFormWithSchema(FORM_CONFIG);
  const { handleSubmit, control, formState } = form;
  const [activeTab, setActiveTab] = useState(TAB_PERSONAL);

  const handleFormSubmit = useCallback(
    (data: AllComponentsFormData) => {
      onSubmit(data);
    },
    [onSubmit],
  );

  const tabItems: TabItem[] = [
    {
      id: TAB_PERSONAL,
      label: FM('forms.native.allComponents.tabs.personal'),
      content: personalTab(control),
    },
    {
      id: TAB_PREFERENCES,
      label: FM('forms.native.allComponents.tabs.preferences'),
      content: preferencesTab(control),
    },
    {
      id: TAB_DIETARY,
      label: FM('forms.native.allComponents.tabs.dietary'),
      content: dietaryTab(control),
    },
    {
      id: TAB_DOCUMENTS,
      label: FM('forms.native.allComponents.tabs.documents'),
      content: documentsTab(control, formState.isSubmitting),
    },
  ];

  return (
    <FormProvider {...form}>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <TabsNative
              defaultActiveId={activeTab}
              items={tabItems}
              testId="all-components-tabs"
              onChange={setActiveTab}
            />
          </form>
        </div>
        {sideContent}
      </div>
    </FormProvider>
  );
};
