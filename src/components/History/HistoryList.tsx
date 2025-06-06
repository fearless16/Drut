import React from 'react'
import type { HistoryRecord } from '@/context/HistoryContext'
import { format } from 'date-fns'
import { Button, ListGroup, Stack, Badge } from 'react-bootstrap'

interface HistoryListProps {
  data: HistoryRecord[]
  onReplay: (record: HistoryRecord) => void
  onDelete: (id: string) => void
}

export const HistoryList: React.FC<HistoryListProps> = ({
  data,
  onReplay,
  onDelete,
}) => {
  if (!data.length) {
    return <div className="text-muted">No history yet.</div>
  }

  return (
    <ListGroup>
      {data.map((item) => (
        <ListGroup.Item key={item.id}>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <Stack direction="horizontal" gap={2}>
                <Badge bg="secondary">{item.method}</Badge>
                <span className="text-muted small">
                  {format(new Date(item.timestamp), 'PPpp')}
                </span>
              </Stack>
              <div>
                <strong>{item.url}</strong>
              </div>
            </div>
            <Stack direction="horizontal" gap={2}>
              <Button
                size="sm"
                variant="outline-success"
                onClick={() => onReplay(item)}
              >
                Replay
              </Button>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => onDelete(item.id)}
              >
                Delete
              </Button>
            </Stack>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
