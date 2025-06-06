import React from 'react'
import { Card, Button, Stack, Badge } from 'react-bootstrap'
import type { HistoryRecord } from '@/context/HistoryContext'

interface HistoryItemProps {
  item: HistoryRecord
  onReplay: (item: HistoryRecord) => void
  onDelete: (id: string) => void
}

export const HistoryItem: React.FC<HistoryItemProps> = ({
  item,
  onReplay,
  onDelete,
}) => {
  const date = new Date(item.timestamp).toLocaleString()

  return (
    <Card className="mb-2">
      <Card.Body>
        <Stack direction="horizontal" gap={2} className="mb-1">
          <Badge bg="secondary">{item.method}</Badge>
          <span className="text-muted small">{date}</span>
          <div className="ms-auto d-flex gap-2">
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
          </div>
        </Stack>
        <div>
          <strong>{item.url}</strong>
        </div>
      </Card.Body>
    </Card>
  )
}
