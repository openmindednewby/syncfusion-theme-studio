import { FM } from '@/localization/utils/helpers';

import { PLUGIN_TEST_PREFIX } from '../constants';

interface PluginToggleProps {
  pluginId: string;
  enabled: boolean;
  onToggle: (id: string) => void;
}

const ENABLED_TRACK =
  'relative inline-flex h-6 w-11 cursor-pointer rounded-full bg-brand-primary transition-colors';
const DISABLED_TRACK =
  'relative inline-flex h-6 w-11 cursor-pointer rounded-full bg-gray-300 transition-colors dark:bg-gray-600';

const KNOB_TRANSLATE_ON = 'translate-x-5';
const KNOB_TRANSLATE_OFF = 'translate-x-0';

const KNOB_BASE =
  'inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform mt-0.5 ml-0.5';

/** Toggle switch for enabling/disabling a plugin. */
export const PluginToggle = ({
  pluginId,
  enabled,
  onToggle,
}: PluginToggleProps): JSX.Element => (
  <button
    aria-checked={enabled}
    aria-label={FM(enabled ? 'plugins.disable' : 'plugins.enable')}
    className={enabled ? ENABLED_TRACK : DISABLED_TRACK}
    data-testid={`${PLUGIN_TEST_PREFIX}-toggle-${pluginId}`}
    role="switch"
    type="button"
    onClick={() => onToggle(pluginId)}
  >
    <span
      className={`${KNOB_BASE} ${enabled ? KNOB_TRANSLATE_ON : KNOB_TRANSLATE_OFF}`}
    />
  </button>
);
