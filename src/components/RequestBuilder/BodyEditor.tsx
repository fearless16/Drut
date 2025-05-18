import React from 'react'

interface BodyEditorProps {
  body: string
  onChange: (body: string) => void
}

export const BodyEditor: React.FC<BodyEditorProps> = ({ body, onChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor="body-input" className="form-label">
        Request Body
      </label>
      <textarea
        id="body-input"
        className="form-control"
        rows={6}
        placeholder='{"name": "John"}'
        value={body}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
