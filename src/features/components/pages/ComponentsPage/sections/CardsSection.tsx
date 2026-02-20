import { memo } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const BadgesShowcase = (): JSX.Element => (
  <section className="card">
    <h3 className="mb-4 text-lg font-semibold text-text-primary">
      {FM('components.sections.badges')}
    </h3>
    <div className="flex flex-wrap gap-4">
      <span className="badge badge-success">{FM('components.badges.success')}</span>
      <span className="badge badge-warning">{FM('components.badges.warning')}</span>
      <span className="badge badge-error">{FM('components.badges.error')}</span>
      <span className="badge badge-info">{FM('components.badges.info')}</span>
    </div>
  </section>
);

const NativeCardsShowcase = (): JSX.Element => (
  <section className="card" data-testid={TestIds.CARDS_NATIVE_SECTION}>
    <h3 className="mb-4 text-lg font-semibold text-text-primary">
      {FM('components.sections.cards')}
    </h3>
    <div className="grid gap-4 md:grid-cols-2">
      {/* Default Card */}
      <div className="card">
        <h4 className="card-title">{FM('components.cards.default')}</h4>
        <p className="card-subtitle">{FM('components.cards.defaultDesc')}</p>
      </div>

      {/* Elevated Card */}
      <div className="card card-elevated">
        <h4 className="card-title">{FM('components.cards.elevated')}</h4>
        <p className="card-subtitle">{FM('components.cards.elevatedDesc')}</p>
      </div>

      {/* Card with Header */}
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">{FM('components.cards.withHeader')}</h4>
        </div>
        <div className="card-content">
          <p className="card-subtitle">{FM('components.cards.withHeaderDesc')}</p>
        </div>
      </div>

      {/* Card with Footer and Actions */}
      <div className="card">
        <h4 className="card-title">{FM('components.cards.withActions')}</h4>
        <p className="card-subtitle">{FM('components.cards.withActionsDesc')}</p>
        <div className="card-footer">
          <div className="flex gap-4">
            <span className="card-action">{FM('components.cards.learnMore')}</span>
            <span className="card-action">{FM('components.cards.dismiss')}</span>
          </div>
        </div>
      </div>

      {/* Full Card (header + content + footer) */}
      <div className="card md:col-span-2">
        <div className="card-header">
          <h4 className="card-title">{FM('components.cards.full')}</h4>
          <p className="card-subtitle">{FM('components.cards.fullDesc')}</p>
        </div>
        <div className="card-content">
          <p>{FM('components.cards.fullContentDescription')}</p>
        </div>
        <div className="card-footer">
          <div className="flex gap-4">
            <span className="card-action">{FM('components.cards.viewDetails')}</span>
            <span className="card-action">{FM('components.cards.share')}</span>
            <span className="card-action">{FM('components.cards.save')}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SyncfusionCardsShowcase = (): JSX.Element => (
  <section className="card" data-testid={TestIds.CARDS_SYNCFUSION_SECTION}>
    <h3 className="mb-4 text-lg font-semibold text-text-primary">
      {FM('components.sections.syncfusionCards')}
    </h3>
    <div className="grid gap-4 md:grid-cols-2">
      {/* Basic Syncfusion Card */}
      <div className="e-card">
        <div className="e-card-header">
          <div className="e-card-header-caption">
            <div className="e-card-header-title">{FM('components.cards.syncfusionBasic')}</div>
            <div className="e-card-sub-title">{FM('components.cards.syncfusionBasicDesc')}</div>
          </div>
        </div>
        <div className="e-card-content">
          {FM('components.cards.syncfusionBasicContent')}
        </div>
      </div>

      {/* Syncfusion Card with Actions */}
      <div className="e-card">
        <div className="e-card-header">
          <div className="e-card-header-caption">
            <div className="e-card-header-title">{FM('components.cards.syncfusionActions')}</div>
            <div className="e-card-sub-title">{FM('components.cards.syncfusionActionsDesc')}</div>
          </div>
        </div>
        <div className="e-card-content">
          {FM('components.cards.syncfusionActionsContent')}
        </div>
        <div className="e-card-actions">
          <button className="e-btn e-flat e-primary" type="button">
            {FM('components.cards.viewDetails')}
          </button>
          <button className="e-btn e-flat" type="button">
            {FM('components.cards.share')}
          </button>
        </div>
      </div>

      {/* Horizontal Syncfusion Card */}
      <div className="e-card e-card-horizontal md:col-span-2">
        <div className="e-card-stacked">
          <div className="e-card-header">
            <div className="e-card-header-caption">
              <div className="e-card-header-title">
                {FM('components.cards.syncfusionHorizontal')}
              </div>
              <div className="e-card-sub-title">
                {FM('components.cards.syncfusionHorizontalDesc')}
              </div>
            </div>
          </div>
          <div className="e-card-content">
            {FM('components.cards.syncfusionHorizontalContent')}
          </div>
          <div className="e-card-actions">
            <button className="e-btn e-flat e-primary" type="button">
              {FM('components.cards.learnMore')}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const CardsSection = memo((): JSX.Element => (
  <>
    <BadgesShowcase />
    <NativeCardsShowcase />
    <SyncfusionCardsShowcase />
  </>
));

CardsSection.displayName = 'CardsSection';
