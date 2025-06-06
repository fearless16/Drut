import React, { useState } from 'react'
import { RequestBuilder } from '@/components/RequestBuilder/RequestBuilder'
import { ResponseViewer } from '@/components/ResponseViewer'
import { RequestFormProvider } from '@/context/RequestFormContext'

import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'

export const RequestPage: React.FC = () => {
  const [response, setResponse] = useState<any>(null)

  return (
    <Container className="py-4">
      <Stack gap={4}>
        <h2>New API Request</h2>
        <RequestFormProvider>
          <RequestBuilder onResponse={setResponse} />
        </RequestFormProvider>
        {response && <ResponseViewer response={response} />}
      </Stack>
    </Container>
  )
}
