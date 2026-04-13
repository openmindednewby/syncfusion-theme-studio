import { memo } from 'react';

const RangeSeparator = memo((): JSX.Element => (
  <div className="native-datepicker-range-separator">
    <svg fill="none" height="12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="12">
      <line x1="5" x2="19" y1="12" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  </div>
));

RangeSeparator.displayName = 'RangeSeparator';

export default RangeSeparator;
