import React, { useState } from 'react'
import { useRequestForm } from '@/hooks/useRequestForm'
import { MethodSelector } from './MethodSelector'
import { UrlInput } from './UrlInput'
import { HeaderEditor } from './HeaderEditor'
import { BodyEditor } from './BodyEditor'
import { SendButton } from './SendButton'
import { requestHandler } from '../../lib/requestHandler'

interface RequestBuilderProps {
  onResponse: (res: any) => void
}

export const RequestBuilder: React.FC<RequestBuilderProps> = ({
  onResponse,
}) => {
  const {
    method,
    setMethod,
    url,
    setUrl,
    headers,
    setHeaders,
    body,
    setBody,
    isValid,
  } = useRequestForm()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSend = async () => {
    if (!isValid) {
      setError('Enter a valid URL')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await requestHandler({
        method,
        url,
        headers,
        body,
      })
      onResponse(response)
    } catch (err: any) {
      setError(err.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <MethodSelector method={method} onChange={setMethod} />
      <UrlInput url={url} onChange={setUrl} error={error || undefined} />
      <HeaderEditor headers={headers} onChange={setHeaders} />
      <BodyEditor body={body} onChange={setBody} />
      <SendButton onClick={handleSend} disabled={!isValid} loading={loading} />
    </div>
  )
}
