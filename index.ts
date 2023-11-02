import express from 'express'
import ProductManager from './ProductManager'
import { Request,Response } from 'express'
const router = express.Router()
const productManager = new ProductManager([], './src/Logs/Logs.json')


export const Products = router.get('/products', (req, res) => {
    try {
        const products = productManager.getProducts()
        if (req.query.limit) {
            const limit = req.query.limit
            const limitedProducts = products.slice(0, limit)
            res.status(200).json({ products: limitedProducts })
        } else {
            res.status(200).json({ products: products })
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).send({ message: error.message })
        }
    }
})

export const ProductId = router.get('/products/:id', (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log('data',id)
        const products = productManager.getProductById(id);
        if (products) {
            res.status(200).json({ products });
        } else {
            throw new Error(`Product with ID ${id} not found in the database`);
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).send({ message: error.message });
        }
    }
});

