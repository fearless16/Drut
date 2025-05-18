import React from 'react'
import { HTTP_METHODS } from '@/constants/http'

interface MethodSelectorProps {
  method: keyof typeof HTTP_METHODS
  onChange: (method: keyof typeof HTTP_METHODS) => void
}

export const MethodSelector: React.FC<MethodSelectorProps> = ({
  method,
  onChange,
}) => {
  return (
    <select
      className="form-select"
      value={method}
      onChange={(e) => onChange(e.target.value as keyof typeof HTTP_METHODS)}
    >
      {Object.entries(HTTP_METHODS).map(([key, value]) => (
        <option key={key} value={value}>
          {value}
        </option>
      ))}
    </select>
  )
}
