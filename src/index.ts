import express, { Request, Response } from "express";
import cors from "cors";
import { CATEGORY } from "./enum";
import { TUser, TProduct, TPurchase } from "./types";
import { products, purchases, users } from "./database";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

// GET

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

app.get("/users", (req: Request, res: Response) => {
  try {
    res.status(200).send(users);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

app.get("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = users.find((user) => user.id === id);

    if (!result) {
      res.statusCode = 404;
      throw new Error("'id' de usuário não existe");
    }

    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    res.send(error.message);
  }
});

app.get("/users/:id/purchases", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = purchases.find((purchase) => purchase.userId === id);

    if (!result) {
      res.statusCode = 404;
      throw new Error("'id' de usuário não existe");
    }

    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    res.send(error.message);
  }
});

app.get("/products", (req: Request, res: Response) => {
  try {
    res.status(200).send(products);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

app.get("/products/search", (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;

    const result: TProduct[] = products.filter((product) =>
      product.name.toLowerCase().includes(q.toLowerCase())
    );

    if (result !== undefined) {
      if (q.length < 1) {
        res.statusCode = 404;
        throw new Error("'name' deve possuir no mínimo 1 caractere");
      }
    }

    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    res.send(error.message);
  }
});

app.get("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = products.find((product) => product.id === id);

    if (!result) {
      res.statusCode = 404;
      throw new Error("'id' do produto não existe");
    }

    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    res.send(error.message);
  }
});

// POST

app.post("/users", (req: Request, res: Response) => {
  try {
    const { id, email, password } = req.body as TUser;

    const newUser = {
      id,
      email,
      password,
    };

    if (newUser !== undefined) {
      const idExists = users.find((idOnUsers) => idOnUsers.id === id);

      if (idExists) {
        res.statusCode = 400;
        throw new Error("'Id' já cadastrada");
      }

      const emailExists = users.find(
        (emailOnUsers) => emailOnUsers.email === email
      );

      if (emailExists) {
        res.statusCode = 400;
        throw new Error("'Email' já cadastrado");
      }
    }

    users.push(newUser);

    res.status(201).send("Usuário registrado com sucesso!");
  } catch (error: any) {
    console.log(error);
    res.send(error.message);
  }
});

app.post("/products", (req: Request, res: Response) => {
  try {
    const { id, name, price, category } = req.body as TProduct;

    const newProduct = {
      id,
      name,
      price,
      category,
    };

    if (newProduct !== undefined) {
      const idExists = products.find((idOnProduct) => idOnProduct.id === id);

      if (idExists) {
        res.statusCode = 400;
        throw new Error("'Id' do produto já cadastrada");
      }
    }

    products.push(newProduct);

    res.status(201).send("Produto registrado com sucesso!");
  } catch (error: any) {
    console.log(error);
    res.send(error.message);
  }
});

app.post("/purchases", (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity, totalPrice } = req.body as TPurchase;

    const newPurchase = {
      userId,
      productId,
      quantity,
      totalPrice,
    };

    if (newPurchase !== undefined) {
      const userIdExists = users.find(
        (userIdOnUsers) => userIdOnUsers.id === userId
      );

      if (!userIdExists) {
        res.statusCode = 404;
        throw new Error("'Id' do usuário não existe");
      }

      const productIdExists = products.find(
        (productIdOnproducts) => productIdOnproducts.id === productId
      );

      if (!productIdExists) {
        res.statusCode = 404;
        throw new Error("'Id' do produto não existe");
      }
    }

    purchases.push(newPurchase);

    res.status(201).send("Compra realizada com sucesso");
  } catch (error: any) {
    console.log(error);
    res.send(error.message);
  }
});

// DELETE

app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex !== undefined) {
      if (userIndex === -1) {
        res.statusCode = 404;
        throw new Error("'id' do usuário não existe");
      } else {
        users.splice(userIndex, 1);
        res.status(200).send("Usuário deletado com sucesso");
      }
    }
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) res.status(500);
    res.send(error.message);
  }
});

app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex !== undefined) {
      if (productIndex === -1) {
        res.statusCode = 404;
        throw new Error("'id' do produto não existe");
      } else {
        products.splice(productIndex, 1);
        res.status(200).send("Produto deletado com sucesso");
      }
    }
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) res.status(500);
    res.send(error.message);
  }
});

// PUT

app.put("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newEmail = req.body.email as string | undefined;
    const newPassword = req.body.password as string | undefined;

    const user = users.find((user) => user.id === id);

    if (!user) {
      res.statusCode = 404;
      throw new Error("'Id' do usuário não existe");
    } else {
      user.email = newEmail || user.email;
      user.password = newPassword || user.password;
      res.status(200).send("Cadastro atualizado com sucesso!");
    }
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) res.status(500);
    res.send(error.message);
  }
});

app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newCategory = req.body.category as CATEGORY | undefined;

    const product = products.find((product) => product.id === id);

    if (!product) {
      res.statusCode = 404;
      throw new Error("'Id' do produto não existe");
    } else {
      product.name = newName || product.name;
      product.price = newPrice || product.price;
      product.category = newCategory || product.category;
      res.status(200).send("Produto atualizado com sucesso!");
    }
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) res.status(500);
    res.send(error.message);
  }
});

// import { createProduct, createPurchase, createUser, getAllProducts, getAllPurchasesFromUserid, getAllUsers, getProductById, products, purchases, users } from "./database";
// import { CATEGORY } from "./enum";

// createUser("0922", "asd@gmail.com", "92041")
// console.log(getAllUsers())
// console.log(createProduct("p033", "Pulseira", 12, CATEGORY.ACCESSORIES))
// console.log(getAllProducts())
// console.log(getProductById("p01"))
// console.log(createPurchase("01", "p02", 2, 5))
// console.log(getAllPurchasesFromUserid("01"))
