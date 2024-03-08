import React, { useReducer } from "react";

const initialState = {
    //role:"visitor",
    userDetails:null,
    read:true,
    selfWrite:false,
    selfDelete:false,
    elseWrite:false,
    elseDelete:false,
};

//Action Types
const actionTypes = {
    admin: 'admin',
    editor: 'editor',
    customer: 'customer',
    visitor: 'visitor',
}

const reducerObject = (state, action) => {
  let actions 
  if (action.type === actionTypes.visitor) {
    return initialState
  } else{
    actions = {
    
    [actionTypes.admin]: {
        ...state,
        userDetails:action.payload.user,
        userName:action.payload.username,
        role:actionTypes.admin,
        selfWrite:true,
        selfDelete:true,
        elseWrite:true,
        elseDelete:true,
    },
    [actionTypes.editor]: {
        ...state,
        userDetails:action.payload.user,
        userName:action.payload.username,
        role:actionTypes.editor,
        selfWrite:true,
        selfDelete:true,
        elseWrite:false,
        elseDelete:false,
    }, 
    [actionTypes.customer]: {
        ...state,
        userDetails:action.payload.user,
        userName:action.payload.username,
        role:actionTypes.customer,
        selfWrite:true,
        selfDelete:true,
        elseWrite:false,
        elseDelete:false,
    }, 
  };
  return actions[action.type] 
}
  
};

export function useAuthReducer() {

  const [state, dispatch] = useReducer(reducerObject, initialState);
	
	//Action creators
  const onAdmin = ({user, userName}) => {dispatch({type: actionTypes.admin, payload:{user, userName}});}
  const onEditor = ({user, userName}) => {dispatch({type: actionTypes.editor, payload:{user, userName}});}
  const onCustomer = ({user, userName}) => {dispatch({type: actionTypes.customer, payload:{user, userName}});}
  const onvisitor = () => {
    console.log('Onvisitor activated')
    dispatch({type:actionTypes.visitor});
  }
    //   const onWrite = (eventValue) => {
    //       dispatch({type: actionTypes.write, payload:eventValue});
    //   }
    //create a switch expression executing the 3 above functions according to the userRole parameter
    const dispatchUser = ({user})=>{
      //console.log(user)
      if(!!user){
        switch (user.role) {
        case 'admin':
            onAdmin({user, userName:user.userName});
            break;
        case 'editor':
            onEditor({user, userName:user.userName});
            break;
        case 'customer':
            onCustomer({user, userName:user.userName});
            break;
        default:
            break;
      }}else{
        onvisitor();
      }
    }
    return [state, dispatchUser]     //   const onDelete = (eventValue) => {
}
