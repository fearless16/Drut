import React from 'react'
import { Form } from 'react-bootstrap'

interface UrlInputProps {
  url: string
  onChange: (url: string) => void
  error?: string
}

export const UrlInput: React.FC<UrlInputProps> = ({ url, onChange, error }) => {
  return (
    <Form.Group className="mb-3" controlId="url-input">
      <Form.Label>Request URL</Form.Label>
      <Form.Control
        type="text"
        value={url}
        placeholder="https://api.example.com/resource"
        isInvalid={!!error}
        onChange={(e) => onChange(e.target.value)}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  )
}
