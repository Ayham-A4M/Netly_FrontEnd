
import { useState } from 'react'
import Login from './Login/Login'
import SignUp from './Signup/SignUp'
import Logo2 from '../../assets/svgs/logo2.svg'
import { Card } from '@/components/ui/card'
const Login_Signup = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className='w-full flex items-center justify-center min-h-screen'>
      <div className={`grid gap-0 max-[800px]:justify-items-center  grid-cols-2 max-[800px]:grid-cols-1 w-[98%] max-w-[900px] min-h-[520px]`}>
        <Card className={`bg-ring  flex max-[800px]:hidden items-center justify-center`}>
          <img src={Logo2} alt="logo" className='size-60' />
        </Card>
        {/* <div className='max-[800px]:flex max-[800px]:justify-center '> */}
          {
            isLogin ?
              <Login setIsLogin={setIsLogin} />
              :
              <SignUp setIsLogin={setIsLogin} />
          }
        {/* </div> */}
      </div>


    </div>
  )
}

export default Login_Signup