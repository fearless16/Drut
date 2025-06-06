import React from 'react'
import { useHistoryContext } from '@/context/HistoryContext'
import { useRequestFormContext } from '@/context/RequestFormContext'
import { HistoryList } from '@/components/History/HistoryList'

export const HistoryPage: React.FC = () => {
  const { history, clearHistory } = useHistoryContext()
  const { setPreset } = useRequestFormContext()

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Request History</h2>
        <button className="btn btn-outline-danger" onClick={clearHistory}>
          Clear History
        </button>
      </div>
      <HistoryList data={history} onUse={setPreset} />
    </div>
  )
}
