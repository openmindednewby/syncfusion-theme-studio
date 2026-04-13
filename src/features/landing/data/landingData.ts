/** Static data for the landing page sections. */

export interface LandingFeature {
  titleKey: string;
  descriptionKey: string;
  icon: 'dashboard' | 'analytics' | 'team' | 'realtime' | 'security' | 'integrations' | 'customize' | 'responsive';
}

export interface LandingTestimonial {
  quoteKey: string;
  authorKey: string;
  roleKey: string;
  avatar: string;
}

export interface LandingStat {
  valueKey: string;
  labelKey: string;
}

const FEATURE_PREFIX = 'landing.features.items';

export const LANDING_FEATURES: LandingFeature[] = [
  { titleKey: `${FEATURE_PREFIX}.dashboard.title`, descriptionKey: `${FEATURE_PREFIX}.dashboard.description`, icon: 'dashboard' },
  { titleKey: `${FEATURE_PREFIX}.analytics.title`, descriptionKey: `${FEATURE_PREFIX}.analytics.description`, icon: 'analytics' },
  { titleKey: `${FEATURE_PREFIX}.team.title`, descriptionKey: `${FEATURE_PREFIX}.team.description`, icon: 'team' },
  { titleKey: `${FEATURE_PREFIX}.realtime.title`, descriptionKey: `${FEATURE_PREFIX}.realtime.description`, icon: 'realtime' },
  { titleKey: `${FEATURE_PREFIX}.security.title`, descriptionKey: `${FEATURE_PREFIX}.security.description`, icon: 'security' },
  { titleKey: `${FEATURE_PREFIX}.integrations.title`, descriptionKey: `${FEATURE_PREFIX}.integrations.description`, icon: 'integrations' },
  { titleKey: `${FEATURE_PREFIX}.customize.title`, descriptionKey: `${FEATURE_PREFIX}.customize.description`, icon: 'customize' },
  { titleKey: `${FEATURE_PREFIX}.responsive.title`, descriptionKey: `${FEATURE_PREFIX}.responsive.description`, icon: 'responsive' },
];

const TESTIMONIAL_PREFIX = 'landing.testimonials.items';

export const LANDING_TESTIMONIALS: LandingTestimonial[] = [
  {
    quoteKey: `${TESTIMONIAL_PREFIX}.0.quote`,
    authorKey: `${TESTIMONIAL_PREFIX}.0.author`,
    roleKey: `${TESTIMONIAL_PREFIX}.0.role`,
    avatar: 'SM',
  },
  {
    quoteKey: `${TESTIMONIAL_PREFIX}.1.quote`,
    authorKey: `${TESTIMONIAL_PREFIX}.1.author`,
    roleKey: `${TESTIMONIAL_PREFIX}.1.role`,
    avatar: 'AJ',
  },
  {
    quoteKey: `${TESTIMONIAL_PREFIX}.2.quote`,
    authorKey: `${TESTIMONIAL_PREFIX}.2.author`,
    roleKey: `${TESTIMONIAL_PREFIX}.2.role`,
    avatar: 'RK',
  },
];

const STAT_PREFIX = 'landing.stats.items';

export const LANDING_STATS: LandingStat[] = [
  { valueKey: `${STAT_PREFIX}.users.value`, labelKey: `${STAT_PREFIX}.users.label` },
  { valueKey: `${STAT_PREFIX}.uptime.value`, labelKey: `${STAT_PREFIX}.uptime.label` },
  { valueKey: `${STAT_PREFIX}.integrations.value`, labelKey: `${STAT_PREFIX}.integrations.label` },
  { valueKey: `${STAT_PREFIX}.support.value`, labelKey: `${STAT_PREFIX}.support.label` },
];
