import type { Category } from '@/api/generated/dummyjson/models';
import { Button, ButtonVariant } from '@/components/ui/syncfusion';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const VISIBLE_CATEGORIES_COUNT = 5;

interface CategoryFilterProps {
  selectedCategory: string;
  categories: Category[];
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({
  selectedCategory,
  categories,
  onCategoryChange,
}: CategoryFilterProps): JSX.Element => (
  <div className="flex flex-wrap gap-2" data-testid={TestIds.PRODUCTS_CATEGORY_FILTER}>
    <Button
      testId="category-filter-all"
      variant={selectedCategory === 'all' ? ButtonVariant.Primary : ButtonVariant.Secondary}
      onClick={() => onCategoryChange('all')}
    >
      {FM('products.allCategories')}
    </Button>
    {categories.slice(0, VISIBLE_CATEGORIES_COUNT).map((cat) => {
      const isSelected = selectedCategory === cat.slug;
      const variant = isSelected ? ButtonVariant.Primary : ButtonVariant.Secondary;

      return (
        <Button
          key={cat.slug}
          testId={`category-filter-${cat.slug}`}
          variant={variant}
          onClick={() => onCategoryChange(cat.slug ?? '')}
        >
          {cat.name}
        </Button>
      );
    })}
  </div>
);
