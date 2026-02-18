import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

import {
  AppIconsSection,
  CustomIconsSection,
  FeatherIconsSection,
  SettingsIconsSection,
  ShowcaseIconsSection,
  UsageExamplesSection,
} from './sections';

const IconsShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.ICONS_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.iconsShowcase.title')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.iconsShowcase.description')}
        </p>
      </div>
      <UsageExamplesSection />
      <AppIconsSection />
      <ShowcaseIconsSection />
      <SettingsIconsSection />
      <FeatherIconsSection />
      <CustomIconsSection />
    </div>
  </div>
);

export default IconsShowcase;
