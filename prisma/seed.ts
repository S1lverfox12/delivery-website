import { Prisma } from '@prisma/client';
import { categories, _ingredients, products } from './constants';
import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};
function calculateProductPrice(ingredientIds: number[]): number {
  const selectedIngredients = _ingredients.filter(ingredient =>
      ingredientIds.includes(ingredient.id)
  );
  const totalPrice = selectedIngredients.reduce((sum, ingredient) => {
    return sum + ingredient.price;
  }, 0);
  return totalPrice;
}
const getIngredientConnections = (ids: number[]) => {
  return ids.map(id => ({ id }));
};

const pizza1Ingredients = [1, 4, 5, 6, 12, 13, 2, 15, 7, 16, 3]
const pizza2Ingredients = [1, 4, 5, 6, 12, 13, 2, 15, 7, 10, 11, 9, 8]
const pizza3Ingredients = [1, 4, 5, 6, 12, 13, 2, 15, 7, 14, 3]


console.log(calculateProductPrice(pizza1Ingredients)); // Выведет общую цену для пиццы 1

console.log(calculateProductPrice(pizza2Ingredients)); // Выведет общую цену для пиццы 1

console.log(calculateProductPrice(pizza3Ingredients)); // Выведет общую цену для пиццы 1
const generateProductItem = ({
  productId,
  pizzaType,
  size,
  price,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 1 | 2 | 3;
  price: number
}) => {
  return {
    productId,
    price,
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User Test',
        email: 'user@test.ru',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin Admin',
        email: 'admin@test.ru',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: _ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });






  const pizza1 = await prisma.product.create({
    data: {
      name: 'Бургер с грибами',
      imageUrl:
        '/assets/images/products/burger1.png',
      categoryId: 1,
      ingredients: {
        connect: getIngredientConnections(pizza1Ingredients),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Мясной бургер',
      imageUrl:
        '/assets/images/products/burger2.png',
      categoryId: 1,
      ingredients: {
        connect: getIngredientConnections(pizza2Ingredients),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Куриный бургер',
      imageUrl:
        '/assets/images/products/burger3.png',
      categoryId: 1,
      ingredients: {
        connect: getIngredientConnections(pizza3Ingredients),
      },
    },
  });


  await prisma.productItem.createMany({
    data: [
      // "Бургер с грибами"
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 1, price: calculateProductPrice(pizza1Ingredients)}),
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 2, price: calculateProductPrice(pizza1Ingredients) }),
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 3, price: calculateProductPrice(pizza1Ingredients) }),

      // "Мясной бургер"
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 1, price: calculateProductPrice(pizza2Ingredients) }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 2, price: calculateProductPrice(pizza2Ingredients) }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 3, price: calculateProductPrice(pizza2Ingredients) }),
      // generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 1 }),
      // generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 2 }),
      // generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 3 }),

      // "Куриный бургер
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 1, price: calculateProductPrice(pizza3Ingredients)}),
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 2, price: calculateProductPrice(pizza3Ingredients)}),
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 3, price: calculateProductPrice(pizza3Ingredients)}),

      // Остальные продукты
      generateProductItem({ productId: 1, price: randomDecimalNumber(160,600)}),
      generateProductItem({ productId: 2, price: randomDecimalNumber(160,600)}),
      generateProductItem({ productId: 3, price: randomDecimalNumber(160,600)}),
      generateProductItem({ productId: 4, price: randomDecimalNumber(160,600) }),
      generateProductItem({ productId: 5, price: randomDecimalNumber(160,600)}),
      generateProductItem({ productId: 6, price: randomDecimalNumber(160,600) }),
      generateProductItem({ productId: 7, price: randomDecimalNumber(160,600)}),
      generateProductItem({ productId: 8, price: randomDecimalNumber(160,600)}),
      generateProductItem({ productId: 9, price: randomDecimalNumber(160,600) }),
      generateProductItem({ productId: 10, price: randomDecimalNumber(160,600)}),
      generateProductItem({ productId: 11, price: randomDecimalNumber(160,600)}),
      generateProductItem({ productId: 12, price: randomDecimalNumber(160,600)}),
      generateProductItem({ productId: 13, price: randomDecimalNumber(160,600) }),
      generateProductItem({ productId: 14, price: randomDecimalNumber(160,600) }),
      generateProductItem({ productId: 15, price: randomDecimalNumber(160,600) }),
      generateProductItem({ productId: 16, price: randomDecimalNumber(160,600)}),
      //generateProductItem({ productId: 17, price: 200 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: '11111',
      },
      {
        userId: 2,
        totalAmount: 0,
        token: '222222',
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });

  // await prisma.story.createMany({
  //   data: [
  //     {
  //       previewImageUrl:
  //         'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496',
  //     },
  //     {
  //       previewImageUrl:
  //         'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640',
  //     },
  //     {
  //       previewImageUrl:
  //         'https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020',
  //     },
  //     {
  //       previewImageUrl:
  //         'https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958',
  //     },
  //     {
  //       previewImageUrl:
  //         'https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737',
  //     },
  //     {
  //       previewImageUrl:
  //         'https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284',
  //     },
  //   ],
  // });
  //
  // await prisma.storyItem.createMany({
  //   data: [
  //     {
  //       storyId: 1,
  //       sourceUrl:
  //         'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE',
  //     },
  //     {
  //       storyId: 1,
  //       sourceUrl:
  //         'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE',
  //     },
  //     {
  //       storyId: 1,
  //       sourceUrl:
  //         'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE',
  //     },
  //     {
  //       storyId: 1,
  //       sourceUrl:
  //         'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
  //     },
  //     {
  //       storyId: 1,
  //       sourceUrl:
  //         'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE',
  //     },
  //   ],
  // });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
