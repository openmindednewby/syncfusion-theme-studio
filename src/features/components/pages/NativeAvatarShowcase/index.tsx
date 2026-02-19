import { CopyableCodeSnippet } from '@/components/common';
import { AvatarNative, AvatarSize } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const NativeAvatarShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_AVATAR_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.avatarShowcase.nativeTitle')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.avatarShowcase.nativeDescription')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.sizes')}</h3>
        <div className="flex items-end gap-3">
          <AvatarNative initials="XS" size={AvatarSize.Xs} testId="avatar-xs" />
          <AvatarNative initials="SM" size={AvatarSize.Sm} testId="avatar-sm" />
          <AvatarNative initials="MD" size={AvatarSize.Md} testId="avatar-md" />
          <AvatarNative initials="LG" size={AvatarSize.Lg} testId="avatar-lg" />
          <AvatarNative initials="XL" size={AvatarSize.Xl} testId="avatar-xl" />
        </div>
        <CopyableCodeSnippet code='<AvatarNative initials="MD" size={AvatarSize.Md} />' />
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.withStatus')}</h3>
        <div className="flex gap-3">
          <AvatarNative showStatus initials="JD" testId="avatar-status-1" />
          <AvatarNative showStatus initials="AB" testId="avatar-status-2" />
          <AvatarNative showStatus testId="avatar-fallback" />
        </div>
        <CopyableCodeSnippet code='<AvatarNative showStatus initials="JD" />' />
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.avatarGroup')}</h3>
        <div className="flex -space-x-2">
          <AvatarNative initials="A" testId="avatar-group-1" />
          <AvatarNative initials="B" testId="avatar-group-2" />
          <AvatarNative initials="C" testId="avatar-group-3" />
          <AvatarNative initials="+3" testId="avatar-group-more" />
        </div>
        <CopyableCodeSnippet code={'<div className="flex -space-x-2">\n  <AvatarNative initials="A" />\n  <AvatarNative initials="B" />\n  <AvatarNative initials="+3" />\n</div>'} />
      </section>
    </div>
  </div>
);

export default NativeAvatarShowcase;
