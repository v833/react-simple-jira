import { RegisterScreen } from './register'
import { LoginScreen } from './login'
import { useState } from 'react'

export const UnauthedApp = () => {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <div>
      {isRegister ? <LoginScreen /> : <RegisterScreen />}
      <button onClick={() => setIsRegister(!isRegister)}>切换到{isRegister ? '注册' : '登录'}</button>
    </div>
  )
}
