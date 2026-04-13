import { FM } from '@/localization/utils/helpers';

interface EmptyStateProps {
  category: string;
}

export const EmptyState = ({ category }: EmptyStateProps): JSX.Element => (
  <div className="card p-6 text-center">
    <p className="text-lg font-medium text-text-primary">{FM('products.noProductsFound')}</p>
    <p className="mt-1 text-sm text-text-muted">{FM('products.noProductsInCategory', category)}</p>
  </div>
);
