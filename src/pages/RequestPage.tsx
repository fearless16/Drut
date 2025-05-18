import React, { useState } from 'react'
import { RequestBuilder } from '@/components/RequestBuilder/RequestBuilder'
import { ResponseViewer } from '@/components/ResponseViewer'

export const RequestPage: React.FC = () => {
  const [response, setResponse] = useState<any>(null)

  return (
    <div className="container py-4">
      <h2 className="mb-3">New API Request</h2>
      <RequestBuilder onResponse={setResponse} />
      {response && (
        <div className="mt-4">
          <ResponseViewer response={response} />
        </div>
      )}
    </div>
  )
}
