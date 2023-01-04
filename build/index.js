"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const enum_1 = require("./enum");
(0, database_1.createUser)("0922", "asd@gmail.com", "92041");
console.log((0, database_1.getAllUsers)());
console.log((0, database_1.createProduct)("p033", "Pulseira", 12, enum_1.CATEGORY.ACCESSORIES));
console.log((0, database_1.getAllProducts)());
console.log((0, database_1.getProductById)("p01"));
console.log((0, database_1.createPurchase)("01", "p02", 2, 5));
console.log((0, database_1.getAllPurchasesFromUserid)("01"));
//# sourceMappingURL=index.js.map