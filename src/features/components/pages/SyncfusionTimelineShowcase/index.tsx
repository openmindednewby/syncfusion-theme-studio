import { CopyableCodeSnippet } from '@/components/common';
import SyncfusionTimeline from '@/components/ui/syncfusion/Timeline';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const ITEMS = [
  { id: '1', label: 'Created', description: 'Issue was created', status: 'completed' as const },
  { id: '2', label: 'In Progress', description: 'Development started', status: 'active' as const },
  { id: '3', label: 'Review', description: 'Code review in progress', status: 'pending' as const },
  { id: '4', label: 'Completed', description: 'Deployed to production', status: 'pending' as const },
];

const SyncfusionTimelineShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_TIMELINE_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.timelineShowcase.syncfusionTitle')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.timelineShowcase.syncfusionDescription')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.verticalTimeline')}</h3>
        <SyncfusionTimeline items={ITEMS} testId="sf-timeline-vertical" />
        <CopyableCodeSnippet code='<SyncfusionTimeline items={[{ id: "1", label: "Step 1", status: "completed" }]} />' />
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.horizontalTimeline')}</h3>
        <SyncfusionTimeline items={ITEMS} orientation="horizontal" testId="sf-timeline-horizontal" />
        <CopyableCodeSnippet code='<SyncfusionTimeline items={items} orientation="horizontal" />' />
      </section>
    </div>
  </div>
);

export default SyncfusionTimelineShowcase;
