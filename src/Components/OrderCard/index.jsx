import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid';
import {useContext} from 'react';

import { ShoppingCartContext } from '../../Context'


const OrderCard = (props) => {
    const{id, title, imageUrl, price, deleteIcon} = props;
    const context = useContext(ShoppingCartContext);

    const handleDelete = (id)=>{
        const filteredProducts = context.cartProducts.filter(product => product.id!= id);
        context.setCartProducts(filteredProducts);
    }

    let renderXMarkIcon;
    if (deleteIcon) {
        renderXMarkIcon = <XMarkIcon onClick={()=>handleDelete(id)} className="h-6 w-6 text-black cursor-pointer" />
    }

    console.log(id);
  return (
    <div className='flex justify-between items-center mb-3'>
        <div className='flex items-center gap-2'>
            <figure className='w-20 h-20'>
                <img className='w-full h-full rounded-lg object-cover' src={imageUrl} alt={title} />
            </figure>
            <p className='text-sm font-light'>{title}</p>
        </div>
        <div className='flex items-center gap-2'>
            <p className='text-lg font-medium'>${price}</p>
            {renderXMarkIcon}
        </div>
    </div>
  )
}

export default OrderCard