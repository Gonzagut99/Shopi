import React, {useContext} from 'react'
import { Link } from 'react-router-dom'

import { ShoppingCartContext } from '../../Context'
import OrdersCard from '../../Components/OrdersCard'


const MyOrders = () => {
const context = useContext(ShoppingCartContext)
  return (
   <>
      <div className='flex items-center justify-center relative w-80 mb-6'>
          <h1 className='font-medium text-lg'>
            My Orders
          </h1>

      </div>
      {
        context.order.map((order, index)=>{
          return(
            <Link key={index} to={`/my-order/${index}`}>
              <OrdersCard 
                totalPrice={order.totalPrice}
                totalProducts={order.totalProducts}
                date={order.date}
              ></OrdersCard>
            </Link>  
          )
                  
        })
      }
   </> 
  )
}

export default MyOrders