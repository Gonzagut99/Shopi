import React, {useContext} from 'react'
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useAuthReducer } from '../Reducers/AuthReducer';

const AuthContext = React.createContext();
  export const roles = {
      admin: 'admin',
      editor: 'editor',
      customer: 'customer',
      visitor: 'visitor',
    };
  
  export const users = [
    {
      email: 'andres@gmail.com',
      password: '123',
      userName: "Andres",
      role: roles.admin,
    },
    {
      email: 'feli@gmail.com',
      password: '123',
      userName: "Felipe",
      role: roles.editor,
    },
    {
      email: 'pedro@gmail.com',
      password: '123',
      userName: "Pedro",
      role: roles.customer,
    },
  ];
  //set in local storage the users array

export function AuthProvider({children}) {
    //const [user, setUser] = useState(null)
    const usersInLocalStorage = JSON.parse(localStorage.getItem('users'));
    if (!usersInLocalStorage) {
      localStorage.setItem('users', JSON.stringify(users));
    }
    const [user, dispatchUser] = useAuthReducer();
    const navigate = useNavigate()

    const login = ({ data, callback }) => {
      //revisar si el usuario existe o lo crea como visitante
      //dowload the users from local storage
      const users = JSON.parse(localStorage.getItem('users'));
      //create a function that evaluates if the email and password given is correct in the list of users
      const userFound = users.find(user => user.email === data.email && user.password === data.password);
      let response
      let status
      //console.log(userFound)
      if (userFound !== undefined) {
        dispatchUser({user:userFound})
        response = `Success. Welcome ${userFound.userName}`
        status= 'success'
      }else{
          dispatchUser({user:null});
        response = "User not found. Incorrect data. Try again."
        status= 'error'
      }
      if (callback){
        callback();
      } else{
        //navigate("/my-account");
      }
      return {response, status}
    }

    const logout = () => {
      dispatchUser({user:null});
      navigate('/')     
    }

    const auth = { user, login, logout}

    
  return (
    <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
    const auth = useContext(AuthContext)
    return auth
}

export function RequireAuth(props) {
    const auth = useAuth();
    let location = useLocation();
  
    if (!auth.user.role || !auth.user.userDetails) {
      return <Navigate to="/sign-in" state={{ from: location }} replace/>
    }
  
    return props.children
  }
