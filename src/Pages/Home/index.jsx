import React, {useContext} from 'react'
import Card from '../../Components/card';
//import { useFetch } from '../../Hooks/useFetch'
import ProductDetail from '../../Components/ProductDetail';
import { ShoppingCartContext } from '../../Context';


const Home = () => {
  const context = useContext(ShoppingCartContext)
  
  //console.log(data)
  const renderView=()=>{
    if (context.filteredItems?.length>0) {
      return(
        context.filteredItems?.map((product,index)=>(
          <Card key={index} data={product}></Card>
        ))
      )
    }else{
      return(
        <div>We don't have anything</div>          
      )
    }
  }

  return (
    <>
      <div className='flex items-center justify-center relative w-80 mb-6'>
        <h1 className='font-medium text-xl'>Exclusive products</h1>
      </div>

      <input 
        type="text" 
        placeholder='Search a product' 
        className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
        onChange={(event)=> context.setSearchByTitle(event.target.value)}
      />

      <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
        {
          renderView()
        }
      </div>
      <ProductDetail></ProductDetail>
    </>
  )
}

export default Home