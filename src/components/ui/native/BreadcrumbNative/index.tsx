/**
 * BreadcrumbNative - Zero-dependency themed breadcrumb using native HTML.
 *
 * Uses semantic `<nav aria-label="breadcrumb">` with an `<ol>` list.
 * The last item is rendered as non-clickable (current page).
 * Themed via --component-breadcrumb-* CSS variables.
 * Supports collapse (ellipsis) when maxItems is set.
 */
import { memo, useCallback, useState, type CSSProperties, type ReactNode } from 'react';

import { IconChevronRight } from '@/components/icons';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

import {
  BREADCRUMB_FONT_FAMILY,
  BREADCRUMB_FONT_SIZE_PX,
  BREADCRUMB_GAP_PX,
  BREADCRUMB_LINE_HEIGHT_PX,
  ELLIPSIS_CHAR,
  HOME_ICON_BORDER_RADIUS_PX,
  HOME_ICON_CONTAINER_SIZE_PX,
  HOME_ICON_PADDING_PX,
  INNER_ITEM_PADDING,
  ITEM_HEIGHT_PX,
  SEPARATOR_PADDING,
  VAR_ACTIVE,
  VAR_HOVER,
  VAR_ICON,
  VAR_SEPARATOR,
  VAR_TEXT,
  VAR_TRANSITION,
  computeVisibleItems,
} from './constants';

import type { BreadcrumbItem, BreadcrumbNativeProps } from './types';

function renderSeparator(custom: ReactNode | undefined): ReactNode {
  if (!isValueDefined(custom))
    return <IconChevronRight className="h-3 w-3" />;

  if (typeof custom === 'string')
    return <span>{custom}</span>;

  return custom;
}

const LIST_STYLE: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: BREADCRUMB_GAP_PX,
  margin: 0,
  padding: 0,
  listStyle: 'none',
  fontFamily: BREADCRUMB_FONT_FAMILY,
  fontSize: BREADCRUMB_FONT_SIZE_PX,
  lineHeight: `${String(BREADCRUMB_LINE_HEIGHT_PX)}px`,
  fontWeight: 400,
};

const ICON_CONTAINER_STYLE: CSSProperties = {
  width: HOME_ICON_CONTAINER_SIZE_PX,
  height: HOME_ICON_CONTAINER_SIZE_PX,
  padding: HOME_ICON_PADDING_PX,
  borderRadius: HOME_ICON_BORDER_RADIUS_PX,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const SEPARATOR_STYLE: CSSProperties = {
  color: VAR_SEPARATOR,
  padding: SEPARATOR_PADDING,
  height: ITEM_HEIGHT_PX,
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
};

const ITEM_BASE_STYLE: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  padding: INNER_ITEM_PADDING,
  height: ITEM_HEIGHT_PX,
  textDecoration: 'none',
  cursor: 'pointer',
  transition: VAR_TRANSITION,
};

const BreadcrumbNative = ({
  items,
  maxItems = 0,
  separator,
  ariaLabel = 'Breadcrumb',
  testId,
  className,
  onItemClick,
  onExpandCollapsed,
}: BreadcrumbNativeProps): JSX.Element => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  const { visibleItems, isCollapsed } = computeVisibleItems(items, maxItems);
  const lastIndex = visibleItems.length - 1;

  const renderIcon = (item: BreadcrumbItem, isLast: boolean): ReactNode => {
    if (!isValueDefined(item.icon)) return null;

    return (
      <span
        aria-hidden="true"
        style={{
          ...ICON_CONTAINER_STYLE,
          color: isLast ? VAR_ACTIVE : VAR_ICON,
        }}
      >
        {item.icon}
      </span>
    );
  };

  const renderSep = (index: number): ReactNode => (
    <li key={`sep-${index}`} aria-hidden="true" style={SEPARATOR_STYLE}>
      {renderSeparator(separator)}
    </li>
  );

  const renderItem = (
    item: BreadcrumbItem,
    displayIndex: number,
    isLast: boolean,
  ): ReactNode => {
    const isHovered = hoveredIndex === displayIndex;

    if (isLast)
      return (
        <li key={`item-${displayIndex}`}>
          <span
            aria-current="page"
            aria-label={item.ariaLabel}
            data-testid={item.testId}
            style={{
              ...ITEM_BASE_STYLE,
              color: VAR_ACTIVE,
              fontWeight: 500,
              cursor: 'default',
            }}
          >
            {renderIcon(item, true)}
            {item.text}
          </span>
        </li>
      );

    return (
      <li key={`item-${displayIndex}`}>
        <a
          aria-label={item.ariaLabel}
          data-testid={item.testId}
          href={item.url ?? '#'}
          style={{
            ...ITEM_BASE_STYLE,
            color: isHovered ? VAR_HOVER : VAR_TEXT,
          }}
          onClick={(e) => {
            e.preventDefault();
            onItemClick?.(item, e);
          }}
          onMouseEnter={() => handleMouseEnter(displayIndex)}
          onMouseLeave={handleMouseLeave}
        >
          {renderIcon(item, false)}
          {item.text}
        </a>
      </li>
    );
  };

  const renderEllipsis = (): ReactNode => (
    <li key="ellipsis">
      <button
        aria-label="Show collapsed items"
        style={{
          ...ITEM_BASE_STYLE,
          color: VAR_TEXT,
          background: 'none',
          border: 'none',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit',
        }}
        type="button"
        onClick={onExpandCollapsed}
      >
        {ELLIPSIS_CHAR}
      </button>
    </li>
  );

  const elements: ReactNode[] = [];

  visibleItems.forEach((item, index) => {
    if (index === 1 && isCollapsed) {
      elements.push(renderSep(-1));
      elements.push(renderEllipsis());
    }

    if (index > 0) elements.push(renderSep(index));

    elements.push(renderItem(item, index, index === lastIndex));
  });

  return (
    <nav aria-label={ariaLabel} className={cn(className)} data-testid={testId}>
      <ol style={LIST_STYLE}>{elements}</ol>
    </nav>
  );
};

BreadcrumbNative.displayName = 'BreadcrumbNative';

export default memo(BreadcrumbNative);
export type { BreadcrumbNativeProps, BreadcrumbItem } from './types';
