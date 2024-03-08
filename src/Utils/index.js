// import {useContext} from 'react';
// import { ShoppingCartContext } from '../../Context'
import { useAuth } from '../Context/useAuth'

// const context = useContext(ShoppingCartContext)
/**
 * 
 * @param {Array} products 
 * @returns {number}
 */

export const totalPrice = (products)=>{
    // return context.cartProducts.reduce((sum, product)=>{sum+product.price},0)
    const totalPrice = products.reduce((sum, product)=>{return sum+product.price},0);
    return totalPrice

}

// {
//     email: 'pedro@gmail.com',
//     password: '123',
//     userName: "Pedro",
//     role: roles.customer,
//   },

export const addUser = async ({email, password, userName, role})=>{
    let users = JSON.parse(localStorage.getItem('users'));
    if (!users) {
        users = [];
    }
    const user = {
        email,
        password,
        userName,
        role
    }
    //only push if the user is not in the list
    if (!users.some(u => u.email === email)) {
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        console.log(JSON.parse(localStorage.getItem('users')))
        return {
            response: `User ${userName} added`,
            status: 'success'
        }
    }else{
        return {
            response: `User ${userName} already exists`,
            status: 'error'
        }
    }
}

export const updateUser = async (data)=>{

    let users = JSON.parse(localStorage.getItem('users'));
    if (!users) {
        users = [];
    }
    const userFound = users.find(u => u.email === data.email);

    //console.log(userFound)
    //console.log(data)
    const updatedUserData = {
        ...userFound,
        ...data
    }
    //replace the user with the updated user
    users = users.map(u => u.email === data.email ? updatedUserData : u);
    localStorage.setItem('users', JSON.stringify(users)); 
    //console.log(JSON.parse(localStorage.getItem('users')))   

    return {
        response: `User ${updatedUserData.userName} updated`,
        status: 'success',
        data: updatedUserData
    }
}
