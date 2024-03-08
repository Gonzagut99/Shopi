import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context'
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { useAuth, users } from '../../Context/useAuth';
const Nabvar = () => {
    //contexto
    const context = React.useContext(ShoppingCartContext);
    const {user, login, logout}  = useAuth()
    //estilos del menu
    const activeStyle =(isActive, isPending)=>{
        const styles = {
            fontWeight: isActive ? "font-normal" : "",
            color: isPending ? "text-grey" : "text-black",
            textDecoration: isActive? 'underline underline-offset-4':'no-underline',
        }
        return `${styles.fontWeight} ${styles.color} ${styles.textDecoration}`
    }; 
  return (
    <nav className="top-0 flex justify-between items-center fixed z-10 w-full py-5 px-8 text-sm font-light">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink to="/">Shopi</NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive, isPending }) => {
              return activeStyle(isActive, isPending);
            }}
            onClick={() => context.setSearchByCategory()}
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clothes"
            className={({ isActive, isPending }) => {
              return activeStyle(isActive, isPending);
            }}
            onClick={() => context.setSearchByCategory("clothes")}
          >
            Clothes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/electronics"
            className={({ isActive, isPending }) => {
              return activeStyle(isActive, isPending);
            }}
            onClick={() => context.setSearchByCategory("electronics")}
          >
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/furitures"
            className={({ isActive, isPending }) => {
              return activeStyle(isActive, isPending);
            }}
            onClick={() => context.setSearchByCategory("furitures")}
          >
            Furnitures
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/toys"
            className={({ isActive, isPending }) => {
              return activeStyle(isActive, isPending);
            }}
            onClick={() => context.setSearchByCategory("toys")}
          >
            Toys
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/others"
            className={({ isActive, isPending }) => {
              return activeStyle(isActive, isPending);
            }}
            onClick={() => context.setSearchByCategory("others")}
          >
            Others
          </NavLink>
        </li>
      </ul>
      <ul className="flex items-center gap-3">
        {user.role &&
          <>
            <li className="text-black/60">{user.userDetails.email}</li>
            <li>
              <NavLink
                to="/my-orders"
                className={({ isActive, isPending }) => {
                  return activeStyle(isActive, isPending);
                }}
              >
                MyOrders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-account"
                className={({ isActive, isPending }) => {
                  return activeStyle(isActive, isPending);
                }}
              >
                MyAccount
              </NavLink>
            </li>
          </>
        }
        {!user.role && (
          <li>
            <NavLink
              to="/sign-in"
              className={({ isActive, isPending }) => {
                return activeStyle(isActive, isPending);
              }}
            >
              Sign In
            </NavLink>
          </li>
        )}
        <li
          className="flex items-center"
          onClick={() => {
            context.openCheckoutSideMenu();
          }}
        >
          <ShoppingBagIcon className="w-4 h-4" />
          <div>{context.cartProducts.length}</div>
        </li>
      </ul>
    </nav>
  );
}

export default Nabvar