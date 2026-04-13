import { CopyableCodeSnippet } from '@/components/common';
import { CardNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const NativeCardShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_CARD_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.cardShowcase.nativeTitle')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.cardShowcase.nativeDescription')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.basicCard')}</h3>
        <div className="max-w-md">
          <CardNative testId="card-basic">
            <p>{FM('showcase.content.basicCardDescription')}</p>
          </CardNative>
        </div>
        <CopyableCodeSnippet code={'<CardNative>\n  <p>Basic card content</p>\n</CardNative>'} />
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.withHeaderFooter')}</h3>
        <div className="max-w-md">
          <CardNative
            footer={<span className="text-sm">{FM('showcase.content.lastUpdatedJustNow')}</span>}
            header={<h4 className="font-semibold">{FM('showcase.content.cardTitle')}</h4>}
            testId="card-header-footer"
          >
            <p>{FM('showcase.content.cardBodyWithHeaderFooter')}</p>
          </CardNative>
        </div>
        <CopyableCodeSnippet code={'<CardNative\n  header={<h4>Card Title</h4>}\n  footer={<span>Last updated: Just now</span>}\n>\n  <p>Card body content</p>\n</CardNative>'} />
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.cardGrid')}</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <CardNative hoverable header={<h4 className="font-semibold">{FM('showcase.content.users')}</h4>} testId="card-grid-1">
            <p className="text-3xl font-bold">{FM('showcase.content.userCount')}</p>
            <p className="text-sm opacity-70">{FM('showcase.content.activeUsersThisMonth')}</p>
          </CardNative>
          <CardNative hoverable header={<h4 className="font-semibold">{FM('showcase.content.revenue')}</h4>} testId="card-grid-2">
            <p className="text-3xl font-bold">{FM('showcase.content.revenueAmount')}</p>
            <p className="text-sm opacity-70">{FM('showcase.content.monthlyRevenue')}</p>
          </CardNative>
          <CardNative hoverable header={<h4 className="font-semibold">{FM('showcase.content.growth')}</h4>} testId="card-grid-3">
            <p className="text-3xl font-bold">{FM('showcase.content.growthPercent')}</p>
            <p className="text-sm opacity-70">{FM('showcase.content.yearOverYear')}</p>
          </CardNative>
        </div>
        <CopyableCodeSnippet code={'<CardNative hoverable header={<h4>Users</h4>}>\n  <p className="text-3xl font-bold">1,234</p>\n</CardNative>'} />
      </section>
    </div>
  </div>
);

export default NativeCardShowcase;
