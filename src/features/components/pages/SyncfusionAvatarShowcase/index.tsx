import SyncfusionAvatar, { AvatarSize } from '@/components/ui/syncfusion/Avatar';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const SyncfusionAvatarShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_AVATAR_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.avatarShowcase.syncfusionTitle')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.avatarShowcase.syncfusionDescription')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Sizes</h3>
        <div className="flex items-end gap-3">
          <SyncfusionAvatar initials="XS" size={AvatarSize.Xs} testId="sf-avatar-xs" />
          <SyncfusionAvatar initials="SM" size={AvatarSize.Sm} testId="sf-avatar-sm" />
          <SyncfusionAvatar initials="MD" size={AvatarSize.Md} testId="sf-avatar-md" />
          <SyncfusionAvatar initials="LG" size={AvatarSize.Lg} testId="sf-avatar-lg" />
          <SyncfusionAvatar initials="XL" size={AvatarSize.Xl} testId="sf-avatar-xl" />
        </div>
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Fallback</h3>
        <div className="flex gap-3">
          <SyncfusionAvatar initials="JD" testId="sf-avatar-initials" />
          <SyncfusionAvatar testId="sf-avatar-fallback" />
        </div>
      </section>
    </div>
  </div>
);

export default SyncfusionAvatarShowcase;
