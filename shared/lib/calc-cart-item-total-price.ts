import { CartItemDTO } from '../services/dto/cart.dto';

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
  console.log(ingredientsPrice);
  console.log(item.productItem.price);
  if (ingredientsPrice === 0) {
    return (ingredientsPrice + item.productItem.price) * item.quantity;
  } else {
    return (ingredientsPrice) * item.quantity;
  }
}
