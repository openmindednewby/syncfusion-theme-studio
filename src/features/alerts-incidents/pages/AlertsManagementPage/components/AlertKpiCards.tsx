/**
 * KPI summary cards row for the Order Management section.
 * Fetches indicator data from API and supports drag-and-drop reordering.
 * Each card shows a drag handle, value, title, and trend icon.
 */
import { memo, useCallback, useMemo, useRef, useState } from 'react';

import { useMockServerWebAlertsGetIndicators } from '@/api/generated/mockserver/alert/alert';
import type { OrderIndicator } from '@/api/generated/mockserver/models';
import { IconTrendingUp, IconTrendingDown, ArrowIcon, DragHandleIcon, KebabIcon } from '@/components/icons';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

function reorderIndices(
  prev: number[], fromIdx: number, toIdx: number, length: number,
): number[] {
  const current = prev.length === length ? [...prev] : Array.from({ length }, (_, i) => i);
  const removed = current.splice(fromIdx, 1)[0];
  if (!isValueDefined(removed)) return current;
  current.splice(toIdx, 0, removed);
  return current;
}

const CARD_COUNT = 8;
const EMPTY_INDICATORS: OrderIndicator[] = [];

const TREND_INCREASE = 1;
const TREND_DECREASE = -1;

const CARD_MIN_WIDTH = 222;
const CARD_HEIGHT = 90;
const CARD_BORDER_RADIUS = 4;
const VALUE_FONT_WEIGHT = 500;
const LABEL_FONT_SIZE = 12;
const LABEL_MARGIN_TOP = 4;
const TREND_FONT_SIZE = 10;
const DRAG_OPACITY = 0.5;
const TREND_ICON_SIZE = 'h-3 w-3';

const TREND_INCREASE_CLASS = 'text-error-500';
const TREND_DECREASE_CLASS = 'text-success-500';
const TREND_NEUTRAL_CLASS = 'text-text-muted';

const CARD_BASE_STYLE = {
  minWidth: CARD_MIN_WIDTH,
  height: CARD_HEIGHT,
  borderRadius: CARD_BORDER_RADIUS,
} as const;

const CARD_THEME_CLASSES =
  'bg-surface border-border dark:bg-surface-alt dark:border-border border';

interface TrendDisplay {
  icon: JSX.Element;
  className: string;
  label: string;
  text: string;
}

function getTrendDisplay(indicator: OrderIndicator): TrendDisplay {
  const trend = indicator.alertIndicatorTrend ?? 0;
  const pct = indicator.alertTrendPercentage ?? 0;

  if (trend === TREND_INCREASE)
    return {
      icon: <IconTrendingUp className={TREND_ICON_SIZE} />,
      className: TREND_INCREASE_CLASS,
      label: FM('gridShowcase.kpiIncrease'),
      text: FM('gridShowcase.kpiIncreaseText', pct.toFixed(0)),
    };

  if (trend === TREND_DECREASE)
    return {
      icon: <IconTrendingDown className={TREND_ICON_SIZE} />,
      className: TREND_DECREASE_CLASS,
      label: FM('gridShowcase.kpiDecrease'),
      text: FM('gridShowcase.kpiDecreaseText', pct.toFixed(0)),
    };

  return {
    icon: <ArrowIcon className={TREND_ICON_SIZE} />,
    className: TREND_NEUTRAL_CLASS,
    label: FM('gridShowcase.kpiStable'),
    text: FM('gridShowcase.kpiStableText'),
  };
}

const SkeletonCards = (): JSX.Element => (
  <div className="flex flex-row flex-wrap gap-5" data-testid="alert-kpi-cards-skeleton">
    {Array.from({ length: CARD_COUNT }, (_, i) => (
      <div key={i} className={`animate-pulse flex-none ${CARD_THEME_CLASSES}`} style={CARD_BASE_STYLE} />
    ))}
  </div>
);

export const AlertKpiCards = memo((): JSX.Element => {
  const { data: response, isLoading } = useMockServerWebAlertsGetIndicators();
  const indicators = response?.data.alertIndicators ?? EMPTY_INDICATORS;

  const [order, setOrder] = useState<number[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const dragIndexRef = useRef<number | null>(null);

  const orderedIndicators = useMemo(() => {
    if (indicators.length === 0) return [];
    const indices = order.length === indicators.length
      ? order
      : indicators.map((_, i) => i);
    return indices
      .map((i) => {
        const indicator = indicators[i];
        return indicator ? { indicator, originalIndex: i } : undefined;
      })
      .filter(isValueDefined);
  }, [indicators, order]);

  const handleDragStart = useCallback((index: number): void => {
    dragIndexRef.current = index;
    setDragIndex(index);
  }, []);

  const handleDragEnd = useCallback((): void => {
    setDragIndex(null);
  }, []);

  const handleDrop = useCallback((dropIndex: number): void => {
    const fromIndex = dragIndexRef.current;
    if (!isValueDefined(fromIndex) || fromIndex === dropIndex) return;

    setOrder((prev) => reorderIndices(prev, fromIndex, dropIndex, indicators.length));
    dragIndexRef.current = null;
    setDragIndex(null);
  }, [indicators]);

  const handleDragOver = useCallback((e: React.DragEvent): void => {
    e.preventDefault();
  }, []);

  if (isLoading) return <SkeletonCards />;

  return (
    <div
      className="flex flex-row flex-wrap gap-5"
      data-testid="alert-kpi-cards"
      role="listbox"
    >
      {orderedIndicators.map(({ indicator, originalIndex }, displayIndex) => {
        const trend = getTrendDisplay(indicator);
        const title = indicator.title ?? '\u2014';
        return (
          <div
            key={originalIndex}
            draggable
            aria-label={title}
            aria-roledescription="draggable card"
            aria-selected={false}
            className={`relative flex-none cursor-grab active:cursor-grabbing ${CARD_THEME_CLASSES}`}
            role="option"
            style={{
              ...CARD_BASE_STYLE,
              padding: '12px 14px 12px 22px',
              opacity: dragIndex === displayIndex ? DRAG_OPACITY : 1,
            }}
            tabIndex={0}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragStart={() => handleDragStart(displayIndex)}
            onDrop={() => handleDrop(displayIndex)}
          >
            {/* Drag handle - vertically centered left */}
            <div
              aria-hidden="true"
              className="absolute left-1.5 top-1/2 -translate-y-1/2 text-text-muted"
            >
              <DragHandleIcon />
            </div>
            {/* Kebab menu - top right per Figma: right-0 top-0.5 (2px), 20×20 hit area */}
            <button
              aria-label={FM('gridShowcase.kpiMoreOptions')}
              className="absolute right-0 top-0.5 flex h-5 w-5 items-center justify-center text-text-muted hover:text-text-primary"
              type="button"
              onClick={(e) => e.stopPropagation()}
            >
              <KebabIcon />
            </button>
            <div
              className="text-[24px] leading-[24px] text-text-primary"
              style={{ fontWeight: VALUE_FONT_WEIGHT }}
            >
              {indicator.value ?? 0}
            </div>
            <div
              className="text-text-secondary"
              style={{
                fontSize: LABEL_FONT_SIZE,
                letterSpacing: '0.02em',
                marginTop: LABEL_MARGIN_TOP,
              }}
            >
              {title}
            </div>
            <div
              aria-label={trend.label}
              className="mt-1 flex items-center gap-1"
              style={{ fontSize: TREND_FONT_SIZE }}
            >
              <span className={trend.className}>{trend.icon}</span>
              <span className={trend.className}>{trend.text}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
});

AlertKpiCards.displayName = 'AlertKpiCards';
