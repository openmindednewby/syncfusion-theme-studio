import { useCallback, useState } from 'react';

import { FM } from '@/localization/utils/helpers';
import { useHasPermission } from '@/shared/hooks/useHasPermission';
import { Permission } from '@/shared/permissions';

import { PluginCards } from './components/PluginCards';
import { PluginDetail } from './components/PluginDetail';
import { PLUGIN_TEST_PREFIX } from './constants';
import { PLUGINS } from './data/pluginsData';

import type { PluginDto } from './types';

/** Admin page displaying installed plugins with enable/disable toggles. */
const PluginsPage = (): JSX.Element => {
  const hasAdmin = useHasPermission(Permission.AdminAccess);

  const [plugins, setPlugins] = useState(PLUGINS);
  const [detailPlugin, setDetailPlugin] = useState<PluginDto | null>(
    null,
  );

  const handleToggle = useCallback((id: string) => {
    setPlugins((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return { ...item, enabled: !item.enabled };
      }),
    );
  }, []);

  const handleCloseDetail = useCallback(
    () => setDetailPlugin(null),
    [],
  );

  if (!hasAdmin)
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-text-secondary">
          {FM('plugins.noAccess')}
        </p>
      </div>
    );

  const enabledCount = plugins.filter((p) => p.enabled).length;

  return (
    <div
      className="space-y-6"
      data-testid={`${PLUGIN_TEST_PREFIX}-page`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            {FM('plugins.title')}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            {FM('plugins.subtitle')}
          </p>
        </div>
        <div className="rounded-md bg-surface-secondary px-3 py-1.5">
          <span className="text-sm font-medium text-text-primary">
            {FM('plugins.activeCount', String(enabledCount))}
          </span>
        </div>
      </div>

      <PluginCards
        plugins={plugins}
        onToggle={handleToggle}
        onViewDetails={setDetailPlugin}
      />

      <PluginDetail
        plugin={detailPlugin}
        onClose={handleCloseDetail}
      />
    </div>
  );
};

export default PluginsPage;
