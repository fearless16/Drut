import React from 'react'
import { useHistoryContext } from '@/context/HistoryContext'
import { HistoryList } from '@/components/History/HistoryList'
import { Button } from 'react-bootstrap'

export const HistoryPage: React.FC = () => {
  const { history, clearHistory } = useHistoryContext()

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Request History</h2>
        <Button variant="outline-danger" onClick={clearHistory}>
          Clear History
        </Button>
      </div>
      <HistoryList data={history} />
    </div>
  )
}
