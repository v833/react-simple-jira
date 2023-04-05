import { useAuth } from 'context/auth-context'

export const Authed = () => {
  const { logout } = useAuth()

  return (
    <div>
      <button onClick={() => logout()}>登出</button>
    </div>
  )
}
