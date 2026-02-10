import { useEffect } from 'react';

import { MessageComponent } from '@syncfusion/ej2-react-notifications';

import { FM } from '@/localization/helpers';
import { loadSyncfusionCss } from '@/utils';

/** Syncfusion MessageComponent severity string values */
const SEVERITY_INFO = 'Info';
const SEVERITY_SUCCESS = 'Success';
const SEVERITY_WARNING = 'Warning';
const SEVERITY_ERROR = 'Error';

/** Syncfusion MessageComponent variant string values */
const VARIANT_TEXT = 'Text';
const VARIANT_OUTLINED = 'Outlined';
const VARIANT_FILLED = 'Filled';

export const AlertsSection = (): JSX.Element => {
  useEffect(() => {
    loadSyncfusionCss('notifications').catch(() => {});
  }, []);

  return (
    <section className="space-y-6">
      <h3 className="text-xl font-semibold text-text-primary">{FM('components.alerts.title')}</h3>

      {/* Filled Variant (default) */}
      <div className="space-y-4">
        <h4 className="font-medium text-text-secondary">{FM('components.alerts.filled')}</h4>
        <div className="space-y-3">
          <MessageComponent showIcon severity={SEVERITY_SUCCESS} variant={VARIANT_FILLED}>
            {FM('components.alerts.successMessage')}
          </MessageComponent>
          <MessageComponent showIcon severity={SEVERITY_WARNING} variant={VARIANT_FILLED}>
            {FM('components.alerts.warningMessage')}
          </MessageComponent>
          <MessageComponent showIcon severity={SEVERITY_ERROR} variant={VARIANT_FILLED}>
            {FM('components.alerts.errorMessage')}
          </MessageComponent>
          <MessageComponent showIcon severity={SEVERITY_INFO} variant={VARIANT_FILLED}>
            {FM('components.alerts.infoMessage')}
          </MessageComponent>
        </div>
      </div>

      {/* Outlined Variant */}
      <div className="space-y-4">
        <h4 className="font-medium text-text-secondary">{FM('components.alerts.outlined')}</h4>
        <div className="space-y-3">
          <MessageComponent showIcon severity={SEVERITY_SUCCESS} variant={VARIANT_OUTLINED}>
            {FM('components.alerts.successMessage')}
          </MessageComponent>
          <MessageComponent showIcon severity={SEVERITY_WARNING} variant={VARIANT_OUTLINED}>
            {FM('components.alerts.warningMessage')}
          </MessageComponent>
          <MessageComponent showIcon severity={SEVERITY_ERROR} variant={VARIANT_OUTLINED}>
            {FM('components.alerts.errorMessage')}
          </MessageComponent>
          <MessageComponent showIcon severity={SEVERITY_INFO} variant={VARIANT_OUTLINED}>
            {FM('components.alerts.infoMessage')}
          </MessageComponent>
        </div>
      </div>

      {/* Text Variant */}
      <div className="space-y-4">
        <h4 className="font-medium text-text-secondary">{FM('components.alerts.text')}</h4>
        <div className="space-y-3">
          <MessageComponent showIcon severity={SEVERITY_SUCCESS} variant={VARIANT_TEXT}>
            {FM('components.alerts.successMessage')}
          </MessageComponent>
          <MessageComponent showIcon severity={SEVERITY_INFO} variant={VARIANT_TEXT}>
            {FM('components.alerts.infoMessage')}
          </MessageComponent>
        </div>
      </div>

      {/* Dismissible */}
      <div className="space-y-4">
        <h4 className="font-medium text-text-secondary">{FM('components.alerts.dismissible')}</h4>
        <div className="space-y-3">
          <MessageComponent
            showCloseIcon
            showIcon
            severity={SEVERITY_INFO}
            variant={VARIANT_FILLED}
          >
            {FM('components.alerts.dismissibleMessage')}
          </MessageComponent>
        </div>
      </div>
    </section>
  );
};
