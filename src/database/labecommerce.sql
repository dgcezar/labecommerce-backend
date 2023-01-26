-- Active: 1674490575593@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

SELECT * FROM users;

INSERT INTO users (id, email, password)
VALUES  
    (1, "charmander@gmail.com", "char123"),
    (2, "bulbasaur@gmail.com", "bulba231"),
    (3, "squirtle@gmail.com", "sqt12345");

DROP TABLE users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

SELECT * FROM products;

INSERT INTO products (id, name, price, category)
VALUES 
    ("1", "Camiseta Charmander", 42, "CLOTHES_AND_SHOES"),
    ("2", "Casaco Bulbasaur", 120, "CLOTHES_AND_SHOES"),
    ("3", "Pulseira Charmander", 20, "ACCESSORIES"),
    ("4", "Boné Squirtle", 50, "ACCESSORIES"),
    ("5", "Relógio Primeira Geração", 200, "ACCESSORIES");

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
)