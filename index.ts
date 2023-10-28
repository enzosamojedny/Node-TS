import express from 'express'
import ProductManager from './ProductManager'

const router = express.Router()
const productManager = new ProductManager([],'./Logs/Logs.txt')

const Products = router.get('/products',(req,res)=>{
    try {
        const products = productManager.getProducts()
        if(req.query.limit){
            const limit = req.query.limit
            const limitedProducts = products.slice(0,limit)
            res.status(200).json({products:limitedProducts})
        }else{
            res.status(200).json({products:products})
        }
    } catch (error) {
        if(error instanceof Error){
            res.status(404).send({message:error.message})
        }
    }
})

//AGREGAR /products:id

export default Products;