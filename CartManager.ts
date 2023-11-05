import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import ProductManager from './ProductManager';
const productManager = new ProductManager([], './src/Logs/Logs.json')
interface CartInterface{
    id: string,
    cart:string[],
    quantity:number
}
export default class CartManager {
    constructor(public cart: CartInterface[], private path: string) {
        this.cart = cart;
        this.path = path;
    }
    
    addCart(products:CartInterface){
        if(!products.cart|| products.cart.length === 0){
            console.log('All fields are mandatory')
            return;
        }
        products.id = uuidv4()
        let values = {
            id: products.id,
            cart: products.cart,
            quantity: products.quantity
        }
        let result = this.cart.push(values)
        try {
                fs.writeFileSync(this.path, JSON.stringify(result,null,2));
        } catch (error) {
            throw new Error(`404: Error writing file ${error}`)
        }
    }
    getCartById(cartId:string):CartInterface|undefined{
        const cart = this.cart
        const foundCart = cart.find(p=>p.id===cartId)
        if(foundCart){
            return foundCart;
         }else{
             console.log('Not found')
             return undefined
         }
    }
    addProductToCart(cartId: string, productId: string, quantity: number): CartInterface | undefined {
        const cart = this.cart.find((c) => c.id === cartId);
        if (cart) {
            const productIndex = cart.cart.indexOf(productId);
            if (productIndex !== -1) {
                // If the product is already in the cart, update its quantity
                cart.quantity += quantity;
            } else {
                // If the product is not in the cart, add it to the cart array
                cart.cart.push(productId);
            }
            return cart;
        }
        // If the cart with the given ID is not found, return undefined outside the if block.
        return undefined;
    }
    
}
