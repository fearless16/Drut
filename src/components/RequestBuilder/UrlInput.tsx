import React from 'react'

interface UrlInputProps {
  url: string
  onChange: (url: string) => void
  error?: string
}

export const UrlInput: React.FC<UrlInputProps> = ({ url, onChange, error }) => {
  return (
    <div className="mb-3">
      <label htmlFor="url-input" className="form-label">
        Request URL
      </label>
      <input
        id="url-input"
        type="text"
        className={`form-control ${error ? 'is-invalid' : ''}`}
        value={url}
        placeholder="https://api.example.com/resource"
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}
