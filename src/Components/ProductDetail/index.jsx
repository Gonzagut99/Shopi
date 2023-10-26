import React, { useContext } from 'react';
import { ShoppingCartContext } from '../../Context'
import { XMarkIcon } from '@heroicons/react/24/solid';

const ProductDetail = () => {
  const context = useContext(ShoppingCartContext)
  const dataProduct = context.productToShow;
  return (
    <aside className={`${context.isProductDetailOpen?'flex':'hidden'} product-detail flex flex-col fixed right-0 border bg-white border-black rounded-lg top-[68px] w-[360px] h-[calc(100vh-68px)]`}>
        <div className='flex justify-between items-center p-6'>
            <h2 className='font-medium text-xl'>Detail</h2>
            <div onClick={()=>context.closeProductDetail()}><XMarkIcon className="h-6 w-6 text-black cursor-pointer" /></div>
        </div>
        <figure className='px-6'>
          <img
            className='w-full h-full rounded-lg' 
            src={dataProduct?.images} 
            alt={dataProduct?.title} />
        </figure>
        <p className='flex flex-col p-6'>
          <span className='font-medium text-2xl mb-2'>${dataProduct?.price}</span>
          <span className='font-medium text-md'>{dataProduct?.title}</span>
          <span className='font-medium text-sm'>{dataProduct?.description}</span>
        </p>
    </aside>
  )
}

export default ProductDetail