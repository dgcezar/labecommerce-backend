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
    const q = req.query.q as string | undefined;

    if (q !== undefined) {
      const [result]: TProduct[] | undefined[] = await db("products").where({
        name: q,
      });

      if (q.length < 1) {
        res.statusCode = 404;
        throw new Error("'name' deve possuir no mínimo 1 caractere");
      }

      if (result !== undefined) {
        res.status(200).send(result);
      } else {
        res.statusCode = 404;
        throw new Error("'name' do produto não existe");
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

app.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string | undefined;

    if (id !== undefined) {
      const [result]: TProduct[] | undefined[] = await db("products").where({
        id: id,
      });

      if (result !== undefined) {
        res.status(200).send(result);
      } else {
        res.statusCode = 404;
        throw new Error("'id' de produto não existe");
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
      const [idExists]: TUser[] | undefined[] = await db("users").where({
        id: id,
      });

      if (idExists) {
        res.statusCode = 400;
        throw new Error("'Id' já cadastrada");
      }

      const [emailExists]: TUser[] | undefined[] = await db("users").where({
        email: email,
      });

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
    const { id, name, price, description, image_url } = req.body as TProduct;

    if (!id || !name || !price || !description || !image_url) {
      res.status(400);
      throw new Error("Dados inválidos");
    }

    const newProduct = {
      id,
      name,
      price,
      description,
      image_url,
    };
    
    if (newProduct !== undefined) {
      const [idExists]: TProduct[] | undefined[] = await db("products").where({
        id: id,
      });

      if (idExists) {
        res.statusCode = 400;
        throw new Error("'Id' já cadastrada");
      }

      const [nameExists]: TProduct[] | undefined[] = await db("products").where({
        name: name,
      });

      if (nameExists) {
        res.statusCode = 400;
        throw new Error("'name' já cadastrado");
      }

      // const [imageUrlExists]: TProduct[] | undefined[] = await db("products").where({
      //   imageUrl: imageUrl,
      // });

      // if (imageUrlExists) {
      //   res.statusCode = 400;
      //   throw new Error("'imageUrl' já cadastrado");
      // }
    }

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

    const [user] = await db("users").where({ id: id });

    if (!user) {
      res.status(404);
      throw new Error("'id' não encontrada");
    }

    await db("users").del().where({ id: id });
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

    const [product] = await db("products").where({ id: id });

    if (!product) {
      res.status(404);
      throw new Error("'id' do produto não encontrada");
    }

    await db("products").del().where({ id: id });
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

    const newName = req.body.name as string | undefined;
    const newEmail = req.body.email as string | undefined;
    const newPassword = req.body.password as string | undefined;

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(400);
        throw new Error("'name' deve ser string");
      }
      if (newName.length < 4) {
        res.status(400);
        throw new Error("'name' deve possuir no mínimo 4 caracteres");
      }
    }

    if (newEmail !== undefined) {
      if (typeof newEmail !== "string") {
        res.status(400);
        throw new Error("'email' deve ser string");
      }
      if (newEmail.length < 10) {
        res.status(400);
        throw new Error("'email' deve possuir no mínimo 10 caracteres");
      }
    }

    if (newPassword !== undefined) {
      if (typeof newPassword !== "string") {
        res.status(400);
        throw new Error("'password' deve ser string");
      }

      if (newPassword.length < 6) {
        res.status(400);
        throw new Error("'password' deve possuir no mínimo 6 caracteres");
      }
    }

    const [user] = await db("users").where({ id: id });

    if (user) {
      const updatedUser = {
        name: newName || user.name,
        email: newEmail || user.email,
        password: newPassword || user.password,
      };

      await db("users").update(updatedUser).where({ id: id });
    } else {
      res.status(404);
      throw new Error("'id' não encontrada");
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

app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.image_url as string | undefined;

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(400);
        throw new Error("'name' deve ser string");
      }
      if (newName.length < 4) {
        res.status(400);
        throw new Error("'name' deve possuir no mínimo 4 caracteres");
      }
    }

    if (newPrice !== undefined) {
      if (typeof newPrice !== "number") {
        res.status(400);
        throw new Error("'price' deve ser number");
      }
      if (newPrice < 0) {
        res.status(400);
        throw new Error("'price' não pode ser negativo");
      }
    }

    if (newDescription !== undefined) {
      if (typeof newDescription !== "string") {
        res.status(400);
        throw new Error("'description' deve ser string");
      }

      if (newDescription.length < 20) {
        res.status(400);
        throw new Error("'description' deve possuir no mínimo 20 caracteres");
      }
    }

    if (newImageUrl !== undefined) {
      if (typeof newImageUrl !== "string") {
        res.status(400);
        throw new Error("'image_url' deve ser string");
      }

      if (newImageUrl.length < 10) {
        res.status(400);
        throw new Error("'image_url' deve possuir no mínimo 10 caracteres");
      }
    }

    const [product] = await db("products").where({ id: id });

    if (product) {
      const updatedProduct = {
        name: newName || product.name,
        price: isNaN(newPrice) ? product.salary : newPrice,
        description: newDescription || product.description,
        image_url: newImageUrl || product.image_url,
      };

      await db("products").update(updatedProduct).where({ id: id });
    } else {
      res.status(404);
      throw new Error("'id' não encontrada");
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
