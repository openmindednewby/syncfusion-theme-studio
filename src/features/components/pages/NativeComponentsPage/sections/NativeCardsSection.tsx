import { memo } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

export const NativeCardsSection = memo((): JSX.Element => (
  <section className="card" data-testid={TestIds.CARDS_NATIVE_PAGE_SECTION}>
    <h3 className="mb-4 text-lg font-semibold text-text-primary">
      {FM('components.sections.nativeCards')}
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
          <p>{FM('components.cards.withHeaderDesc')}</p>
        </div>
      </div>

      {/* Card with Footer Actions */}
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

      {/* Full Card */}
      <div className="card md:col-span-2">
        <div className="card-header">
          <h4 className="card-title">{FM('components.cards.full')}</h4>
          <p className="card-subtitle">{FM('components.cards.fullDesc')}</p>
        </div>
        <div className="card-content">
          <p>{FM('components.cards.nativeFullContentDescription')}</p>
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
));

NativeCardsSection.displayName = 'NativeCardsSection';
