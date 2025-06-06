import React, { useEffect, useState } from 'react'
import { useRequestForm } from '@/hooks/useRequestForm'
import { MethodSelector } from './MethodSelector'
import { UrlInput } from './UrlInput'
import { HeaderEditor } from './HeaderEditor'
import { BodyEditor } from './BodyEditor'
import { SendButton } from './SendButton'
import { requestHandler } from '@/lib/requestHandler'
import { useHistoryContext } from '@/context/HistoryContext'
import { EnvSelector } from '../Env/EnvSelector'
import { useEnvContext } from '@/context/EnvContext'
import { resolveEnvVars } from '@/lib/envResolver'
import { useRequestFormContext } from '@/context/RequestFormContext'

interface RequestBuilderProps {
  onResponse: (res: any) => void
}

export const RequestBuilder: React.FC<RequestBuilderProps> = ({
  onResponse,
}) => {
  const { addRequest } = useHistoryContext()
  const { preset, setPreset } = useRequestFormContext()

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
  const { selectedEnv } = useEnvContext()

  useEffect(() => {
    if (preset) {
      setMethod(preset.method)
      setUrl(preset.url)
      setHeaders(preset.headers)
      setBody(preset.body)
      setPreset(null)
    }
  }, [preset])

  const handleSend = async () => {
    if (!isValid) {
      setError('Enter a valid URL')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const resolvedUrl = resolveEnvVars(url, selectedEnv?.variables || [])
      const resolvedBody = resolveEnvVars(body, selectedEnv?.variables || [])
      const response = await requestHandler({
        method,
        url: resolvedUrl,
        headers,
        body: resolvedBody,
      })

      onResponse(response)

      await addRequest({
        method,
        url,
        headers,
        body,
      })
    } catch (err: any) {
      setError(err.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <EnvSelector />
      <MethodSelector method={method} onChange={setMethod} />
      <UrlInput url={url} onChange={setUrl} error={error || undefined} />
      <HeaderEditor headers={headers} onChange={setHeaders} />
      <BodyEditor body={body} onChange={setBody} />
      <SendButton onClick={handleSend} disabled={!isValid} loading={loading} />
    </div>
  )
}
