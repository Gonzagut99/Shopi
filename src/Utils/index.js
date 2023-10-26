// import {useContext} from 'react';
// import { ShoppingCartContext } from '../../Context'

// const context = useContext(ShoppingCartContext)
/**
 * 
 * @param {Array} products 
 * @returns {number}
 */

export const totalPrice = (products)=>{
    // return context.cartProducts.reduce((sum, product)=>{sum+product.price},0)
    const totalPrice = products.reduce((sum, product)=>{return sum+product.price},0);
    return totalPrice

}
