import { useHttp } from 'utils/http'

export const Screens = () => {
  const client = useHttp()
  client('projects', { data: { name: 'test' } })
  return (
    <div>
      <h1>这是一个页面</h1>
    </div>
  )
}
