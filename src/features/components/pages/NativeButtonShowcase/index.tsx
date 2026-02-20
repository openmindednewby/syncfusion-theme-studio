import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import {
  CheckboxSection,
  ChipSection,
  DragHandleSection,
  DropdownSection,
  FabSection,
  IconButtonSection,
  IconsSection,
  InteractiveSection,
  LoadingSection,
  PaginationButtonSection,
  RadioSection,
  SizesSection,
  SplitButtonSection,
  StatesSection,
  ToggleSection,
  VariantsSection,
} from './sections';

const NativeButtonShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_BUTTON_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.buttonShowcase.nativeTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.buttonShowcase.nativeDescription')}
        </p>
      </div>

      <VariantsSection />
      <SizesSection />
      <StatesSection />
      <InteractiveSection />
      <LoadingSection />
      <IconsSection />
      <IconButtonSection />
      <FabSection />
      <SplitButtonSection />
      <CheckboxSection />
      <RadioSection />
      <ToggleSection />
      <ChipSection />
      <PaginationButtonSection />
      <DropdownSection />
      <DragHandleSection />
    </div>
  </div>
);

export default NativeButtonShowcase;
