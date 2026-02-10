import { describe, it, expect, beforeEach, type vi } from 'vitest';

import { injectAlertVariables } from './componentInjector';
import { DEFAULT_COMPONENTS_LIGHT } from '../defaults/defaultComponentsLight';

const EXPECTED_ALERT_CSS_VARS = 19;

describe('injectAlertVariables', () => {
  let mockSetProperty: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockSetProperty = document.documentElement.style.setProperty as ReturnType<typeof vi.fn>;
    mockSetProperty.mockClear();
  });

  it('calls setProperty for all alert CSS variables', () => {
    injectAlertVariables(document.documentElement, DEFAULT_COMPONENTS_LIGHT);
    expect(mockSetProperty).toHaveBeenCalledTimes(EXPECTED_ALERT_CSS_VARS);
  });

  describe('variant-specific variables', () => {
    it('injects success variant colors', () => {
      const alerts = DEFAULT_COMPONENTS_LIGHT.alerts;
      injectAlertVariables(document.documentElement, DEFAULT_COMPONENTS_LIGHT);
      expect(mockSetProperty).toHaveBeenCalledWith(
        '--component-alert-success-bg',
        `rgb(${alerts.success.background})`,
      );
      expect(mockSetProperty).toHaveBeenCalledWith(
        '--component-alert-success-text',
        `rgb(${alerts.success.textColor})`,
      );
      expect(mockSetProperty).toHaveBeenCalledWith(
        '--component-alert-success-border',
        `rgb(${alerts.success.borderColor})`,
      );
      expect(mockSetProperty).toHaveBeenCalledWith(
        '--component-alert-success-icon',
        `rgb(${alerts.success.iconColor})`,
      );
    });

    it('injects warning variant colors', () => {
      const alerts = DEFAULT_COMPONENTS_LIGHT.alerts;
      injectAlertVariables(document.documentElement, DEFAULT_COMPONENTS_LIGHT);
      expect(mockSetProperty).toHaveBeenCalledWith(
        '--component-alert-warning-bg',
        `rgb(${alerts.warning.background})`,
      );
      expect(mockSetProperty).toHaveBeenCalledWith(
        '--component-alert-warning-text',
        `rgb(${alerts.warning.textColor})`,
      );
      expect(mockSetProperty).toHaveBeenCalledWith(
        '--component-alert-warning-border',
        `rgb(${alerts.warning.borderColor})`,
      );
      expect(mockSetProperty).toHaveBeenCalledWith(
        '--component-alert-warning-icon',
        `rgb(${alerts.warning.iconColor})`,
      );
    });

    it('injects error variant colors', () => {
      const alerts = DEFAULT_COMPONENTS_LIGHT.alerts;
      injectAlertVariables(document.documentElement, DEFAULT_COMPONENTS_LIGHT);
      expect(mockSetProperty).toHaveBeenCalledWith(
        '--component-alert-error-bg',
        `rgb(${alerts.error.background})`,
      );
      expect(mockSetProperty).toHaveBeenCalledWith(
        '--component-alert-error-text',
        `rgb(${alerts.error.textColor})`,
      );
      expect(mockSetProperty).toHaveBeenCalledWith(
        '--component-alert-error-border',
        `rgb(${alerts.error.borderColor})`,
      );
      expect(mockSetProperty).toHaveBeenCalledWith(
        '--component-alert-error-icon',
        `rgb(${alerts.error.iconColor})`,
      );
    });

    it('injects info variant colors', () => {
      const alerts = DEFAULT_COMPONENTS_LIGHT.alerts;
      injectAlertVariables(document.documentElement, DEFAULT_COMPONENTS_LIGHT);
      expect(mockSetProperty).toHaveBeenCalledWith(
        '--component-alert-info-bg',
        `rgb(${alerts.info.background})`,
      );
      expect(mockSetProperty).toHaveBeenCalledWith(
        '--component-alert-info-text',
        `rgb(${alerts.info.textColor})`,
      );
      expect(mockSetProperty).toHaveBeenCalledWith(
        '--component-alert-info-border',
        `rgb(${alerts.info.borderColor})`,
      );
      expect(mockSetProperty).toHaveBeenCalledWith(
        '--component-alert-info-icon',
        `rgb(${alerts.info.iconColor})`,
      );
    });
  });

  describe('shared alert variables', () => {
    it('injects border-radius using var() syntax', () => {
      const alerts = DEFAULT_COMPONENTS_LIGHT.alerts;
      injectAlertVariables(document.documentElement, DEFAULT_COMPONENTS_LIGHT);
      expect(mockSetProperty).toHaveBeenCalledWith(
        '--component-alert-border-radius',
        `var(--radius-${alerts.borderRadius})`,
      );
    });

    it('injects border-width', () => {
      const alerts = DEFAULT_COMPONENTS_LIGHT.alerts;
      injectAlertVariables(document.documentElement, DEFAULT_COMPONENTS_LIGHT);
      expect(mockSetProperty).toHaveBeenCalledWith(
        '--component-alert-border-width',
        alerts.borderWidth,
      );
    });

    it('injects padding', () => {
      const alerts = DEFAULT_COMPONENTS_LIGHT.alerts;
      injectAlertVariables(document.documentElement, DEFAULT_COMPONENTS_LIGHT);
      expect(mockSetProperty).toHaveBeenCalledWith('--component-alert-padding', alerts.padding);
    });
  });
});
