import { memo } from 'react';

import { FM } from '@/localization/utils/helpers';

const SHADES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
const DARK_SHADE_THRESHOLD = 500;

export const ColorsSection = memo((): JSX.Element => (
  <section className="card">
    <h3 className="mb-4 text-lg font-semibold text-text-primary">
      {FM('themeEditor.primaryColors')}
    </h3>
    <div className="flex flex-wrap gap-2">
      {SHADES.map((shade) => {
        const isDarkShade = Number(shade) >= DARK_SHADE_THRESHOLD;
        return (
          <div
            key={shade}
            className={`flex h-12 w-12 items-center justify-center rounded bg-primary-${shade} text-xs font-medium ${
              isDarkShade ? 'text-white' : 'text-gray-900'
            }`}
          >
            {shade}
          </div>
        );
      })}
    </div>
  </section>
));

ColorsSection.displayName = 'ColorsSection';
