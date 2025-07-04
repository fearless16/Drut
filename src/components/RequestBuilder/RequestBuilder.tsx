import React, { useEffect, useState } from 'react'
import { Button, Form, Stack } from 'react-bootstrap'
import { requestHandler } from '@/lib/requestHandler'
import { useHistoryContext } from '@/context/HistoryContext'
import { ActionType } from '@/context/reducer/requestFormReducer'
import { useRequestFormContext } from '@/context/RequestFormContext'
import { HTTP_METHODS } from '@/constants/http'
import { useLocation } from 'react-router-dom'
import { useTheme } from '@/context/ThemeContext'

export const RequestBuilder: React.FC<{ onResponse: (res: any) => void }> = ({
  onResponse,
}) => {
  const { state, dispatch } = useRequestFormContext()
  const { addRequest } = useHistoryContext()
  const location = useLocation()
  const { theme } = useTheme()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (location.state) {
      dispatch({ type: ActionType.PRESET, payload: location.state })
    }
  }, [location.state])

  const url = state.url.trim()
  const isUrlValid = url.startsWith('http://') || url.startsWith('https://')

  const handleSend = async () => {
    setLoading(true)
    try {
      const response = await requestHandler(state)
      onResponse(response)
      addRequest({ ...state })
    } finally {
      setLoading(false)
    }
  }

  const handleHeaderChange = (
    index: number,
    key: 'key' | 'value',
    value: string
  ) => {
    const newHeaders = [...state.headers]
    newHeaders[index] = { ...newHeaders[index], [key]: value }
    dispatch({ type: ActionType.SET_HEADERS, payload: newHeaders })
  }

  const addHeader = () => {
    dispatch({
      type: ActionType.SET_HEADERS,
      payload: [...state.headers, { key: '', value: '' }],
    })
  }

  const removeHeader = (index: number) => {
    const updated = state.headers.filter((_, i) => i !== index)
    dispatch({ type: ActionType.SET_HEADERS, payload: updated })
  }

  return (
    <Stack gap={3}>
      <Form.Group>
        <Form.Label>Request URL</Form.Label>
        <Form.Control
          value={state.url}
          onChange={(e) =>
            dispatch({ type: ActionType.SET_URL, payload: e.target.value })
          }
          placeholder="https://api.example.com"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Method</Form.Label>
        <Form.Select
          value={state.method}
          onChange={(e) =>
            dispatch({
              type: ActionType.SET_METHOD,
              payload: e.target.value as HTTP_METHODS,
            })
          }
        >
          {Object.values(HTTP_METHODS).map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Headers</Form.Label>
        <Stack gap={2}>
          {state.headers.map((h, idx) => (
            <Stack direction="horizontal" gap={2} key={idx}>
              <Form.Control
                placeholder="Key"
                value={h.key}
                onChange={(e) => handleHeaderChange(idx, 'key', e.target.value)}
              />
              <Form.Control
                placeholder="Value"
                value={h.value}
                onChange={(e) =>
                  handleHeaderChange(idx, 'value', e.target.value)
                }
              />
              <Button
                variant="outline-danger"
                onClick={() => removeHeader(idx)}
              >
                ×
              </Button>
            </Stack>
          ))}
          <Button variant="outline-primary" onClick={addHeader}>
            + Add Header
          </Button>
        </Stack>
      </Form.Group>

      <Form.Group>
        <Form.Label>Body</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          value={state.body}
          placeholder='{"key": "value"}'
          onChange={(e) =>
            dispatch({ type: ActionType.SET_BODY, payload: e.target.value })
          }
        />
      </Form.Group>

      <Button
        variant={theme === 'light' ? 'dark' : 'light'}
        onClick={handleSend}
        disabled={!isUrlValid || loading}
      >
        { loading ? 'Sending...' : 'Send Request'}
      </Button>
    </Stack>
  )
}
