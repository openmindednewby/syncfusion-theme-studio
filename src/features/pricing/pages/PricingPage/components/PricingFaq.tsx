/** FAQ section with custom accordion for expand/collapse chevron and hover styling. */
import { memo, useCallback, useState } from 'react';

import { IconChevronDown } from '@/components/icons';
import { FAQ_ITEMS } from '@/features/pricing/data/pricingData';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const FaqItem = ({
  questionKey,
  answerKey,
}: {
  questionKey: string;
  answerKey: string;
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between rounded-md px-4 py-4 text-left transition-colors hover:bg-surface-hover"
        type="button"
        onClick={toggle}
      >
        <span className="text-sm font-semibold text-text-primary">
          {FM(questionKey)}
        </span>
        <IconChevronDown
          className={`ml-3 h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen ? (
        <div className="px-4 pb-4 text-sm text-text-secondary">
          {FM(answerKey)}
        </div>
      ) : null}
    </div>
  );
};

const PricingFaq = memo((): JSX.Element => (
  <div className="mx-auto max-w-3xl" data-testid={TestIds.PRICING_FAQ}>
    <h2 className="mb-8 text-center text-2xl font-bold text-text-primary">
      {FM('pricing.faq.title')}
    </h2>
    <div
      className="divide-y divide-border rounded-lg border border-border bg-surface"
      data-testid={TestIds.PRICING_FAQ_ACCORDION}
    >
      {FAQ_ITEMS.map((item) => (
        <FaqItem
          key={item.questionKey}
          answerKey={item.answerKey}
          questionKey={item.questionKey}
        />
      ))}
    </div>
  </div>
));

PricingFaq.displayName = 'PricingFaq';

export default PricingFaq;
