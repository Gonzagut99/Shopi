import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context'
import { XMarkIcon } from '@heroicons/react/24/solid';
import OrderCard from '../../Components/OrderCard';
import './styles.css';
import { totalPrice } from '../../Utils'

const CheckoutSideMenu = () => {
    const context = useContext(ShoppingCartContext);
    const dataProduct = context.productToShow;
    const customOverflowStyle = 'scrollable-cards';

    const handleCheckout = ()=>{
        const date = new Date();
        const orderToAdd = {
            date:date.toLocaleDateString(),
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice:totalPrice(context.cartProducts)
        }
        context.setOrder([...context.order, orderToAdd]);
        context.setCartProducts([]);
        context.setCount(0);
        context.closeCheckoutSideMenu();
        //limpiar filtrado del input de busqueda
        context.setSearchByTitle(null);
    }
    return (
      <aside className={`${context.isCheckoutSideMenuOpen?'flex':'hidden'} flex flex-col fixed right-0 border bg-white border-black rounded-lg top-[68px] w-[360px] h-[calc(100vh-68px)]`}>
          <div className='flex justify-between items-center p-6'>
              <h2 className='font-medium text-xl'>My Order</h2>
              <div onClick={()=>context.closeCheckoutSideMenu()}><XMarkIcon className="h-6 w-6 text-black cursor-pointer" /></div>
              
          </div>
            <div className={`px-6 ${customOverflowStyle} flex-1`}>
            {
                context.cartProducts.map((product)=>{
                    return(
                        <OrderCard 
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            imageUrl={product.images}
                            price={product.price}
                            deleteIcon = {true}
                        ></OrderCard>
                    )
                    
                })
              }
            </div>
            <div className='px-6 mb-6'>
                <p className='flex justify-between items-center mb-2'>
                    <span className='font-light'>Total: </span>
                    <span className='font-medium text-2xl'>${
                        totalPrice(context.cartProducts)}
                    </span>
                </p>
                <Link to={`/my-order/${context.order.length}`}>
                    <button className='bg-black py-3 text-white w-full rounded-lg' onClick={()=>handleCheckout()}>
                        Checkout
                    </button>
                </Link>
            </div>
      </aside>
    )
}

//images -image

export default CheckoutSideMenu