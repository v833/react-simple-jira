'./wdyr'
import { AppProviders } from 'context'
import { loadServer, DevTools } from 'jira-dev-tool'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'antd/dist/antd.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
loadServer(() => {
  root.render(
    <BrowserRouter>
      <AppProviders>
        <DevTools />
        <App />
      </AppProviders>
    </BrowserRouter>
  )
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
