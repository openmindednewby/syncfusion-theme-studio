import { FM } from '@/localization/utils/helpers';

import { PLUGIN_TEST_PREFIX } from '../constants';
import { PluginToggle } from './PluginToggle';

import type { PluginDto } from '../types';

interface PluginCardsProps {
  plugins: PluginDto[];
  onToggle: (id: string) => void;
  onViewDetails: (plugin: PluginDto) => void;
}

/** Grid of plugin cards showing name, version, author, and toggle. */
export const PluginCards = ({
  plugins,
  onToggle,
  onViewDetails,
}: PluginCardsProps): JSX.Element => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {plugins.map((plugin) => (
      <div
        key={plugin.id}
        className="card flex flex-col gap-3 p-5 transition-shadow hover:shadow-md"
        data-testid={`${PLUGIN_TEST_PREFIX}-card-${plugin.id}`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{plugin.icon}</span>
            <div>
              <h3 className="text-sm font-semibold text-text-primary">
                {plugin.name}
              </h3>
              <span className="text-xs text-text-muted">
                {FM('plugins.versionLabel', plugin.version)}
              </span>
            </div>
          </div>
          <PluginToggle
            enabled={plugin.enabled}
            pluginId={plugin.id}
            onToggle={onToggle}
          />
        </div>
        <p className="flex-1 text-xs text-text-secondary">
          {plugin.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-muted">
            {FM('plugins.by')} {plugin.author}
          </span>
          <button
            className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-text-secondary hover:bg-surface-secondary"
            data-testid={`${PLUGIN_TEST_PREFIX}-details-${plugin.id}`}
            type="button"
            onClick={() => onViewDetails(plugin)}
          >
            {FM('plugins.details')}
          </button>
        </div>
      </div>
    ))}
  </div>
);
