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
export const AddProduct = router.post('/products',(req:Request,res:Response)=>{
    try {
        const productDetails = req.body

        if (!productDetails) {
            throw new Error("Product details not provided in the request body");
        }
        const addedProduct = productManager.addProduct(productDetails)
        res.status(200).json({product:addedProduct})
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ message: error.message });
        }
    }
})
export const UpdateProduct = router.put('/products/:id',(req:Request,res:Response)=>{
    try {
        const {id} = req.params
        const productToUpdate = req.body
        if(!productToUpdate){
            throw new Error("Product details not provided in the request body")
        }
        const updateProduct = productManager.updateProduct(id,productToUpdate)
        res.status(200).json({updateProduct})
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ message: error.message });
        }
    }
})
export const DeleteProduct = router.delete('/products/:id',(req:Request,res:Response)=>{})
