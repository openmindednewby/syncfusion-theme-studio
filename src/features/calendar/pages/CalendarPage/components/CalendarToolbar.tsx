import { IconChevronLeft, IconChevronRight } from '@/components/icons';
import { CalendarView } from '@/features/calendar/calendarView';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

interface CalendarToolbarProps {
  currentView: CalendarView;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewChange: (view: CalendarView) => void;
}

const NAV_BTN_CLASS =
  'flex h-9 w-9 items-center justify-center rounded-md border border-border text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary';

const VIEW_VIEWS: CalendarView[] = [CalendarView.Day, CalendarView.Week, CalendarView.Month];

const VIEW_LABEL_KEYS: Record<CalendarView, string> = {
  [CalendarView.Day]: 'calendar.dayView',
  [CalendarView.Week]: 'calendar.weekView',
  [CalendarView.Month]: 'calendar.monthView',
};

const VIEW_TEST_IDS: Record<CalendarView, string> = {
  [CalendarView.Day]: TestIds.CALENDAR_VIEW_DAY,
  [CalendarView.Week]: TestIds.CALENDAR_VIEW_WEEK,
  [CalendarView.Month]: TestIds.CALENDAR_VIEW_MONTH,
};

/** Custom navigation toolbar for the calendar scheduler. */
export const CalendarToolbar = ({
  currentView,
  onPrev,
  onNext,
  onToday,
  onViewChange,
}: CalendarToolbarProps): JSX.Element => (
  <div className="flex flex-wrap items-center justify-between gap-3">
    <div className="flex items-center gap-2">
      <button
        aria-label={FM('calendar.previousPeriod')}
        className={NAV_BTN_CLASS}
        data-testid={TestIds.CALENDAR_NAV_PREV}
        type="button"
        onClick={onPrev}
      >
        <IconChevronLeft className="h-4 w-4" />
      </button>
      <button
        aria-label={FM('calendar.today')}
        className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary"
        data-testid={TestIds.CALENDAR_NAV_TODAY}
        type="button"
        onClick={onToday}
      >
        {FM('calendar.today')}
      </button>
      <button
        aria-label={FM('calendar.nextPeriod')}
        className={NAV_BTN_CLASS}
        data-testid={TestIds.CALENDAR_NAV_NEXT}
        type="button"
        onClick={onNext}
      >
        <IconChevronRight className="h-4 w-4" />
      </button>
    </div>
    <div className="flex rounded-md border border-border">
      {VIEW_VIEWS.map((view) => {
        const isActive = currentView === view;
        return (
          <button
            key={view}
            aria-label={FM(VIEW_LABEL_KEYS[view])}
            aria-pressed={isActive}
            className={`px-3 py-1.5 text-sm font-medium transition-colors first:rounded-l-md last:rounded-r-md ${
              isActive
                ? 'bg-primary-600 text-white'
                : 'text-text-secondary hover:bg-surface-secondary hover:text-text-primary'
            }`}
            data-testid={VIEW_TEST_IDS[view]}
            type="button"
            onClick={() => onViewChange(view)}
          >
            {FM(VIEW_LABEL_KEYS[view])}
          </button>
        );
      })}
    </div>
  </div>
);
