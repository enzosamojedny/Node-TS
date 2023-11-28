import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

interface ProductInterface{
    id: string,
    title: string,
    description: string,
    code: string,
    price: number,
    status:boolean,
    stock: number,
    category:string,
    thumbnail: string,
}
 export default class ProductManager{
constructor(public products:ProductInterface[],private path:string){
    this.products = products,
    this.path = path
}
    
    addProduct(product:ProductInterface){
        const existingProduct = this.products.find(p=>p.code === product.code)
        const readFile = JSON.parse(fs.readFileSync(this.path, 'utf-8')) as Array<any>;//!
        if(existingProduct){
            console.log('A product with that code already exists')
        }
        if(!product.title||!product.description||!product.price||!product.thumbnail||!product.code||!product.code){
            console.log('All fields are mandatory')
            return;
        }
        product.id = uuidv4()
        let values = {
            id: product.id,
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            status:product.status,
            stock: product.stock,
            category:product.category,
            thumbnail: product.thumbnail,
        }
        this.products.push(values)
        try {
                fs.writeFileSync(this.path, JSON.stringify(this.products,null,2));
        } catch (error) {
            throw new Error(`404: Error writing file ${error}`)
        }
    }
    getProducts(){
        try {
            const readFile = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            return readFile;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
    getProductById(productId:string):ProductInterface|undefined{
        const readFile = this.products//!
        const foundProduct = readFile.find(p=>p.id===productId)
        if(foundProduct){
           return  foundProduct;
        }else{
            console.log('Not found')
            return undefined
        }
    }
    deleteProduct(productId:string):ProductInterface|undefined{
        const deletedProduct = this.products.filter(p=>p.id!==productId)
        if(deletedProduct){
            this.products = deletedProduct
            fs.writeFileSync(this.path,JSON.stringify(this.products,null,2))
           console.log('Product deleted successfully')
        }else{
            console.log('Could not delete; Product ID not found')
            return undefined
        }
    }
    updateProduct(productId:string,updatedProduct:Partial<ProductInterface>):ProductInterface|undefined{
        const productToUpdate = this.products.find(p=>p.id === productId)
        if(productToUpdate){
            Object.assign(productToUpdate, updatedProduct)
           fs.writeFileSync(this.path,JSON.stringify(this.products,null,2))
           return productToUpdate;
        }else{
            console.log('Could not delete; Product not found')
            
            return undefined
        }
    }
}