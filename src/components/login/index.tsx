import axios from 'axios'

export const Login = () => {
  const api = process.env.REACT_APP_API_URL

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value

    axios.post(`${api}/register`, { username, password }).then((res) => {
      console.log(res)
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">注册</button>
    </form>
  )
}
