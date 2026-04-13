import { useMemo } from 'react';

import { useDialog } from '@/hooks/useDialog';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

import { PLUGIN_TEST_PREFIX } from '../constants';

import type { PluginDto } from '../types';

interface PluginDetailProps {
  plugin: PluginDto | null;
  onClose: () => void;
}

const ENABLED_BADGE =
  'inline-flex items-center rounded-full bg-success-50 px-2.5 py-0.5 text-xs font-medium text-success-700';
const DISABLED_BADGE =
  'inline-flex items-center rounded-full bg-surface-200 px-2.5 py-0.5 text-xs font-medium text-text-muted';

/** Detail dialog showing plugin information, version, and author. */
export const PluginDetail = ({
  plugin,
  onClose,
}: PluginDetailProps): JSX.Element | null => {
  const isOpen = isValueDefined(plugin);
  const dialogOptions = useMemo(() => ({ isOpen, onClose }), [isOpen, onClose]);
  const { backdropProps, dialogProps, titleId } = useDialog(dialogOptions);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      data-testid={`${PLUGIN_TEST_PREFIX}-detail-dialog`}
      {...backdropProps}
    >
      <div
        className="mx-4 w-full max-w-md rounded-lg border border-border bg-surface-primary p-6 shadow-xl"
        {...dialogProps}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{plugin.icon}</span>
            <div>
              <h2
                className="text-lg font-bold text-text-primary"
                id={titleId}
              >
                {plugin.name}
              </h2>
              <span className="text-xs text-text-muted">
                {FM('plugins.versionLabel', plugin.version)}
              </span>
            </div>
          </div>
          <button
            aria-label="Close"
            className="text-text-muted hover:text-text-primary"
            data-testid={`${PLUGIN_TEST_PREFIX}-detail-close`}
            type="button"
            onClick={onClose}
          >
            {'\u2715'}
          </button>
        </div>

        <p className="mb-4 text-sm text-text-secondary">
          {plugin.description}
        </p>

        <div className="mb-4 space-y-2 rounded-md bg-surface-secondary p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">
              {FM('plugins.author')}
            </span>
            <span className="text-xs text-text-primary">
              {plugin.author}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">
              {FM('plugins.version')}
            </span>
            <span className="text-xs text-text-primary">
              {FM('plugins.versionLabel', plugin.version)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">
              {FM('plugins.status')}
            </span>
            <span className={plugin.enabled ? ENABLED_BADGE : DISABLED_BADGE}>
              {FM(plugin.enabled ? 'plugins.enabled' : 'plugins.disabled')}
            </span>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary-hover"
            data-testid={`${PLUGIN_TEST_PREFIX}-detail-done`}
            type="button"
            onClick={onClose}
          >
            {FM('common.close')}
          </button>
        </div>
      </div>
    </div>
  );
};
