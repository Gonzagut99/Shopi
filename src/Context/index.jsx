import { createContext, useState, useEffect } from "react";
import {useFetch} from '../Hooks/useFetch'

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({children})=>{
    //shoppindcart - Increment quantity
    const [count, setCount] = useState(0);
    console.log('count',count)

    //Product detail - Open/Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const openProductDetail=()=>{setIsProductDetailOpen(true)}
    const closeProductDetail=()=>setIsProductDetailOpen(false)

    //CheckOut Side Menu - Open/Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu=()=>{setIsCheckoutSideMenuOpen(true)}
    const closeCheckoutSideMenu=()=>setIsCheckoutSideMenuOpen(false)

    //Product detail - show product
    const [productToShow, setProductToShow] = useState({})

    //Shopping Cart . Add products to cart
    const [cartProducts, setCartProducts] = useState([])

    //shoppingcart . order
    const [order, setOrder] = useState([])

    //data products
    //const urlAPI= 'https://fakestoreapi.com'
    const urlAPI = 'https://api.escuelajs.co/api/v1';
    const fakestoreapi = 'https://fakestoreapi.com';
    const data = useFetch(`${urlAPI}/products`);

    //search state, filtrar products
    const [filteredItems, setFilteredItems] = useState(null)

    //search products by title
    const [searchByTitle, setSearchByTitle] = useState(null)

    const filteredItemsByTitle = (items, searchByTitle)=>{
        return items?.filter(item=>item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }
    
    //search by category
    const [searchByCategory, setSearchByCategory] = useState(null);
    const filteredItemsByCategory = (items, searchByCategory)=>{
        
        return items?.filter(item=>{
            //console.log('category name', item?.category?.name)
            return item?.category?.name.toLowerCase().includes(searchByCategory.toLowerCase())
        })
    }

    const filterBy = (searchType, items, searchByTitle, searchByCategory)=>{
        if (searchType === 'BY_TITLE') {
            return filteredItemsByTitle(items, searchByTitle);
        }
        if (searchType === 'BY_CATEGORY') {
            console.log(filteredItemsByCategory(items, searchByCategory))
            return filteredItemsByCategory(items, searchByCategory);
        }
        if (searchType === 'BY_TITLE_AND_CATEGORY') {
            return filteredItemsByCategory(items, searchByCategory).filter(item=>item?.title.toLowerCase().includes(searchByTitle.toLowerCase()));
        }
        if (!searchType) {
            return items
        }
    }
    useEffect(() => {
        if (searchByTitle && searchByCategory) {
            setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', data, searchByTitle, searchByCategory))
          }
        if (searchByTitle && !searchByCategory) {
          setFilteredItems(filterBy('BY_TITLE', data, searchByTitle, searchByCategory))
        }
        if (!searchByTitle && searchByCategory) {
            setFilteredItems(filterBy('BY_CATEGORY',data,searchByTitle , searchByCategory))
          }
        if (!searchByTitle && !searchByCategory) {
            setFilteredItems(filterBy(null,data,searchByTitle, searchByCategory))
          }
        
      }, [data, searchByTitle, searchByCategory])
    


    return(
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            data,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            searchByCategory,
            setSearchByCategory

        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}