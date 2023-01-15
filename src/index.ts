import express, { Request, Response } from 'express'
import cors from 'cors'
import { CATEGORY } from './enum'
import { TUser, TProduct, TPurchase } from './types'
import { products, purchases, users } from './database'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

// GET

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
})

app.get('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id
    
    const result = users.find((user) => user.id === id)

    res.status(200).send(result)
})

app.get('/users/:id/purchases', (req: Request, res: Response) => {
    const id = req.params.id

    const result = purchases.find((purchase) => purchase.userId === id)

    res.status(200).send(result)
})

app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
})

app.get('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const result = products.find((product) => product.id === id)

    res.status(200).send(result)
})

app.get('/products/search', (req: Request, res: Response) => {
    const q = req.query.q as string

    const result = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })

    res.status(200).send(result)
})

// POST

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

// PUT

app.put('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    const user = users.find((user) => user.id === id)

    if (user) {
        user.email = newEmail || user.email
        user.password = newPassword || user.password
    }

    res.status(200).send("Cadastro atualizado com sucesso!")
})

app.put('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as CATEGORY | undefined

    const product = products.find((product) => product.id === id)

    if (product) {
        product.name = newName || product.name
        product.price = newPrice || product.price
        product.category = newCategory || product.category
    }

    res.status(200).send("Produto atualizado com sucesso!")
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