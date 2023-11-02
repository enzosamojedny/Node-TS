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
interface AddProductInterface{
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
constructor(public products:ProductInterface[],private path:string){}
    
    addProduct(product:AddProductInterface){
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
        const readFile = JSON.parse(fs.readFileSync(this.path, 'utf-8')) as Array<any>;//!
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

const productManager = new ProductManager([],'./src/Logs/Logs.json')

const product1:AddProductInterface = {
    id: uuidv4(),
    title: "Motherboard ASUS",
    description: "The best motherboard in the world",
    code: "01abc",
    price: 100,
    status:true,
    stock: 100,
    category:"pc",
    thumbnail: "http://fakeproduct/product/motherboard",
    
}
const product2:AddProductInterface = {
    id: uuidv4(),
    title: "Gaming PC",
    description: "The best gaming pc in the world",
    code: "02abc",
    price: 200,
    status:true,
    stock: 200,
    category:"pc",
    thumbnail: "http://fakeproduct/product/pc",
    
  }
  const product3:AddProductInterface = {
    id: uuidv4(),
    title: "Kettle",
    description: "The best kettle in the world",
    code: "03abc",
    price: 300,
    status:true,
    stock: 300,
    category:"kettles",
    thumbnail: "http://fakeproduct/product/kettle",
    
  }
  const product4:AddProductInterface = {
    id: uuidv4(),
    title: "Silent keyboard",
    description: "The best silent keyboard in the world",
    code: "04abc",
    price: 400,
    status:true,
    stock: 400,
    category:"keyboards",
    thumbnail: "http://fakeproduct/product/keyboard",
    
  }
  const product5:AddProductInterface = {
    id: uuidv4(),
    title: "Coffee cup",
    description: "The best coffee cup in the world",
    code: "05abc",
    price: 500,
    status:true,
    stock: 500,
    category:"PC",
    thumbnail: "http://fakeproduct/product/coffeecup",
    
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