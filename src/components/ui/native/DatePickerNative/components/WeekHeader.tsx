import { memo } from 'react';

import { WEEK_DAY_LABELS } from '../constants';

const WeekHeader = memo((): JSX.Element => (
  <div className="native-datepicker-week-header">
    {WEEK_DAY_LABELS.map((day) => (
      <span key={day} className="native-datepicker-week-day">
        {day}
      </span>
    ))}
  </div>
));

WeekHeader.displayName = 'WeekHeader';

export default WeekHeader;
