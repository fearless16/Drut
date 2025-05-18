import React from 'react'

interface ResponseViewerProps {
  response: {
    status: number
    statusText?: string
    body: any
    headers?: Record<string, string>
    time?: number
  }
}

export const ResponseViewer: React.FC<ResponseViewerProps> = ({ response }) => {
  const prettyBody = (() => {
    try {
      return JSON.stringify(response.body, null, 2)
    } catch {
      return String(response.body)
    }
  })()

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <strong>Status:</strong>
        <span>
          {response.status} {response.statusText || ''}
        </span>
        {response.time && (
          <span className="text-muted small">({response.time} ms)</span>
        )}
      </div>
      <div className="card-body">
        <pre
          className="bg-light p-3 rounded overflow-auto"
          style={{ maxHeight: 300 }}
        >
          {prettyBody}
        </pre>
      </div>
    </div>
  )
}
