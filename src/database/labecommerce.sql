-- Active: 1674490575593@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    create_at TEXT DEFAULT (DATETIME()) NOT NULL
);

SELECT * FROM users;

INSERT INTO users (id, name, email, password)
VALUES  
    (1, "Charmander", "charmander@gmail.com", "char123"),
    (2, "Bulbasaur", "bulbasaur@gmail.com", "bulba231"),
    (3, "Squirtle", "squirtle@gmail.com", "sqt12345");

DROP TABLE users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

SELECT * FROM products;

INSERT INTO products (id, name, price, description, image_url)
VALUES 
    ("1", "Camiseta-Charmander", 42, "Camiseta do charmander com estampa na frente e no verso.", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPRCftScU_qyGcysaxv69bgN1E8mvzlOQ8XBmK9EQ&s"),
    ("2", "Casaco-Bulbasaur", 120, "Casaco do bulbasaur com estampa na frente.", "https://cf.shopee.com.br/file/88ca92f81229497252b66358a7f748c5_tn"),
    ("3", "Pulseira-Charmander", 20, "Pulseira do charmander com a imagem do charmander desenhada.", "https://cf.shopee.com.br/file/16a44e9eb28d9d0e41d2e309c4e315ca"),
    ("4", "Boné-Squirtle", 50, "Boné de aba reta do squirtle com desenho estampado na frente.", "https://ae01.alicdn.com/kf/H7569bd7e5b53499da0e69f55aa81d8b6o.jpg?width=800&height=800&hash=1600"),
    ("5", "Relógio-Primeira-Geração", 200, "Relógio com desenho de fundo de vários pokemons da primeira geração.", "https://conteudo.imguol.com.br/c/entretenimento/1c/2017/05/16/relogio-pokemon---romain-jerome-1494943530685_v2_4x3.jpg");

DROP TABLE products;

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
)