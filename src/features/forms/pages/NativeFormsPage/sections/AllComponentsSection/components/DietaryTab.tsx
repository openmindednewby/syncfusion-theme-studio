/**
 * DietaryTab - Dietary preferences tab for the All Components form.
 *
 * Native components used: FormNativeRadio (4x), FormNativeTextarea (2x),
 * SearchInputNative, AccordionNative, DescriptionNative, SeeMoreButton
 */
import { useState, type ChangeEvent } from 'react';

import {
  FormNativeRadio,
  FormNativeTextarea,
} from '@/components/ui/form-fields';
import {
  AccordionNative,
  DescriptionNative,
  SearchInputNative,
  SeeMoreButton,
} from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

import type { AllComponentsFormData } from '../../../forms/AllComponentsForm/schema';
import type { Control } from 'react-hook-form';

interface Props {
  control: Control<AllComponentsFormData>;
}

export const DietaryTab = ({ control }: Props): JSX.Element => {
  const accordionItems = [
    {
      header: FM('forms.native.allComponents.dietary.commonAllergens'),
      content: FM('forms.native.allComponents.dietary.commonAllergensContent'),
    },
    {
      header: FM('forms.native.allComponents.dietary.availableOptions'),
      content: FM('forms.native.allComponents.dietary.availableOptionsContent'),
    },
  ];
  const [searchValue, setSearchValue] = useState('');
  const [showMore, setShowMore] = useState(false);

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>): void {
    setSearchValue(e.target.value);
  }

  function handleToggleMore(): void {
    setShowMore(!showMore);
  }

  return (
    <div className="space-y-6 p-4">
      {/* Info Accordion */}
      <AccordionNative
        items={accordionItems}
        testId="all-comp-accordion"
      />

      {/* Meal Preference (Radio Group) */}
      <div>
        <label className="mb-2 block text-sm font-medium text-text-primary">
          {FM('forms.native.allComponents.fields.mealPreference')}
        </label>
        <div className="space-y-2">
          <FormNativeRadio<AllComponentsFormData>
            control={control}
            label={FM('forms.native.allComponents.meals.standard')}
            name="mealPreference"
            radioValue="standard"
            testId="all-comp-meal-standard"
          />
          <FormNativeRadio<AllComponentsFormData>
            control={control}
            label={FM('forms.native.allComponents.meals.vegetarian')}
            name="mealPreference"
            radioValue="vegetarian"
            testId="all-comp-meal-vegetarian"
          />
          <FormNativeRadio<AllComponentsFormData>
            control={control}
            label={FM('forms.native.allComponents.meals.vegan')}
            name="mealPreference"
            radioValue="vegan"
            testId="all-comp-meal-vegan"
          />
          <FormNativeRadio<AllComponentsFormData>
            control={control}
            label={FM('forms.native.allComponents.meals.glutenFree')}
            name="mealPreference"
            radioValue="gluten-free"
            testId="all-comp-meal-gluten-free"
          />
        </div>
      </div>

      {/* Search for allergens */}
      <div>
        <DescriptionNative testId="all-comp-description">
          {FM('forms.native.allComponents.dietary.searchDescription')}
        </DescriptionNative>
        <SearchInputNative
          placeholder={FM('forms.native.allComponents.dietary.searchPlaceholder')}
          testId="all-comp-allergen-search"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>

      {/* Allergies Textarea */}
      <FormNativeTextarea<AllComponentsFormData>
        fullWidth
        control={control}
        label={FM('forms.native.allComponents.fields.allergies')}
        name="allergies"
        placeholder={FM('forms.native.allComponents.fields.allergiesPlaceholder')}
        rows={3}
        testId="all-comp-allergies"
      />

      {/* See More with Accessibility Notes */}
      <SeeMoreButton
        isExpanded={showMore}
        testId="all-comp-see-more"
        onToggle={handleToggleMore}
      />
      {showMore ? (
        <FormNativeTextarea<AllComponentsFormData>
          fullWidth
          control={control}
          label={FM('forms.native.allComponents.fields.accessibilityNotes')}
          name="accessibilityNotes"
          placeholder={FM('forms.native.allComponents.fields.accessibilityPlaceholder')}
          rows={3}
          testId="all-comp-accessibility-notes"
        />
      ) : null}
    </div>
  );
};
