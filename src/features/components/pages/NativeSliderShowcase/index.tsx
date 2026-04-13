import { useId } from 'react';

import { SliderComponent } from '@syncfusion/ej2-react-inputs';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/utils/helpers';
import { ComponentTestIds } from '@/shared/testIds.components';

const SLIDER_MIN = 0;
const SLIDER_MAX = 100;
const SLIDER_DEFAULT_VALUE = 40;
const SLIDER_RANGE_LOW = 25;
const SLIDER_RANGE_HIGH = 75;
const SLIDER_PERCENT_VALUE = 60;
const PERCENT_LABEL_MIN = '0%';
const PERCENT_LABEL_MAX = '100%';

const DEFAULT_SNIPPET = '<SliderComponent min={0} max={100} value={40} />';
const RANGE_SNIPPET = '<SliderComponent type="Range" min={0} max={100} value={[25, 75]} />';
const DISABLED_SNIPPET = '<SliderComponent enabled={false} min={0} max={100} value={40} />';
const PERCENT_SNIPPET = `<div className="flex items-center gap-3">
  <span className="text-xs text-text-secondary">0%</span>
  <SliderComponent type="MinRange" min={0} max={100} value={60} />
  <span className="text-xs text-text-secondary">100%</span>
</div>`;

const NativeSliderShowcase = (): JSX.Element => {
  const sliderId = useId();
  const rangeId = useId();
  const disabledId = useId();
  const percentId = useId();

  return (
    <div className="h-full overflow-y-auto p-6" data-testid={ComponentTestIds.NATIVE_SLIDER_SHOWCASE}>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            {FM('components.sliderShowcase.title')}
          </h2>
          <p className="mt-1 text-text-secondary">
            {FM('components.sliderShowcase.description')}
          </p>
        </div>

        <section className="card space-y-6">
          <h3 className="text-lg font-semibold text-text-primary">
            {FM('components.sliderShowcase.defaultSlider')}
          </h3>
          <div className="max-w-lg space-y-2">
            <label className="sr-only" htmlFor={sliderId}>{FM('components.sliderShowcase.defaultSlider')}</label>
            <SliderComponent id={sliderId} max={SLIDER_MAX} min={SLIDER_MIN} value={SLIDER_DEFAULT_VALUE} />
          </div>
          <CopyableCodeSnippet code={DEFAULT_SNIPPET} />
        </section>

        <section className="card space-y-6">
          <h3 className="text-lg font-semibold text-text-primary">
            {FM('components.sliderShowcase.percentSlider')}
          </h3>
          <p className="text-sm text-text-secondary">
            {FM('components.sliderShowcase.percentSliderDescription')}
          </p>
          <div className="max-w-lg space-y-2">
            <div className="flex items-center gap-3">
              <span className="shrink-0 text-xs text-text-secondary">{PERCENT_LABEL_MIN}</span>
              <label className="sr-only" htmlFor={percentId}>{FM('components.sliderShowcase.percentSlider')}</label>
              <SliderComponent id={percentId} max={SLIDER_MAX} min={SLIDER_MIN} type="MinRange" value={SLIDER_PERCENT_VALUE} />
              <span className="shrink-0 text-xs text-text-secondary">{PERCENT_LABEL_MAX}</span>
            </div>
          </div>
          <CopyableCodeSnippet code={PERCENT_SNIPPET} />
        </section>

        <section className="card space-y-6">
          <h3 className="text-lg font-semibold text-text-primary">
            {FM('components.sliderShowcase.rangeSlider')}
          </h3>
          <div className="max-w-lg space-y-2">
            <label className="sr-only" htmlFor={rangeId}>{FM('components.sliderShowcase.rangeSlider')}</label>
            <SliderComponent id={rangeId} max={SLIDER_MAX} min={SLIDER_MIN} type="Range" value={[SLIDER_RANGE_LOW, SLIDER_RANGE_HIGH]} />
          </div>
          <CopyableCodeSnippet code={RANGE_SNIPPET} />
        </section>

        <section className="card space-y-6">
          <h3 className="text-lg font-semibold text-text-primary">
            {FM('components.sliderShowcase.disabledSlider')}
          </h3>
          <div className="max-w-lg space-y-2">
            <label className="sr-only" htmlFor={disabledId}>{FM('components.sliderShowcase.disabledSlider')}</label>
            <SliderComponent enabled={false} id={disabledId} max={SLIDER_MAX} min={SLIDER_MIN} value={SLIDER_DEFAULT_VALUE} />
          </div>
          <CopyableCodeSnippet code={DISABLED_SNIPPET} />
        </section>
      </div>
    </div>
  );
};

export default NativeSliderShowcase;
