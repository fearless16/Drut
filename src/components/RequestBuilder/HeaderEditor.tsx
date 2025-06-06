import React from 'react'
import { Button, Card, Form, InputGroup, Stack } from 'react-bootstrap'

export interface HeaderItem {
  key: string
  value: string
}

interface HeaderEditorProps {
  headers: HeaderItem[]
  onChange: (headers: HeaderItem[]) => void
}

export const HeaderEditor: React.FC<HeaderEditorProps> = ({
  headers,
  onChange,
}) => {
  const updateHeader = (
    index: number,
    field: 'key' | 'value',
    value: string
  ) => {
    const updated = [...headers]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const addHeader = () => {
    onChange([...headers, { key: '', value: '' }])
  }

  const removeHeader = (index: number) => {
    const updated = headers.filter((_, i) => i !== index)
    onChange(updated)
  }

  return (
    <Card className='p-2'>
      <Form.Group className="mb-3">
        <Form.Label>Headers</Form.Label>
        <Stack gap={2}>
          {headers.map((header, index) => (
            <InputGroup key={index}>
              <Form.Control
                placeholder="Key"
                value={header.key}
                onChange={(e) => updateHeader(index, 'key', e.target.value)}
                aria-label={`Header key ${index}`}
              />
              <Form.Control
                placeholder="Value"
                value={header.value}
                onChange={(e) => updateHeader(index, 'value', e.target.value)}
                aria-label={`Header value ${index}`}
              />
              <Button
                variant="danger"
                onClick={() => removeHeader(index)}
                aria-label={`Remove header ${index}`}
              >
                ×
              </Button>
            </InputGroup>
          ))}

          <div>
            <Button variant="secondary" onClick={addHeader}>
              + Add Header
            </Button>
          </div>
        </Stack>
      </Form.Group>
    </Card>
  )
}
