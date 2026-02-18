/** Filter comparison operators for native grid column filtering */
const enum FilterOperator {
  Contains = 'contains',
  DoesNotContain = 'doesNotContain',
  StartsWith = 'startsWith',
  DoesNotStartWith = 'doesNotStartWith',
  EndsWith = 'endsWith',
  DoesNotEndWith = 'doesNotEndWith',
  Equal = 'equal',
  NotEqual = 'notEqual',
  Empty = 'empty',
  NotEmpty = 'notEmpty',
  GreaterThan = 'greaterThan',
  GreaterThanOrEqual = 'greaterThanOrEqual',
  LessThan = 'lessThan',
  LessThanOrEqual = 'lessThanOrEqual',
}

export { FilterOperator };
