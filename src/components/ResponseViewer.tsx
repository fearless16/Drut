import { useTheme } from '@/context/ThemeContext'
import React from 'react'
import { Card, Badge } from 'react-bootstrap'

interface ResponseViewerProps {
  response: {
    status: number
    statusText?: string
    body: any
    headers?: Record<string, string>
    time?: number
  }
}

const getStatusVariant = (status: number) => {
  if (status >= 200 && status < 300) return 'success'
  if (status >= 400) return 'danger'
  if (status >= 300 && status < 400) return 'warning'
  return 'secondary'
}

export const ResponseViewer: React.FC<ResponseViewerProps> = ({ response }) => {
  const { theme } = useTheme()
  const prettyBody = (() => {
    try {
      return JSON.stringify(response.body, null, 2)
    } catch {
      return String(response.body)
    }
  })()

  return (
    <Card className="my-3 shadow-sm">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          <strong>Status:</strong>{' '}
          <Badge bg={getStatusVariant(response.status)}>
            {response.status} {response.statusText || ''}
          </Badge>
        </div>
        {response.time && (
          <small className="text-muted">⏱️ {response.time} ms</small>
        )}
      </Card.Header>
      <Card.Body>
        <pre
          className={`bg-${theme === 'dark' ? 'dark' : 'light'} p-3 rounded overflow-auto`}
          style={{ maxHeight: 300 }}
        >
          {prettyBody}
        </pre>
      </Card.Body>
    </Card>
  )
}
