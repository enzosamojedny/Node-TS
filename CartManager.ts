import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

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
}
