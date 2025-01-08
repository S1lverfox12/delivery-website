export const mapPizzaSize = {
  1: 'Овощная',
  2: 'Куриная',
  3: 'Говяжья',
} as const;

export const mapPizzaType = {
  1: 'Обычный',
  2: 'Вегетарианский',
} as const;

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
  name,
  value,
}));

export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
  name,
  value,
}));

export type PizzaSize = keyof typeof mapPizzaSize;
export type PizzaType = keyof typeof mapPizzaType;
