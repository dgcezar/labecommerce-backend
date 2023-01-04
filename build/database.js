"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserid = exports.createPurchase = exports.purchases = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.products = exports.getAllUsers = exports.createUser = exports.users = void 0;
const enum_1 = require("./enum");
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
function createUser(id, email, password) {
    const newUser = { id: id, email: email, password: password };
    exports.users.push(newUser);
    console.log("Usuário criado com sucesso");
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
exports.products = [
    {
        id: "p01",
        name: "Produto1",
        price: 40,
        category: enum_1.CATEGORY.CLOTHES_AND_SHOES,
    },
    {
        id: "p02",
        name: "Produto2",
        price: 20,
        category: enum_1.CATEGORY.ACCESSORIES,
    },
];
function createProduct(id, name, price, category) {
    const newProduct = {
        id: id,
        name: name,
        price: price,
        category: category,
    };
    exports.products.push(newProduct);
    console.log("produto criado com sucesso");
}
exports.createProduct = createProduct;
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
function getProductById(idToSearch) {
    return exports.products.filter((product) => {
        if (product.id === idToSearch) {
            return product;
        }
    });
}
exports.getProductById = getProductById;
function queryProductsByName(q) {
    return exports.products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase());
    });
}
exports.queryProductsByName = queryProductsByName;
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
function createPurchase(userId, productId, quantity, totalPrice) {
    const newPurchase = {
        userId: userId,
        productId: productId,
        quantity: quantity,
        totalPrice: totalPrice,
    };
    exports.purchases.push(newPurchase);
    console.log("compra realizada com sucesso");
}
exports.createPurchase = createPurchase;
function getAllPurchasesFromUserid(userIdToSearch) {
    return exports.purchases.filter((purchase) => {
        if (purchase.userId === userIdToSearch) {
            return purchase;
        }
    });
}
exports.getAllPurchasesFromUserid = getAllPurchasesFromUserid;
//# sourceMappingURL=database.js.map