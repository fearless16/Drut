import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from './context/ThemeContext'
import { EnvProvider } from './context/EnvContext'
import { HistoryProvider } from './context/HistoryContext'
import { RequestFormProvider } from './context/RequestFormContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <EnvProvider>
        <HistoryProvider>
          <RequestFormProvider>
              <App />
          </RequestFormProvider>
        </HistoryProvider>
      </EnvProvider>
    </ThemeProvider>
  </React.StrictMode>
)
