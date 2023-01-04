"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
exports.users = [
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
exports.products = [
    {
        id: "p01",
        name: "Produto1",
        price: 40,
        category: "roupas-camiseta",
    },
    {
        id: "p02",
        name: "Produto2",
        price: 20,
        category: "roupas-chinelo",
    },
];
exports.purchases = [
    {
        userId: exports.users[0].id,
        productId: exports.products[0].id,
        quantity: 3,
        totalPrice: exports.products[0].price * 3,
    },
    {
        userId: exports.users[1].id,
        productId: exports.products[1].id,
        quantity: 6,
        totalPrice: exports.products[1].price * 6,
    },
];
//# sourceMappingURL=database.js.map