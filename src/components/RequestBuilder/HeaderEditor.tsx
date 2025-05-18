import React from 'react'

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
    <div className="mb-3">
      <label className="form-label">Headers</label>
      {headers.map((header, index) => (
        <div className="d-flex gap-2 mb-2" key={index}>
          <input
            className="form-control"
            placeholder="Key"
            value={header.key}
            onChange={(e) => updateHeader(index, 'key', e.target.value)}
            aria-label={`Header key ${index}`}
          />
          <input
            className="form-control"
            placeholder="Value"
            value={header.value}
            onChange={(e) => updateHeader(index, 'value', e.target.value)}
            aria-label={`Header value ${index}`}
          />
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => removeHeader(index)}
            aria-label={`Remove header ${index}`}
          >
            ×
          </button>
        </div>
      ))}
      <button className="btn btn-secondary" type="button" onClick={addHeader}>
        + Add Header
      </button>
    </div>
  )
}
