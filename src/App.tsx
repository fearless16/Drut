import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { RequestPage } from '@/pages/RequestPage'
import { HistoryPage } from '@/pages/HistoryPage'
import { NavBar } from '@/components/NavBar'
import Home from './components/Home'

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
