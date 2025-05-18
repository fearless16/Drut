import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  HeaderEditor,
  HeaderItem,
} from '../src/components/RequestBuilder/HeaderEditor'
import React from 'react'

describe('HeaderEditor', () => {
  const baseHeaders: HeaderItem[] = [
    { key: 'Content-Type', value: 'application/json' },
  ]

  it('renders existing headers', () => {
    render(<HeaderEditor headers={baseHeaders} onChange={() => {}} />)
    expect(screen.getByDisplayValue('Content-Type')).toBeInTheDocument()
    expect(screen.getByDisplayValue('application/json')).toBeInTheDocument()
  })

  it('calls onChange when header key is edited', () => {
    const handleChange = vi.fn()
    render(<HeaderEditor headers={baseHeaders} onChange={handleChange} />)

    fireEvent.change(screen.getByLabelText('Header key 0'), {
      target: { value: 'Accept' },
    })

    expect(handleChange).toHaveBeenCalled()
    const updated = handleChange.mock.calls[0][0]
    expect(updated[0].key).toBe('Accept')
  })

  it('calls onChange when header value is edited', () => {
    const handleChange = vi.fn()
    render(<HeaderEditor headers={baseHeaders} onChange={handleChange} />)

    fireEvent.change(screen.getByLabelText('Header value 0'), {
      target: { value: 'text/html' },
    })

    expect(handleChange).toHaveBeenCalled()
    const updated = handleChange.mock.calls[0][0]
    expect(updated[0].value).toBe('text/html')
  })

  it('adds a new header row on button click', () => {
    const handleChange = vi.fn()
    render(<HeaderEditor headers={baseHeaders} onChange={handleChange} />)

    fireEvent.click(screen.getByText('+ Add Header'))
    expect(handleChange).toHaveBeenCalledWith([
      ...baseHeaders,
      { key: '', value: '' },
    ])
  })

  it('removes a header row on button click', () => {
    const handleChange = vi.fn()
    render(<HeaderEditor headers={baseHeaders} onChange={handleChange} />)

    fireEvent.click(screen.getByLabelText('Remove header 0'))
    expect(handleChange).toHaveBeenCalledWith([])
  })
})
