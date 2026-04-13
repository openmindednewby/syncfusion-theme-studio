import { useCallback, useMemo, useState } from 'react';

import { FM } from '@/localization/utils/helpers';
import { useHasPermission } from '@/shared/hooks/useHasPermission';
import { Permission } from '@/shared/permissions';

import { IntegrationCards } from './components/IntegrationCards';
import { IntegrationDetail } from './components/IntegrationDetail';
import { IntegrationSearch } from './components/IntegrationSearch';
import {
  ALL_CATEGORIES_VALUE,
  INTEGRATION_TEST_PREFIX,
} from './constants';
import { INTEGRATIONS } from './data/integrationsData';
import { IntegrationStatus } from './types';

import type { IntegrationDto } from './types';

/** Admin page displaying the integrations marketplace with search, filter, and connect/disconnect. */
const IntegrationsPage = (): JSX.Element => {
  const hasAdmin = useHasPermission(Permission.AdminAccess);

  const [integrations, setIntegrations] = useState(INTEGRATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState(ALL_CATEGORIES_VALUE);
  const [detailIntegration, setDetailIntegration] =
    useState<IntegrationDto | null>(null);

  const handleToggle = useCallback((id: string) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          status:
            item.status === IntegrationStatus.Connected
              ? IntegrationStatus.Disconnected
              : IntegrationStatus.Connected,
        };
      }),
    );
  }, []);

  const handleCloseDetail = useCallback(
    () => setDetailIntegration(null),
    [],
  );

  const filtered = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();

    return integrations.filter((item) => {
      const matchesSearch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery);

      const matchesCategory =
        selectedCategory === ALL_CATEGORIES_VALUE ||
        String(item.category) === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [integrations, searchQuery, selectedCategory]);

  if (!hasAdmin)
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-text-secondary">
          {FM('integrations.noAccess')}
        </p>
      </div>
    );

  return (
    <div
      className="space-y-6"
      data-testid={`${INTEGRATION_TEST_PREFIX}-page`}
    >
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('integrations.title')}
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('integrations.subtitle')}
        </p>
      </div>

      <IntegrationSearch
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onSearchChange={setSearchQuery}
      />

      <IntegrationCards
        integrations={filtered}
        onToggle={handleToggle}
        onViewDetails={setDetailIntegration}
      />

      <IntegrationDetail
        integration={detailIntegration}
        onClose={handleCloseDetail}
      />
    </div>
  );
};

export default IntegrationsPage;
