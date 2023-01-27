export type TUser = {
    id: string,
    name: string,
    email: string,
    password: string,
    createAt: string
}

export type TProduct = {
    id: string,
    name: string,
    price: number,
    description: string,
    imageUrl: string
}

export type TPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}