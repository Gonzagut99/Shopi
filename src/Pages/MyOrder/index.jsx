import React, {useContext, useState} from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context';
import OrderCard from '../../Components/OrderCard';
//import './styles.css'


const MyOrder = () => {
  const context = useContext(ShoppingCartContext)
  //const customOverflowStyle = 'scrollable-cards';
  const currentPath = window.location.pathname;
  const lastPathValue = currentPath.substring(1).split('/')[1]
  console.log(lastPathValue)
  let [dynamicPath, setDynamicPath] = useState(lastPathValue)
  //let dynamicPath = ; ;

  console.log('order1', context.order)
  console.log('dynamic path 1: ', dynamicPath)

  return (
    <>
      <div className='flex items-center justify-center relative w-80 mb-6'>
          <Link to='/my-orders'>
            <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer absolute left-0 top-0'></ChevronLeftIcon>
          </Link>
          <h1>
            My Order
          </h1>

      </div>
      <div className={`flex flex-col w-80`}>
        {
          context.order?.[dynamicPath]?.products?.map((product) => {
            console.log('dynamicpath2', dynamicPath)
            console.log('order2', context.order?.[dynamicPath]?.products);
            return (
              <OrderCard
                key={product.id}
                id={product.id}
                title={product.title}
                imageUrl={product.images}
                price={product.price}
                deleteIcon ={false}
              ></OrderCard>
            )

          })
        }
      </div>
    </>
  )
}

export default MyOrder