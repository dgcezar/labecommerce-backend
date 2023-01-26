import { CATEGORY } from "./enum";
import { TProduct, TPurchase, TUser } from "./types";

export const users: TUser[] = [
  {
    id: "01",
    email: "bob@gmail.com",
    password: "bob123",
  },
  {
    id: "02",
    email: "bill@gmail.com",
    password: "bill123a",
  },
];

export const products: TProduct[] = [
  {
    id: "p01",
    name: "Produto1",
    price: 40,
    category: CATEGORY.CLOTHES_AND_SHOES,
  },
  {
    id: "p02",
    name: "Produto2",
    price: 20,
    category: CATEGORY.ACCESSORIES,
  },
];

export const purchases: TPurchase[] = [
  {
    userId: users[0].id,
    productId: products[0].id,
    quantity: 3,
    totalPrice: products[0].price * 3,
  },
  {
    userId: users[1].id,
    productId: products[1].id,
    quantity: 6,
    totalPrice: products[1].price * 6,
  },
];