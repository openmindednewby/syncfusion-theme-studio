import { useId } from 'react';

import {
  SliderComponent,
  NumericTextBoxComponent,
  ColorPickerComponent,
  RatingComponent,
} from '@syncfusion/ej2-react-inputs';

import { FM } from '@/localization/helpers';

const SLIDER_DEFAULT_VALUE = 50;
const SLIDER_MIN = 0;
const SLIDER_MAX = 100;
const SLIDER_RANGE_LOW = 20;
const SLIDER_RANGE_HIGH = 80;
const NUMERIC_DEFAULT_VALUE = 42;
const NUMERIC_MIN = 0;
const NUMERIC_MAX = 1000;
const PERCENTAGE_MIN = 0;
const PERCENTAGE_MAX = 1;
const PERCENTAGE_STEP = 0.01;
const PERCENTAGE_VALUE = 0.42;
const RATING_DEFAULT_VALUE = 3.5;
const RATING_MAX = 5;
const RATING_READONLY_VALUE = 4;
const RATING_RESET_VALUE = 2;

export const AdvancedInputsSection = (): JSX.Element => {
  const sliderDefaultId = useId();
  const sliderRangeId = useId();
  const sliderDisabledId = useId();
  const numericDefaultId = useId();
  const numericCurrencyId = useId();
  const numericPercentageId = useId();
  const colorDefaultId = useId();
  const colorPaletteId = useId();
  const colorDisabledId = useId();

  return (
    <section className="space-y-6">
      <h3 className="text-xl font-semibold text-text-primary">{FM('components.advancedInputs')}</h3>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Slider */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-secondary">{FM('components.slider')}</h4>
          <div className="space-y-6 pt-4">
            <div className="space-y-2">
              <label className="text-sm text-text-muted" htmlFor={sliderDefaultId}>Default Slider</label>
              <SliderComponent id={sliderDefaultId} max={SLIDER_MAX} min={SLIDER_MIN} value={SLIDER_DEFAULT_VALUE} />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-text-muted" htmlFor={sliderRangeId}>Range Slider</label>
              <SliderComponent id={sliderRangeId} max={SLIDER_MAX} min={SLIDER_MIN} type="Range" value={[SLIDER_RANGE_LOW, SLIDER_RANGE_HIGH]} />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-text-muted" htmlFor={sliderDisabledId}>Disabled Slider</label>
              <SliderComponent enabled={false} id={sliderDisabledId} max={SLIDER_MAX} min={SLIDER_MIN} value={SLIDER_DEFAULT_VALUE} />
            </div>
          </div>
        </div>

        {/* Numeric TextBox */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-secondary">{FM('components.numericInput')}</h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-text-muted" htmlFor={numericDefaultId}>Default Numeric</label>
              <NumericTextBoxComponent
                format="n0"
                id={numericDefaultId}
                max={NUMERIC_MAX}
                min={NUMERIC_MIN}
                placeholder="Enter number"
                value={NUMERIC_DEFAULT_VALUE}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-text-muted" htmlFor={numericCurrencyId}>Currency Format</label>
              <NumericTextBoxComponent
                currency="USD"
                format="c2"
                id={numericCurrencyId}
                max={NUMERIC_MAX}
                min={NUMERIC_MIN}
                placeholder="Enter amount"
                value={NUMERIC_DEFAULT_VALUE}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-text-muted" htmlFor={numericPercentageId}>Percentage Format</label>
              <NumericTextBoxComponent
                format="p2"
                id={numericPercentageId}
                max={PERCENTAGE_MAX}
                min={PERCENTAGE_MIN}
                placeholder="Enter percentage"
                step={PERCENTAGE_STEP}
                value={PERCENTAGE_VALUE}
              />
            </div>
          </div>
        </div>

        {/* Color Picker */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-secondary">{FM('components.colorPicker')}</h4>
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <label className="text-sm text-text-muted" htmlFor={colorDefaultId}>Default</label>
              <ColorPickerComponent id={colorDefaultId} value="#3B82F6" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-text-muted" htmlFor={colorPaletteId}>Palette Mode</label>
              <ColorPickerComponent id={colorPaletteId} mode="Palette" value="#10B981" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-text-muted" htmlFor={colorDisabledId}>Disabled</label>
              <ColorPickerComponent disabled id={colorDisabledId} value="#EF4444" />
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-secondary">{FM('components.rating')}</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <RatingComponent itemsCount={RATING_MAX} value={RATING_DEFAULT_VALUE} />
              <span className="text-sm text-text-muted">3.5 / 5</span>
            </div>
            <div className="flex items-center gap-4">
              <RatingComponent readOnly itemsCount={RATING_MAX} value={RATING_READONLY_VALUE} />
              <span className="text-sm text-text-muted">Read-only</span>
            </div>
            <div className="flex items-center gap-4">
              <RatingComponent allowReset itemsCount={RATING_MAX} value={RATING_RESET_VALUE} />
              <span className="text-sm text-text-muted">With reset</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
