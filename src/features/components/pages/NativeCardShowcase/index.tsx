import { CardNative } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const NativeCardShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_CARD_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.cardShowcase.nativeTitle')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.cardShowcase.nativeDescription')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Basic Card</h3>
        <div className="max-w-md">
          <CardNative testId="card-basic">
            <p>This is a basic card with default styling and content padding.</p>
          </CardNative>
        </div>
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">With Header & Footer</h3>
        <div className="max-w-md">
          <CardNative
            footer={<span className="text-sm">Last updated: just now</span>}
            header={<h4 className="font-semibold">Card Title</h4>}
            testId="card-header-footer"
          >
            <p>Card body content with header and footer sections.</p>
          </CardNative>
        </div>
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Card Grid</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <CardNative hoverable header={<h4 className="font-semibold">Users</h4>} testId="card-grid-1">
            <p className="text-3xl font-bold">1,234</p>
            <p className="text-sm opacity-70">Active users this month</p>
          </CardNative>
          <CardNative hoverable header={<h4 className="font-semibold">Revenue</h4>} testId="card-grid-2">
            <p className="text-3xl font-bold">$45.2K</p>
            <p className="text-sm opacity-70">Monthly revenue</p>
          </CardNative>
          <CardNative hoverable header={<h4 className="font-semibold">Growth</h4>} testId="card-grid-3">
            <p className="text-3xl font-bold">+12%</p>
            <p className="text-sm opacity-70">Year over year</p>
          </CardNative>
        </div>
      </section>
    </div>
  </div>
);

export default NativeCardShowcase;
