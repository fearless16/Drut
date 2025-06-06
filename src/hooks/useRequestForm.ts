import { useState, useMemo } from 'react'
import { HTTP_METHODS } from '@/constants/http'
import type { HeaderItem } from '@/components/RequestBuilder/HeaderEditor'

export const useRequestForm = () => {
  const [method, setMethod] = useState<HTTP_METHODS>(HTTP_METHODS.GET)
  const [url, setUrl] = useState('')
  const [headers, setHeaders] = useState<HeaderItem[]>([])
  const [body, setBody] = useState('')

  const isValid = useMemo(() => {
    return url.trim().startsWith('http')
  }, [url])

  return {
    method,
    setMethod,
    url,
    setUrl,
    headers,
    setHeaders,
    body,
    setBody,
    isValid,
  }
}
