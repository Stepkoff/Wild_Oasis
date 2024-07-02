
export const cabinTableOperationsValues= [
  {value: 'all', label: 'All'},
  {value: 'withDiscount', label: 'With discount'},
  {value: 'noDiscount', label: 'No discount'},
]

export const cabinSortOptions= [
  {value: 'cabinName-asc', label: 'Sort by name (A-Z)'},
  {value: 'cabinName-desc', label: 'Sort by name (Z-A)'},
  {value: 'regularPrice-asc', label: 'Sort by price (low first)'},
  {value: 'regularPrice-desc', label: 'Sort by price (high first)'},
  {value: 'maxCapacity-asc', label: 'Sort by capacity (low first)'},
  {value: 'maxCapacity-desc', label: 'Sort by capacity (high first)'},
  // {value: 'startDate-asc', label: 'Sort by Date (low first)'},
  // {value: 'startDate-desc', label: 'Sort by Date (high first)'},
]

// type keys = keyof typeof CabinTableOperationsValues;
// export type CabinTableOperationsValuesType = typeof CabinTableOperationsValues[keys];

