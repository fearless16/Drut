import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { RequestPage } from '@/pages/RequestPage'
import { HistoryPage } from '@/pages/HistoryPage'
import { HistoryProvider } from '@/context/HistoryContext'
import { NavBar } from '@/components/NavBar'

const App: React.FC = () => {
  return (
    <HistoryProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/request" />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </BrowserRouter>
    </HistoryProvider>
  )
}

export default App
