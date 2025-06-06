import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ThemeProvider } from './context/ThemeContext'
import { EnvProvider } from './context/EnvContext'
import { HistoryProvider } from './context/HistoryContext'
import { RequestFormProvider } from './context/RequestFormContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
      <EnvProvider>
        <HistoryProvider>
          <RequestFormProvider>
            <App />
          </RequestFormProvider>
        </HistoryProvider>
      </EnvProvider>
    </ThemeProvider>
)
