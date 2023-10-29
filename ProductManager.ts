import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

// function encrypt(value:number,salt:number){
//     crypto.createHmac('sha256',salt).update(value).digest('hex')
// }

interface ProductInterface {
    title: string,
    description: string,
    price: number,
    thumbnail: string,
    code: string,
    stock: number,
    id: string
}
 export default class ProductManager{
constructor(public products:ProductInterface[],private path:string){}
    
    addProduct(product:ProductInterface){
        const existingProduct = this.products.find(p=>p.code === product.code)
        
        if(existingProduct){
            console.log('A product with that code already exists')
        }
        if(!product.title||!product.description||!product.price||!product.thumbnail||!product.code||!product.code){
            console.log('All fields are mandatory')
            return;
        }
        product.id = uuidv4()
        let values = {
            id:product.id,
            title:product.title, 
            description:product.description,
            price:product.price,
            thumbnail:product.thumbnail,
            code:product.code,
            stock:product.stock,
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
        //console.log("this.products:",this.products)
        const readFile = JSON.parse(fs.readFileSync(this.path, 'utf-8')) as Array<any>;
        const foundProduct = readFile.find(p=>p.id===productId)
        console.log("Found product",readFile)
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

const productManager = new ProductManager([],'./Logs/Logs.json')

const product1:ProductInterface = {
    id: uuidv4(),
  title: 'Product 1',
  description: 'Description for Product 1',
  price: 10,
  thumbnail: 'product1.jpg',
  code: 'P1',
  stock: 100,
  
}
const product2:ProductInterface = {
    id: uuidv4(),
    title: 'Product 2',
    description: 'Description for Product 2',
    price: 20,
    thumbnail: 'product2.jpg',
    code: 'P2',
    stock: 200,
    
  }
  const product3:ProductInterface = {
    id: uuidv4(),
    title: 'Product 3',
    description: 'Description for Product 3',
    price: 30,
    thumbnail: 'product3.jpg',
    code: 'P3',
    stock: 300,
    
  }
  const product4:ProductInterface = {
    id: uuidv4(),
    title: 'Product 4',
    description: 'Description for Product 4',
    price: 40,
    thumbnail: 'product4.jpg',
    code: 'P4',
    stock: 400,
    
  }
  const product5:ProductInterface = {
    id: uuidv4(),
    title: 'Product 5',
    description: 'Description for Product 5',
    price: 50,
    thumbnail: 'product5.jpg',
    code: 'P5',
    stock: 500,
    
  }

  productManager.addProduct(product1)
  productManager.addProduct(product2)
  productManager.addProduct(product3)
  productManager.addProduct(product4)
  productManager.addProduct(product5)

  //console.log('ALL PRODUCTS: ', productManager.getProducts())
  //const productById1 = productManager.getProductById(product1.id)
  //const productById2 = productManager.getProductById(product2.id)
   //console.log('PRODUCT 1 BY ID:',product1.id)
//   console.log('PRODUCT 2 BY ID:',productById2)

 /*productManager.deleteProduct(product1.id)

 productManager.updateProduct(product1.id, {description:'Esta es una description actualizada'})*/