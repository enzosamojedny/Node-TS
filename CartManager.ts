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
        console.log(this.cart)

        products.id = uuidv4()
        let values = {
            id: products.id,
            cart: products.cart,
            quantity: products.quantity
        }
        let result = this.cart.push(values)
        try {
                fs.writeFileSync(this.path, JSON.stringify(this.cart,null,2));
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
        console.log(cart)
        if (cart) {
            const productIndex = cart.cart.indexOf(productId);
            if (productIndex !== -1) {
                cart.quantity += quantity;
                fs.writeFileSync(this.path, JSON.stringify(this.cart,null,2));
            } else {
                cart.cart.push(productId);
                fs.writeFileSync(this.path, JSON.stringify(this.cart,null,2));
            }
            return cart;
        }
        return undefined;
    }
    
}
