import { CopyableCodeSnippet } from '@/components/common';
import { TimelineNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const VERTICAL_ITEMS = [
  { id: '1', label: 'Order Placed', description: 'Your order has been confirmed', status: 'completed' as const, timestamp: '10:00 AM' },
  { id: '2', label: 'Processing', description: 'Order is being prepared', status: 'completed' as const, timestamp: '10:30 AM' },
  { id: '3', label: 'Shipped', description: 'Package is on the way', status: 'active' as const, timestamp: '11:00 AM' },
  { id: '4', label: 'Delivered', description: 'Estimated delivery today', status: 'pending' as const },
];

const HORIZONTAL_ITEMS = [
  { id: '1', label: 'Step 1', description: 'Account Setup', status: 'completed' as const },
  { id: '2', label: 'Step 2', description: 'Profile Info', status: 'active' as const },
  { id: '3', label: 'Step 3', description: 'Verification', status: 'pending' as const },
  { id: '4', label: 'Step 4', description: 'Complete', status: 'pending' as const },
];

const NativeTimelineShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_TIMELINE_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.timelineShowcase.nativeTitle')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.timelineShowcase.nativeDescription')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.verticalTimeline')}</h3>
        <TimelineNative items={VERTICAL_ITEMS} testId="native-timeline-vertical" />
        <CopyableCodeSnippet code={'<TimelineNative\n  items={[\n    { id: "1", label: "Order Placed", description: "Confirmed", status: "completed" },\n    { id: "2", label: "Shipped", description: "On the way", status: "active" },\n    { id: "3", label: "Delivered", description: "Pending", status: "pending" },\n  ]}\n/>'} />
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.horizontalTimeline')}</h3>
        <TimelineNative items={HORIZONTAL_ITEMS} orientation="horizontal" testId="native-timeline-horizontal" />
        <CopyableCodeSnippet code={'<TimelineNative\n  orientation="horizontal"\n  items={[\n    { id: "1", label: "Step 1", status: "completed" },\n    { id: "2", label: "Step 2", status: "active" },\n  ]}\n/>'} />
      </section>
    </div>
  </div>
);

export default NativeTimelineShowcase;
