import React from 'react'
import type { HistoryRecord } from '@/context/HistoryContext'
import { format } from 'date-fns'

interface HistoryListProps {
  data: HistoryRecord[]
}

export const HistoryList: React.FC<HistoryListProps> = ({ data }) => {
  if (!data.length) return <div className="text-muted">No history yet.</div>

  return (
    <div className="list-group">
      {data.map((item) => (
        <div key={item.id} className="list-group-item">
          <div className="d-flex justify-content-between">
            <strong>{item.method}</strong>
            <span>{item.url}</span>
            <span className="text-muted small">
              {format(new Date(item.timestamp), 'PPpp')}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
