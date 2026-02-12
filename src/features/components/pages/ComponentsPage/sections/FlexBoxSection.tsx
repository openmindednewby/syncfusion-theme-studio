import { memo } from 'react';

import { FM } from '@/localization/helpers';
import { useThemeStore } from '@/stores/useThemeStore';

const DEMO_ITEM_COUNT = 6;
const DEMO_ITEMS = Array.from({ length: DEMO_ITEM_COUNT }, (_, i) => i + 1);

const COLUMN_ITEM_COUNT = 4;
const COLUMN_ITEMS = Array.from({ length: COLUMN_ITEM_COUNT }, (_, i) => i + 1);

export const FlexBoxSection = memo((): JSX.Element => {
  const { theme, mode } = useThemeStore();
  const flex = theme.components[mode].flexBox;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: flex.direction,
    flexWrap: flex.wrap,
    justifyContent: flex.justifyContent,
    alignItems: flex.alignItems,
    gap: flex.gap,
    background: `rgb(${flex.containerBackground})`,
    border: `1px solid rgb(${flex.containerBorderColor})`,
    borderRadius: `var(--radius-${flex.containerBorderRadius}, ${flex.containerBorderRadius})`,
    padding: flex.containerPadding,
  };

  const itemStyle: React.CSSProperties = {
    background: `rgb(${flex.itemBackground})`,
    border: `1px solid rgb(${flex.itemBorderColor})`,
    borderRadius: `var(--radius-${flex.itemBorderRadius}, ${flex.itemBorderRadius})`,
    padding: flex.itemPadding,
    minWidth: '80px',
    textAlign: 'center',
  };

  return (
    <>
      {/* Native CSS Flexbox */}
      <section className="card">
        <h3 className="mb-2 text-lg font-semibold text-text-primary">
          {FM('components.sections.flexBox')}
        </h3>
        <p className="mb-4 text-sm text-text-secondary">
          {FM('components.flexBox.description')}
        </p>

        <h4 className="mb-2 font-medium text-text-primary">{FM('components.flexBox.themedContainer')}</h4>
        <div style={containerStyle}>
          {DEMO_ITEMS.map((n) => (
            <div key={n} className="text-sm font-medium text-text-primary" style={itemStyle}>
              {FM('components.flexBox.item', String(n))}
            </div>
          ))}
        </div>

        <h4 className="mb-2 mt-6 font-medium text-text-primary">{FM('components.flexBox.columnDirection')}</h4>
        <div
          style={{
            ...containerStyle,
            flexDirection: 'column',
            maxWidth: '200px',
          }}
        >
          {COLUMN_ITEMS.map((n) => (
            <div key={n} className="text-sm font-medium text-text-primary" style={itemStyle}>
              {FM('components.flexBox.item', String(n))}
            </div>
          ))}
        </div>

        <h4 className="mb-2 mt-6 font-medium text-text-primary">{FM('components.flexBox.justifyAlignVariants')}</h4>
        <div className="space-y-3">
          <div>
            <span className="mb-1 block text-xs text-text-muted">{FM('components.flexBox.spaceBetweenCenter')}</span>
            <div
              style={{
                ...containerStyle,
                justifyContent: 'space-between',
                alignItems: 'center',
                minHeight: '60px',
              }}
            >
              <div className="text-sm font-medium text-text-primary" style={itemStyle}>{FM('components.flexBox.item', '1')}</div>
              <div className="text-sm font-medium text-text-primary" style={{ ...itemStyle, padding: '20px 12px' }}>{FM('components.flexBox.item', '2')}</div>
              <div className="text-sm font-medium text-text-primary" style={itemStyle}>{FM('components.flexBox.item', '3')}</div>
            </div>
          </div>
          <div>
            <span className="mb-1 block text-xs text-text-muted">{FM('components.flexBox.centerCenter')}</span>
            <div
              style={{
                ...containerStyle,
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60px',
              }}
            >
              <div className="text-sm font-medium text-text-primary" style={itemStyle}>{FM('components.flexBox.item', '1')}</div>
              <div className="text-sm font-medium text-text-primary" style={itemStyle}>{FM('components.flexBox.item', '2')}</div>
            </div>
          </div>
          <div>
            <span className="mb-1 block text-xs text-text-muted">{FM('components.flexBox.spaceEvenlyStretch')}</span>
            <div
              style={{
                ...containerStyle,
                justifyContent: 'space-evenly',
                alignItems: 'stretch',
                minHeight: '80px',
              }}
            >
              <div className="text-sm font-medium text-text-primary" style={itemStyle}>{FM('components.flexBox.item', '1')}</div>
              <div className="text-sm font-medium text-text-primary" style={itemStyle}>{FM('components.flexBox.item', '2')}</div>
              <div className="text-sm font-medium text-text-primary" style={itemStyle}>{FM('components.flexBox.item', '3')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Syncfusion Splitter as Flex Alternative */}
      <section className="card">
        <h3 className="mb-2 text-lg font-semibold text-text-primary">
          {FM('components.sections.flexBoxSyncfusion')}
        </h3>
        <p className="mb-4 text-sm text-text-secondary">
          {FM('components.flexBox.syncfusionDescription')}
        </p>
        <div className="flex gap-4" style={{ background: `rgb(${flex.containerBackground})`, padding: flex.containerPadding, borderRadius: `var(--radius-${flex.containerBorderRadius}, ${flex.containerBorderRadius})`, border: `1px solid rgb(${flex.containerBorderColor})` }}>
          <div className="flex-1 text-sm font-medium text-text-primary" style={itemStyle}>
            {FM('components.flexBox.pane', '1', '1')}
          </div>
          <div className="flex-1 text-sm font-medium text-text-primary" style={itemStyle}>
            {FM('components.flexBox.pane', '2', '1')}
          </div>
          <div className="flex-[2] text-sm font-medium text-text-primary" style={itemStyle}>
            {FM('components.flexBox.pane', '3', '2')}
          </div>
        </div>
      </section>
    </>
  );
});

FlexBoxSection.displayName = 'FlexBoxSection';
