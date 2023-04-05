import { useAuth } from 'context/auth-context'

export const LoginScreen = () => {
  const { user, login } = useAuth()

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value

    login({ username, password })
  }

  return (
    <form onSubmit={onSubmit}>
      {user ? <div>登录成功，用户名：{user.name}</div> : null}
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">登录</button>
    </form>
  )
}
