import {useContext} from 'react';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context'

const Card = (data) => {
    //console.log(fetchedData.data.category)
    //const cardData = data?.data;
    const cardData = data?.data;
    //console.log(cardData)
    //contexto 
    const context = useContext(ShoppingCartContext)
    const showProduct = (ProductDetail)=>{
        context.openProductDetail();
        context.setProductToShow(ProductDetail);
        context.closeCheckoutSideMenu();
    };

    const addProductsToCart = (event, productData)=>{
        event.stopPropagation();
        context.setCount(context.count +1);
        context.setCartProducts([...context.cartProducts, productData]);
        context.openCheckoutSideMenu()
        context.closeProductDetail();
    }

    const renderIcon = (id)=>{
        const isInCart = context.cartProducts.filter(product => product.id===id).length>0;
        if (isInCart) {
            return (
                <div className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1'>
                    <CheckIcon className='h-8 w-8 text-green-500'/>
                </div>
            )
        }else{
            return (
                <div className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1' onClick={(event)=>{addProductsToCart(event,cardData)}}>
                    <PlusIcon className='h-8 w-8 text-gray-600'/>
                </div>
            )
        }
        
    }
  return (
    <div className='bg-white cursor-pointer w-56 h-60'
        onClick={()=> showProduct(cardData)}
    >
        <figure className='relative mb-2 w-full h-4/5'>
            <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>{
                // cardData?.category?.name
                cardData?.category?.name
            }</span>
            {/* <img className='w-full h-full object-cover rounded-lg' src={'https://images.pexels.com/photos/6686432/pexels-photo-6686432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} alt={cardData?.title} /> */}
            <img className='w-full h-full object-cover rounded-lg' src={cardData?.images} alt={cardData?.title} />
            {renderIcon(cardData?.id)}
        </figure>
        <p className='flex justify-between'>
            <span className='text-sm font-light'>{cardData?.title}</span>
            <span className='text-lg font-medium'>${cardData?.price}</span>
        </p>
    </div>
  )
}

//cardData?.images
export default Card