import { AuthenticatedApp } from 'authed'
import { ErrorBoundary } from 'components/error-boundary'
import { useAuth } from 'context/auth-context'
import { UnauthenticatedApp } from 'unauthed-app'
import { FullPageErrorFallback } from 'components/lib'
import './App.css'

const App = () => {
  const { user } = useAuth()
  return (
    <div>
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  )
}

export default App
