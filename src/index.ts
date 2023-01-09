import express, { Request, Response } from 'express'
import cors from 'cors'
import { TUser, TProduct, TPurchase } from './types'
import { products, purchases, users } from './database'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
})

app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
})

app.get('/products/search', (req: Request, res: Response) => {
    const q = req.query.q as string

    const result = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })

    res.status(200).send(result)
})

app.post('/users', (req: Request, res: Response) => {
    const {id, email, password} = req.body as TUser

    const newUser = {
        id,
        email,
        password
    }

    users.push(newUser)

    res.status(201).send("Usuário registrado com sucesso!")
})

app.post('/products', (req: Request, res: Response) => {
    const {id, name, price, category} = req.body as TProduct

    const newProduct = {
        id,
        name,
        price,
        category
    }

    products.push(newProduct)

    res.status(201).send("Produto registrado com sucesso!")
})

app.post('/purchases', (req: Request, res: Response) => {
    const {userId, productId, quantity, totalPrice} = req.body as TPurchase

    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchases.push(newPurchase)

    res.status(201).send("Compra realizada com sucesso")
})

// import { createProduct, createPurchase, createUser, getAllProducts, getAllPurchasesFromUserid, getAllUsers, getProductById, products, purchases, users } from "./database";
// import { CATEGORY } from "./enum";

// createUser("0922", "asd@gmail.com", "92041")
// console.log(getAllUsers())
// console.log(createProduct("p033", "Pulseira", 12, CATEGORY.ACCESSORIES))
// console.log(getAllProducts())
// console.log(getProductById("p01"))
// console.log(createPurchase("01", "p02", 2, 5))
// console.log(getAllPurchasesFromUserid("01"))