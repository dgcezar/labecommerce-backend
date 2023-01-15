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

// export function createPurchase(
//   userId: string,
//   productId: string,
//   quantity: number,
//   totalPrice: number
// ): void {
//   const newPurchase: TPurchase = {
//     userId: userId,
//     productId: productId,
//     quantity: quantity,
//     totalPrice: totalPrice,
//   };
//   purchases.push(newPurchase);
//   console.log("compra realizada com sucesso");
// }

// export function getAllPurchasesFromUserid(userIdToSearch: string): TPurchase[] | undefined {
//     return purchases.filter((purchase) => {
//     if (purchase.userId === userIdToSearch) {
//       return purchase;
//     }
//   });
// }

// export function createUser(id: string, email: string, password: string): void {
//   const newUser: TUser = { id: id, email: email, password: password };
//   users.push(newUser);
//   console.log("Usuário criado com sucesso");
// }

// export function getAllUsers(): TUser[] {
//   return users;
// }

// export function createProduct(
//   id: string,
//   name: string,
//   price: number,
//   category: CATEGORY
// ): void {
//   const newProduct: TProduct = {
//     id: id,
//     name: name,
//     price: price,
//     category: category,
//   };
//   products.push(newProduct);
//   console.log("produto criado com sucesso");
// }

// export function getAllProducts(): TProduct[] {
//   return products;
// }

// export function getProductById(idToSearch: string): TProduct[] | undefined {
//   return products.filter((product) => {
//     if (product.id === idToSearch) {
//       return product;
//     }
//   });
// }

// export function queryProductsByName(q: string) {
//   return products.filter((product) => {
//     return product.name.toLowerCase().includes(q.toLowerCase());
//   });
// }