
import { useState } from 'react'
import Login from './Login/Login'
import SignUp from './Signup/SignUp'
const Login_Signup = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className='w-full flex items-center justify-center min-h-screen'>
      {
        isLogin ?
          <Login setIsLogin={setIsLogin} />
          :
          <SignUp setIsLogin={setIsLogin} />
      }

    </div>
  )
}

export default Login_Signup