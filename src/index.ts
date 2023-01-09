import express, { Request, Response } from 'express'
import cors from 'cors'
import { TUser, TProduct, TPurchase } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
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