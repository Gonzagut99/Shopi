import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../Context/useAuth'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
  const navigate = useNavigate()
  const [loginInfo, setLoginInfo] = useState(null)
  const [isUser, setIsUser] = useState(false)
  const {user, login, logout} = useAuth()
   const loginFormRef = useRef()
  let response
  //let loginInfo

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(loginFormRef.current)
    //extract all the data from the  formData in an object
    const data = Object.fromEntries(formData.entries());
    console.log(JSON.parse(localStorage.getItem('users')))
    console.log(data)
    response = login({ data: data });
    if (response.status === "success") {
      setLoginInfo(response)
      navigate('/my-account')
    }
    if (response.status === "error") {
      setLoginInfo(response)
    }
    //console.log(loginInfo)
  }

  const handleSignUp = ()=>{
    navigate('/sign-up')
  }

  useEffect(() => {
    console.log(user)
    if (user?.role) {
      setIsUser(true)
      setLoginInfo(response)
    }
  }, [user]);

  return (
    //make a sign in form
    <div className="w-full flex justify-center">
      <article className="flex items-center justify-center max-w-sm ">
        <div className="flex flex-col gap-4 w-[600px]">
          <h1 className="font-medium text-center text-xl">Welcome</h1>
          {user.role && (
            <>
              <div className="flex flex-col gap-1 mb-1">
                <p className="text-sm">
                  Email: <span>{user.userDetails.email}</span>
                </p>
                <p className="text-sm">
                  Password: <span>{"*".repeat(user.userDetails.password.length)}</span>
                </p>
              </div>
              <button
                className="bg-black text-white p-2 rounded-lg text-sm py-3"
                onClick={logout}
              >
                Log Out
              </button>
            </>
          )}
          {!user.role && (
            <>
              <form
                className="flex flex-col gap-2"
                action=""
                ref={loginFormRef}
                onSubmit={handleSubmit}
              >
                <input
                  required
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="border border-black/50 p-2 rounded-lg text-sm"
                />
                <input
                  required
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="border border-black/50 p-2 rounded-lg text-sm"
                />
                <button className="bg-black text-white p-2 rounded-lg text-sm py-3">
                  Log In
                </button>
              </form>
              {loginInfo && (
                <>
                  {loginInfo.status === "success" && <p className="text-center text-xs text-green-500">
                    {loginInfo.response}
                  </p>              
                  }
                  {loginInfo.status === "error" && <p className="text-center text-xs text-red-500">
                    {loginInfo.response}
                  </p>
                  }
                </>
              )}
              <a className="text-center text-xs underline cursor-pointer">
                Forgot my password
              </a>
                <button onClick={handleSignUp} className="mt-1 bg-transparent border border-black p-2 rounded-lg text-sm py-3">
                  Sign up
                </button>
            </>
          )}
        </div>
      </article>
    </div>

    //make a sign up form
    // <div className='flex items-center justify-center'>
    //   <div className='flex flex-col gap-4'>
    //     <h1 className='font-medium text-center text-xl'>
    //       Welcome
    //     </h1>
    //     <input type='text' placeholder='Email' className='border-2 border-gray-300 p-2'/>
    //     <input type='password' placeholder='Password' className='border-2 border-gray-300 p-2'/>
    //     <input type='password' placeholder='Confirm Password' className='border-2 border-gray-300 p-2'/>
    //     <button className='bg-black text-white p-2'>
    //       Sign Up
    //     </button>
    //   </div>
    // </div>
  );
}

export default SignIn