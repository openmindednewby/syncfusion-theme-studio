import { CopyableCodeSnippet } from '@/components/common';
import PillBadge from '@/components/ui/native/PillBadge';
import { FM } from '@/localization/utils/helpers';
import { ComponentTestIds } from '@/shared/testIds.components';

const STATUS_CODE = '<PillBadge colorClass="bg-success-50 text-success-700">Active</PillBadge>';
const SEMANTIC_CODE = '<PillBadge colorClass="bg-warning-50 text-warning-700">Warning</PillBadge>';
const TREND_CODE = '<PillBadge colorClass="bg-success-500/10 text-success-500">+12.5%</PillBadge>';
const ROLE_CODE = '<PillBadge colorClass="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">Admin</PillBadge>';
const CUSTOM_CODE = '<PillBadge className="mt-2 inline-block" colorClass="bg-success-500/10 text-success-500">+4.7%</PillBadge>';

const PillBadgeShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={ComponentTestIds.PILL_BADGE_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.pillBadgeShowcase.title')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.pillBadgeShowcase.description')}</p>
      </div>

      {/* Status Variants */}
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('components.pillBadgeShowcase.statusSection')}</h3>
        <p className="text-sm text-text-secondary">{FM('components.pillBadgeShowcase.statusDescription')}</p>
        <div className="flex flex-wrap gap-3">
          <PillBadge colorClass="bg-success-50 text-success-700" testId="pill-active">{FM('components.pillBadgeShowcase.statusActive')}</PillBadge>
          <PillBadge colorClass="bg-surface-hover text-text-muted" testId="pill-inactive">{FM('components.pillBadgeShowcase.statusInactive')}</PillBadge>
          <PillBadge colorClass="bg-surface-hover text-text-secondary" testId="pill-draft">{FM('components.pillBadgeShowcase.statusDraft')}</PillBadge>
          <PillBadge colorClass="bg-info-50 text-info-700" testId="pill-sent">{FM('components.pillBadgeShowcase.statusSent')}</PillBadge>
          <PillBadge colorClass="bg-success-50 text-success-700" testId="pill-paid">{FM('components.pillBadgeShowcase.statusPaid')}</PillBadge>
          <PillBadge colorClass="bg-error-50 text-error-700" testId="pill-overdue">{FM('components.pillBadgeShowcase.statusOverdue')}</PillBadge>
          <PillBadge colorClass="bg-surface-hover text-text-muted" testId="pill-cancelled">{FM('components.pillBadgeShowcase.statusCancelled')}</PillBadge>
        </div>
        <CopyableCodeSnippet code={STATUS_CODE} />
      </section>

      {/* Semantic Colors */}
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('components.pillBadgeShowcase.semanticSection')}</h3>
        <p className="text-sm text-text-secondary">{FM('components.pillBadgeShowcase.semanticDescription')}</p>
        <div className="flex flex-wrap gap-3">
          <PillBadge colorClass="bg-success-50 text-success-700" testId="pill-semantic-success">{FM('components.pillBadgeShowcase.semanticSuccess')}</PillBadge>
          <PillBadge colorClass="bg-warning-50 text-warning-700" testId="pill-semantic-warning">{FM('components.pillBadgeShowcase.semanticWarning')}</PillBadge>
          <PillBadge colorClass="bg-error-50 text-error-700" testId="pill-semantic-error">{FM('components.pillBadgeShowcase.semanticError')}</PillBadge>
          <PillBadge colorClass="bg-info-50 text-info-700" testId="pill-semantic-info">{FM('components.pillBadgeShowcase.semanticInfo')}</PillBadge>
          <PillBadge colorClass="bg-surface-hover text-text-secondary" testId="pill-semantic-neutral">{FM('components.pillBadgeShowcase.semanticNeutral')}</PillBadge>
        </div>
        <CopyableCodeSnippet code={SEMANTIC_CODE} />
      </section>

      {/* Trend Indicators */}
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('components.pillBadgeShowcase.trendSection')}</h3>
        <p className="text-sm text-text-secondary">{FM('components.pillBadgeShowcase.trendDescription')}</p>
        <div className="flex flex-wrap gap-3">
          <PillBadge colorClass="bg-success-500/10 text-success-500" testId="pill-trend-up">{FM('components.pillBadgeShowcase.trendUp1')}</PillBadge>
          <PillBadge colorClass="bg-error-500/10 text-error-500" testId="pill-trend-down">{FM('components.pillBadgeShowcase.trendDown1')}</PillBadge>
          <PillBadge className="inline-block" colorClass="bg-success-500/10 text-success-500" testId="pill-trend-inline">{FM('components.pillBadgeShowcase.trendUp2')}</PillBadge>
        </div>
        <CopyableCodeSnippet code={TREND_CODE} />
      </section>

      {/* Role Badges */}
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('components.pillBadgeShowcase.roleSection')}</h3>
        <p className="text-sm text-text-secondary">{FM('components.pillBadgeShowcase.roleDescription')}</p>
        <div className="flex flex-wrap gap-3">
          <PillBadge colorClass="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" testId="pill-role-admin">{FM('components.pillBadgeShowcase.roleAdmin')}</PillBadge>
          <PillBadge colorClass="bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300" testId="pill-role-manager">{FM('components.pillBadgeShowcase.roleManager')}</PillBadge>
          <PillBadge colorClass="bg-surface-200 text-text-muted dark:bg-gray-700 dark:text-gray-300" testId="pill-role-viewer">{FM('components.pillBadgeShowcase.roleViewer')}</PillBadge>
          <PillBadge colorClass="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" testId="pill-role-analyst">{FM('components.pillBadgeShowcase.roleAnalyst')}</PillBadge>
        </div>
        <CopyableCodeSnippet code={ROLE_CODE} />
      </section>

      {/* Custom Styling */}
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('components.pillBadgeShowcase.customSection')}</h3>
        <p className="text-sm text-text-secondary">{FM('components.pillBadgeShowcase.customDescription')}</p>
        <div className="flex flex-wrap items-start gap-4">
          <div className="card">
            <p className="text-sm text-text-secondary">{FM('components.pillBadgeShowcase.inlineFlexAlignment')}</p>
            <PillBadge className="inline-flex" colorClass="bg-info-50 text-info-700" testId="pill-custom-inline">{FM('components.pillBadgeShowcase.inlineLabel')}</PillBadge>
          </div>
          <div className="card">
            <p className="text-sm text-text-secondary">{FM('components.pillBadgeShowcase.inlineBlockDescription')}</p>
            <PillBadge className="mt-2 inline-block" colorClass="bg-success-500/10 text-success-500" testId="pill-custom-block">{FM('components.pillBadgeShowcase.trendUp3')}</PillBadge>
          </div>
        </div>
        <CopyableCodeSnippet code={CUSTOM_CODE} />
      </section>
    </div>
  </div>
);

export default PillBadgeShowcase;
