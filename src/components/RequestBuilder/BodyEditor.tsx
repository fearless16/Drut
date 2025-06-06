import React from 'react'
import { Form } from 'react-bootstrap'
import { SendButton } from './SendButton'

interface BodyEditorProps {
  body: string
  isValid: boolean
  loading: boolean
  onChange: (body: string) => void
  handleSend: () => void
}

export const BodyEditor: React.FC<BodyEditorProps> = ({
  body,
  onChange,
  handleSend,
  isValid,
  loading,
}) => {
  return (
    <Form.Group className="mb-3 py-2" controlId="body-input">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <Form.Label className="mb-0">Request Body</Form.Label>
        <SendButton
          onClick={handleSend}
          disabled={!isValid}
          loading={loading}
        />
      </div>
      <Form.Control
        as="textarea"
        rows={6}
        placeholder='{"name": "John"}'
        value={body}
        onChange={(e) => onChange(e.target.value)}
      />
    </Form.Group>
  )
}
