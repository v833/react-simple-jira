import { FullPageErrorFallback, FullPageLoading } from 'components/lib'
import { useAsync } from 'hooks/useAsync'
import { useMount } from 'hooks/useMount'
import { createContext, ReactNode, useContext } from 'react'
import { User } from 'types/User'
import { http } from 'utils/http'
import * as auth from '../auth-provider'

interface AuthForm {
  username: string
  password: string
}

// 初始化用户
const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

export interface AuthProviderProps {
  children: ReactNode
}
export const AuthContext = createContext<
  | {
      user: User | null
      login: (form: AuthForm) => Promise<void>
      register: (form: AuthForm) => Promise<void>
      logout: () => Promise<void>
    }
  | undefined
>(undefined)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // const [user, setUser] = useState<User | null>(null)
  const { data: user, isIdle, error, run, isLoading, isError, setData: setUser } = useAsync<User | null>()

  const login = async (form: AuthForm) => {
    return auth.login(form).then((user) => {
      setUser(user)
    })
  }

  const register = async (form: AuthForm) => {
    return auth.register(form).then((user) => {
      setUser(user)
    })
  }

  const logout = async () => {
    return auth.logout().then(() => {
      setUser(null)
    })
  }

  const value = {
    user,
    login,
    register,
    logout
  }

  useMount(() => {
    run(bootstrapUser())
  })
  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
