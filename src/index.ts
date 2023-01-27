import express, { Request, Response } from "express";
import cors from "cors";
import { CATEGORY } from "./enum";
import { TUser, TProduct, TPurchase } from "./types";
import { db } from "./database/knex";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

// GET

app.get("/ping", async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "Pong!" });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db("users");
    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string | undefined;

    if (id !== undefined) {
      const [result]: TUser[] | undefined[] = await db("users").where({
        id: id,
      });

      if (result !== undefined) {
        res.status(200).send(result);
      } else {
        res.statusCode = 404;
        throw new Error("'id' de usuário não existe");
      }
    }
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.get("/users/:id/purchases", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await db("users");

    if (!result) {
      res.statusCode = 404;
      throw new Error("'id' de usuário não existe");
    }

    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db("products");
    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.get("/products/search", async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;

    const result = await db("products");

    if (result !== undefined) {
      if (q.length < 1) {
        res.statusCode = 404;
        throw new Error("'name' deve possuir no mínimo 1 caractere");
      }
    }

    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await db("products");

    if (!result) {
      res.statusCode = 404;
      throw new Error("'id' do produto não existe");
    }

    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// POST

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body as TUser;

    if (!id || !name || !email || !password) {
      res.status(400);
      throw new Error("Dados inválidos");
    }

    const newUser = {
      id,
      name,
      email,
      password,
    };

    if (newUser !== undefined) {
      const [idExists]: TUser[] | undefined[] = await db("users").where({ id: id });

      if (idExists) {
        res.statusCode = 400;
        throw new Error("'Id' já cadastrada");
      }

      const [emailExists]: TUser[] | undefined[] = await db("users").where({ email: email });

      if (emailExists) {
        res.statusCode = 400;
        throw new Error("'Email' já cadastrado");
      }
    }

    await db("users").insert(newUser);

    res.status(201).send("Usuário registrado com sucesso!");
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.post("/products", async (req: Request, res: Response) => {
  try {
    const { id, name, price, category } = req.body as TProduct;

    if (!id || !name || !price || !category) {
      res.status(400);
      throw new Error("Dados inválidos");
    }

    const newProduct = {
      id,
      name,
      price,
      category,
    };

    // if (newProduct !== undefined) {
    //   const idExists = products.find((idOnProduct) => idOnProduct.id === id);

    //   if (idExists) {
    //     res.statusCode = 400;
    //     throw new Error("'Id' do produto já cadastrada");
    //   }
    // }

    await db("products").insert(newProduct);

    res.status(201).send("Produto registrado com sucesso!");
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity, totalPrice } = req.body as TPurchase;

    const newPurchase = {
      userId,
      productId,
      quantity,
      totalPrice,
    };

    // if (newPurchase !== undefined) {
    //   const userIdExists = users.find(
    //     (userIdOnUsers) => userIdOnUsers.id === userId
    //   );

    //   if (!userIdExists) {
    //     res.statusCode = 404;
    //     throw new Error("Digite a 'Id' do usuário");
    //   }

    //   const productIdExists = products.find(
    //     (productIdOnproducts) => productIdOnproducts.id === productId
    //   );

    //   if (!productIdExists) {
    //     res.statusCode = 404;
    //     throw new Error("Digite a 'Id' do produto");
    //   }
    // }

    await db("purchases").insert(newPurchase);

    res.status(201).send("Compra realizada com sucesso");
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// DELETE

app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // if (userIndex !== undefined) {
    //   if (userIndex === -1) {
    //     res.statusCode = 404;
    //     throw new Error("'id' do usuário não existe");
    //   } else {
    //     users.splice(userIndex, 1);
    //     res.status(200).send("Usuário deletado com sucesso");
    //   }
    // }
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // if (productIndex !== undefined) {
    //   if (productIndex === -1) {
    //     res.statusCode = 404;
    //     throw new Error("'id' do produto não existe");
    //   } else {
    //     products.splice(productIndex, 1);
    //     res.status(200).send("Produto deletado com sucesso");
    //   }
    // }
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// PUT

app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newEmail = req.body.email as string | undefined;
    const newPassword = req.body.password as string | undefined;

    // if (!user) {
    //   res.statusCode = 404;
    //   throw new Error("'Id' do usuário não existe");
    // } else {
    //   user.email = newEmail || user.email;
    //   user.password = newPassword || user.password;
    //   res.status(200).send("Cadastro atualizado com sucesso!");
    // }
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newCategory = req.body.category as CATEGORY | undefined;

    // if (!product) {
    //   res.statusCode = 404;
    //   throw new Error("'Id' do produto não existe");
    // } else {
    //   product.name = newName || product.name;
    //   product.price = newPrice || product.price;
    //   product.category = newCategory || product.category;
    //   res.status(200).send("Produto atualizado com sucesso!");
    // }
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});
