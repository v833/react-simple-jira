import { AuthenticatedApp } from 'authed'
import { useAuth } from 'context/auth-context'
import { UnauthenticatedApp } from 'unauthed-app'
import './App.css'

const App = () => {
  const { user } = useAuth()
  return <div>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</div>
}

export default App
