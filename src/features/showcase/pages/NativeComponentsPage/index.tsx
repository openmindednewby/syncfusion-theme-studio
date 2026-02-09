import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

import {
  NativeButtonsSection,
  NativeInputsSection,
  NativeSelectSection,
  NativeCheckboxSection,
  NativeDatePickerSection,
  NativeDialogsSection,
} from './sections';

const NativeComponentsPage = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_COMPONENTS_PAGE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.nativeTitle')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.nativeDescription')}</p>
      </div>

      <NativeButtonsSection />
      <NativeInputsSection />
      <NativeSelectSection />
      <NativeCheckboxSection />
      <NativeDatePickerSection />
      <NativeDialogsSection />
    </div>
  </div>
);

export default NativeComponentsPage;
