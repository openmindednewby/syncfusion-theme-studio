import type { CSSProperties, ReactNode } from 'react';

import { IconChevronDown, IconChevronUp, IconDownload, IconMoreVertical, IconRefreshLast24 } from '@/components/icons';
import {
  ButtonSize,
  DateRangePickerNative,
  IconButtonNative,
  IconButtonVariant,
  PanelAlign,
  SearchInputNative,
  SelectNative,
} from '@/components/ui/native';
import type { SelectNativeOption } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { ComponentTestIds } from '@/shared/testIds.components';
import { isValueDefined } from '@/utils/is';

import { FlexBox } from './FlexBox';

interface SearchPanelRowProps {
  expanded: boolean;
  columnOptions: SelectNativeOption[];
  showColumnPicker: boolean;
  showFilterToggle: boolean;
  showRefresh: boolean;
  showDateRange: boolean;
  showDownload: boolean;
  showMoreActions: boolean;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  onToggleFilter?: () => void;
  onSearch?: (value: string) => void;
  onColumnChange?: (value: string) => void;
  onRefresh?: () => void;
  onDownload?: () => void;
  startDate?: string;
  endDate?: string;
  onDateRangeChange?: (start: string, end: string) => void;
}

const flexOverrides: CSSProperties = {
  background: 'transparent',
  border: 'none',
  borderRadius: 0,
  padding: 0,
};

const searchWidthStyle: CSSProperties = {
  width: 'var(--component-search-panel-search-width)',
  flexShrink: 0,
};

const labelStyle: CSSProperties = {
  color: 'var(--component-search-panel-label)',
  fontSize: 'var(--component-search-panel-label-font-size)',
  fontWeight: 'var(--component-search-panel-label-font-weight)',
  whiteSpace: 'nowrap',
};

const spacerStyle: CSSProperties = { marginLeft: 'auto' };

const slotRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--component-search-panel-gap)',
};

const SearchPanelRow = ({
  expanded,
  columnOptions,
  showColumnPicker,
  showFilterToggle,
  showRefresh,
  showDateRange,
  showDownload,
  showMoreActions,
  leftSlot,
  rightSlot,
  onToggleFilter,
  onSearch,
  onColumnChange,
  onRefresh,
  onDownload,
  startDate,
  endDate,
  onDateRangeChange,
}: SearchPanelRowProps): JSX.Element => {
  const toggleLabel = expanded
    ? FM('gridShowcase.hideFilter')
    : FM('gridShowcase.showFilter');
  const ToggleIcon = expanded ? IconChevronUp : IconChevronDown;

  return (
    <FlexBox align="center" gap="var(--component-search-panel-gap)" style={flexOverrides}>
      {showColumnPicker ? (
        <SelectNative
          options={columnOptions}
          placeholder={FM('common.column')}
          testId={ComponentTestIds.SEARCH_PANEL_COLUMN}
          onChange={(value) => onColumnChange?.(String(value))}
        />
      ) : null}
      <div style={searchWidthStyle}>
        <SearchInputNative
          fullWidth
          placeholder={FM('common.search')}
          testId={ComponentTestIds.SEARCH_PANEL_INPUT}
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
      {showFilterToggle ? (
        <>
          <span style={labelStyle}>{toggleLabel}</span>
          <IconButtonNative
            ariaLabel={toggleLabel}
            icon={<ToggleIcon className="h-4 w-4" />}
            size={ButtonSize.Sm}
            testId={ComponentTestIds.SEARCH_PANEL_TOGGLE}
            variant={IconButtonVariant.Tertiary}
            onClick={onToggleFilter}
          />
        </>
      ) : null}
      {isValueDefined(leftSlot) ? <div data-testid={ComponentTestIds.SEARCH_PANEL_LEFT_SLOT} style={slotRowStyle}>{leftSlot}</div> : null}
      <div style={spacerStyle} />
      {showRefresh ? (
        <IconButtonNative
          ariaLabel={FM('common.refresh')}
          icon={<IconRefreshLast24 />}
          size={ButtonSize.Sm}
          testId={ComponentTestIds.SEARCH_PANEL_REFRESH}
          variant={IconButtonVariant.Outline}
          onClick={onRefresh}
        />
      ) : null}
      {showDateRange ? (
        <DateRangePickerNative
          align={PanelAlign.Right}
          testId={ComponentTestIds.SEARCH_PANEL_DATE_RANGE}
          {...(isValueDefined(endDate) && { endDate })}
          {...(isValueDefined(startDate) && { startDate })}
          {...(isValueDefined(onDateRangeChange) && { onRangeChange: onDateRangeChange })}
        />
      ) : null}
      {showDownload ? (
        <IconButtonNative
          ariaLabel={FM('common.download')}
          icon={<IconDownload className="h-4 w-4" />}
          size={ButtonSize.Sm}
          testId={ComponentTestIds.SEARCH_PANEL_DOWNLOAD}
          variant={IconButtonVariant.Outline}
          onClick={onDownload}
        />
      ) : null}
      {showMoreActions ? (
        <IconButtonNative
          ariaLabel={FM('common.moreActions')}
          icon={<IconMoreVertical className="h-4 w-4" />}
          size={ButtonSize.Sm}
          testId={ComponentTestIds.SEARCH_PANEL_ACTIONS}
          variant={IconButtonVariant.Outline}
        />
      ) : null}
      {isValueDefined(rightSlot) ? <div data-testid={ComponentTestIds.SEARCH_PANEL_RIGHT_SLOT} style={slotRowStyle}>{rightSlot}</div> : null}
    </FlexBox>
  );
};

SearchPanelRow.displayName = 'SearchPanelRow';

export { SearchPanelRow };
