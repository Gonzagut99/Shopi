import React,{useRef, useState, useEffect} from 'react'
import { roles, useAuth } from '../../Context/useAuth'
import { addUser } from '../../Utils'
import { useNavigate } from 'react-router-dom'

function SignUpPage() {
    const navigate = useNavigate()
    const [loginInfo, setLoginInfo] = useState(null)
  const [isUser, setIsUser] = useState(false)

  const {user, login, logout} = useAuth()
   const signupFormRef = useRef()
    //let responseSignUp
    //let responseLogin
  //let loginInfo

  const handleSignUp = async (data)=>{
    const responseSignUp = await addUser({ ...data, role:roles.customer });
    return responseSignUp
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(signupFormRef.current)
    //extract all the data from the  formData in an object
    const data = Object.fromEntries(formData.entries());
    const responseSignUp = await handleSignUp(data);    
    if (responseSignUp.status === "success") {
        responseLogin = login({ data: {...data, role:roles.customer } });
    }
  }


  useEffect(() => {
    console.log(user)
    if (user?.role) {
        navigate('/my-account')
    }
  }, [user]);
    // {
    //     email: 'pedro@gmail.com',
    //     password: '123',
    //     userName: "Pedro",
    //     role: roles.customer,
    //   },
  return (
    //make a sign in form
    <div className="w-full flex justify-center">
      <article className="flex items-center justify-center max-w-sm ">
        <div className="flex flex-col gap-4 w-[600px]">
          <h1 className="font-medium text-center text-xl">Sign up</h1>
          {!user.role && (
            <>
              <form
                className="flex flex-col gap-2"
                action=""
                ref={signupFormRef}
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
                <input
                    required
                  name="userName"
                  type="userName"
                  placeholder="User Name"
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
            </>
          )}
        </div>
      </article>
    </div>
  )
}

export default SignUpPage