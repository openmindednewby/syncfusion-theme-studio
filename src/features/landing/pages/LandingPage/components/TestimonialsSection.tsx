/** Testimonials section with 3 customer quotes. */
import { memo } from 'react';

import { LANDING_TESTIMONIALS, type LandingTestimonial } from '@/features/landing/data/landingData';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const QuoteIcon = (): JSX.Element => (
  <svg aria-hidden="true" className="h-8 w-8 text-primary-300 dark:text-primary-700" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
  </svg>
);

const TestimonialCard = memo(({ testimonial }: { testimonial: LandingTestimonial }): JSX.Element => (
  <div className="flex flex-col rounded-xl border border-border bg-surface p-8">
    <QuoteIcon />
    <p className="mt-4 flex-1 text-base leading-relaxed text-text-secondary">
      {FM(testimonial.quoteKey)}
    </p>
    <div className="mt-6 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
        {testimonial.avatar}
      </div>
      <div>
        <p className="text-sm font-semibold text-text-primary">
          {FM(testimonial.authorKey)}
        </p>
        <p className="text-xs text-text-muted">
          {FM(testimonial.roleKey)}
        </p>
      </div>
    </div>
  </div>
));

TestimonialCard.displayName = 'TestimonialCard';

const TestimonialsSection = memo((): JSX.Element => (
  <section
    className="bg-surface px-4 py-20 sm:px-6 lg:px-8"
    data-testid={TestIds.LANDING_TESTIMONIALS}
  >
    <div className="mx-auto max-w-6xl">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
          {FM('landing.testimonials.title')}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
          {FM('landing.testimonials.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {LANDING_TESTIMONIALS.map((testimonial) => (
          <TestimonialCard key={testimonial.authorKey} testimonial={testimonial} />
        ))}
      </div>
    </div>
  </section>
));

TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;
