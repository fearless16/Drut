import React from 'react'
import type { HistoryRecord } from '@/context/HistoryContext'
import { format } from 'date-fns'
import { Button } from 'react-bootstrap'

interface HistoryListProps {
  data: HistoryRecord[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onUse?: (record: HistoryRecord) => void
}

export const HistoryList: React.FC<HistoryListProps> = ({
  data,
  onEdit,
  onDelete,
  onUse,
}) => {
  if (!data.length) return <div className="text-muted">No history yet.</div>

  return (
    <div className="list-group">
      {data.map((item) => (
        <div key={item.id} className="list-group-item">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <strong>{item.method}</strong> {item.url}
              <div className="text-muted small">
                {format(new Date(item.timestamp), 'PPpp')}
              </div>
            </div>
            <div className="d-flex gap-2">
              {onUse && (
                <Button
                  size="sm"
                  variant="outline-success"
                  onClick={() => onUse(item)}
                >
                  Use
                </Button>
              )}
              {onEdit && (
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => onEdit(item.id)}
                >
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => onDelete(item.id)}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
