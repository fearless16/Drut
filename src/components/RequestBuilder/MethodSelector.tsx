import React from 'react'
import { Form } from 'react-bootstrap'
import { HTTP_METHODS } from '@/constants/http'

interface MethodSelectorProps {
  method: HTTP_METHODS
  onChange: (method: HTTP_METHODS) => void
}

export const MethodSelector: React.FC<MethodSelectorProps> = ({
  method,
  onChange,
}) => {
  return (
    <Form.Group controlId="http-method"  className="mb-3">
      <Form.Label>Method</Form.Label>
      <Form.Select
        value={method}
        onChange={(e) => onChange(e.target.value as HTTP_METHODS)}
      >
        {Object.entries(HTTP_METHODS).map(([key, value]) => (
          <option key={key} value={value}>
            {value}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}
