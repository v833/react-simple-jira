import { Authed } from 'authed'
import { useAuth } from 'context/auth-context'
import { UnauthedApp } from 'unauthed-app'

const App = () => {
  const { user } = useAuth()
  return <div>{user ? <Authed /> : <UnauthedApp />}</div>
}

export default App
