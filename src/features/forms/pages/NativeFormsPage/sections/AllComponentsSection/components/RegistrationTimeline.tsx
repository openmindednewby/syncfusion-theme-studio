/**
 * RegistrationTimeline - Timeline showing registration steps.
 *
 * Native components used: TimelineNative
 */
import { TimelineNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

export const RegistrationTimeline = (): JSX.Element => {
  const timelineItems = [
    {
      id: 'fill-form',
      label: FM('forms.native.allComponents.timeline.fillForm'),
      description: FM('forms.native.allComponents.timeline.fillFormDesc'),
      status: 'completed' as const,
    },
    {
      id: 'review',
      label: FM('forms.native.allComponents.timeline.review'),
      description: FM('forms.native.allComponents.timeline.reviewDesc'),
      status: 'active' as const,
    },
    {
      id: 'payment',
      label: FM('forms.native.allComponents.timeline.payment'),
      description: FM('forms.native.allComponents.timeline.paymentDesc'),
      status: 'pending' as const,
    },
    {
      id: 'confirmation',
      label: FM('forms.native.allComponents.timeline.confirmation'),
      description: FM('forms.native.allComponents.timeline.confirmationDesc'),
      status: 'pending' as const,
    },
  ];

  return (
    <div className="rounded-md border border-border p-4">
      <h4 className="mb-3 text-sm font-medium text-text-primary">
        {FM('forms.native.allComponents.timeline.title')}
      </h4>
      <TimelineNative
        items={timelineItems}
        testId="all-comp-timeline"
      />
    </div>
  );
};
