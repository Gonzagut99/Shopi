import { useRoutes, BrowserRouter } from 'react-router-dom'
import Home from '../Home';
import MyAccount from '../MyAccount';
import MyOrder from '../MyOrder';
import MyOrders from '../MyOrders';
import NotFound from '../NotFound';
import SignIn from '../SignIn';
import Navbar from '../../Components/Navbar';
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
import './App.css'
import { ShoppingCartProvider } from '../../Context';


const AppRoutes = ()=>{
  let routes = useRoutes([
    {path:'/',element: <Home/>},
    {path:'/clothes',element: <Home/>},
    {path:'/electronics',element: <Home/>},
    {path:'/furnitures',element: <Home/>},
    {path:'/toys',element: <Home/>},
    {path:'/others',element: <Home/>},
    {path:'/my-account',element: <MyAccount/>},
    {path:'/my-order',element: <MyOrder/>},
    {path:'/my-orders',element: <MyOrders/>},
    {path:'/my-order/last',element: <MyOrder/>},
    {path:'/my-order/:id',element: <MyOrder/>},
    {path:'/sign-in',element: <SignIn/>},
    {path:'/*',element: <NotFound/>},
  ]);
  return routes;
}

function App() {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes/>
        <Navbar/>
        <CheckoutSideMenu></CheckoutSideMenu>
      </BrowserRouter>
    </ShoppingCartProvider> 
  )
}

export default App;
