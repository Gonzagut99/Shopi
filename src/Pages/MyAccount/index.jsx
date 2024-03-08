import React, {useState, useRef} from 'react'
import {useAuth} from '../../Context/useAuth'
import { updateUser } from '../../Utils'

const MyAccount = () => {
  const {user, login, logout} = useAuth()
  const [isEditing, setisEditing] = useState(false)
  const editUserInfoFormRef = useRef()
  // const [loginInfo, setLoginInfo] = useState(null)

  // if (response.status === "success") {
  //   setLoginInfo(response)
  //   navigate('/my-account')
  // }
  // if (response.status === "error") {
  //   setLoginInfo(response)
  // }

  const openEditForm = ()=>{
    setisEditing(true)
  }
  const closeEditForm = ()=>{
    setisEditing(false)
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const formData = new FormData(editUserInfoFormRef.current)
    const data = Object.fromEntries(formData.entries());
    const responseUpdateUserInfo = await updateUser({...data, email:user.userDetails.email, role:user.role})  
    //console.log(responseUpdateUserInfo)
    if (responseUpdateUserInfo.status === "success") {
      login({data:responseUpdateUserInfo.data})
      setisEditing(false)
    }
  }

  return (
    <div className="w-full flex justify-center">
      <article className="flex items-center justify-center max-w-sm ">
        <div className="flex flex-col gap-4 w-[600px]">
          <h1 className="font-medium text-center text-xl">Welcome</h1>
          {user.role && (
            <>
              {!isEditing && <>
                <div className="flex flex-col gap-1 mb-1">
                  <p className="text-sm">
                    Email: <span>{user.userDetails.email}</span>
                  </p>
                  <p className="text-sm">
                    User Name: <span>{user.userDetails.userName}</span>
                  </p>
                  <p className="text-sm">
                    Password:{" "}
                    <span>{"*".repeat(user.userDetails.password.length)}</span>
                  </p>
                </div>
              </>}
              {isEditing && (
                <>
                  <form
                    className="flex flex-col gap-2"
                    action=""
                    ref={editUserInfoFormRef}
                    onSubmit={handleSubmit}
                  >
                    <input
                      required
                      name="userName"
                      type="text"
                      placeholder="User Name"
                      defaultValue={user.userDetails.userName}
                      className="border border-black/50 p-2 rounded-lg text-sm"
                    />
                    <input
                      required
                      name="password"
                      type="text"
                      placeholder="Password"
                      defaultValue={user.userDetails.password}
                      className="border border-black/50 p-2 rounded-lg text-sm"
                    />
                    <div className='flex gap-2'>
                      <button type='submit' className="bg-transparent border border-black p-2 rounded-lg text-sm py-3 w-1/2">
                        Save
                      </button>
                      <button className="bg-gray-200 border border-black p-2 rounded-lg text-sm py-3 w-1/2" onClick={closeEditForm}>
                        Cancel
                      </button>
                    </div>
                  </form>
                  {/* {responseUpdateUserInfo && (
                    <>
                      {responseUpdateUserInfo.status === "success" && (
                        <p className="text-center text-xs text-green-500">
                          {responseUpdateUserInfo.response}
                        </p>
                      )}
                      {responseUpdateUserInfo.status === "error" && (
                        <p className="text-center text-xs text-red-500">
                          {responseUpdateUserInfo.response}
                        </p>
                      )}
                    </>
                  )} */}
                </>
              )}
              {!isEditing && <button
                    onClick={openEditForm}
                    className="mt-1 bg-transparent border border-black p-2 rounded-lg text-sm py-3"
                  >
                    Edit information
              </button>}
              <button
                className="bg-black text-white p-2 rounded-lg text-sm py-3"
                onClick={logout}
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </article>
    </div>
  );
}

export default MyAccount