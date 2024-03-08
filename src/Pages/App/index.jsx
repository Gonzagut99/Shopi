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
import { AuthProvider, RequireAuth } from '../../Context/useAuth';
import SignUpPage from '../SignUp';


const AppRoutes = ()=>{
  let routes = useRoutes([
    {path:'/',element: <Home/>},
    {path:'/clothes',element: <Home/>},
    {path:'/electronics',element: <Home/>},
    {path:'/furnitures',element: <Home/>},
    {path:'/toys',element: <Home/>},
    {path:'/others',element: <Home/>},
    {path:'/my-account',element: <RequireAuth><MyAccount/></RequireAuth>},
    {path:'/my-order',element: <RequireAuth><MyOrder/></RequireAuth>},
    {path:'/my-orders',element: <RequireAuth><MyOrders/></RequireAuth>},
    {path:'/my-order/last',element: <RequireAuth><MyOrder/></RequireAuth>},
    {path:'/my-order/:id',element: <RequireAuth><MyOrder/></RequireAuth>},
    {path:'/sign-in',element: <SignIn/>},
    {path:'/sign-up',element: <SignUpPage/>},
    {path:'/*',element: <NotFound/>},
  ]);
  return routes;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ShoppingCartProvider>
          <AppRoutes/>
          <Navbar/>
          <CheckoutSideMenu></CheckoutSideMenu>
        </ShoppingCartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
