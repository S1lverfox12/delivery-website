'use client';

import React from 'react';
import { Ingredient, ProductItem } from '@prisma/client';

import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { IngredientItem } from './ingredient-item';
import { cn } from '@/shared/lib/utils';
import { getPizzaDetails } from '@/shared/lib';
import { usePizzaOptions } from '@/shared/hooks';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

/**
 * Форма выбора ПИЦЦЫ
 */
export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}) => {
  const allIngredientIds = ingredients.map((ingredient) => ingredient.id);
  const {
    size,
    type,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(items, allIngredientIds);
  const filteredIngredients = ingredients.filter((ingredient) => {
    if (type === 2) { // Вегетарианская пицца
      return ingredient.isVegetarian; // Предположим, что у ингредиента есть свойство isVegetarian
    }
    return true; // Для обычной пиццы показываем все ингредиенты
  });

  const { totalPrice, textDetaills } = getPizzaDetails(
    type,
    size,
    items,
    filteredIngredients,
    selectedIngredients,
  );


  // Фильтруем ингредиенты в зависимости от типа пиццы
  // const filteredIngredients = ingredients.filter((ingredient) => {
  //   if (type === 2) { // Вегетарианская пицца
  //     return ingredient.isVegetarian; // Предположим, что у ингредиента есть свойство isVegetarian
  //   }
  //   return true; // Для обычной пиццы показываем все ингредиенты
  // });


  const handleClickAdd = () => {
    if (currentItemId) {
      const selectedIngredientIds = Array.from(selectedIngredients);
      const filteredIngredientIds = filteredIngredients.map(ingredient => ingredient.id);

      // Find the intersection of selected and filtered ingredient IDs
      const intersection = selectedIngredientIds.filter(id => filteredIngredientIds.includes(id));

      // Submit the intersection of ingredient IDs
      onSubmit(currentItemId, intersection);
    }
  };

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl}/>

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetaills}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {filteredIngredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
