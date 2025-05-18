import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BodyEditor } from '../src/components/RequestBuilder/BodyEditor'
import React from 'react'

describe('BodyEditor', () => {
  it('renders with label and textarea', () => {
    render(<BodyEditor body="" onChange={() => {}} />)
    expect(screen.getByLabelText('Request Body')).toBeInTheDocument()
  })

  it('displays the provided body value', () => {
    const sample = `{"id":1}`
    render(<BodyEditor body={sample} onChange={() => {}} />)
    const input = screen.getByLabelText('Request Body') as HTMLTextAreaElement
    expect(input.value).toBe(sample)
  })

  it('triggers onChange when text is modified', () => {
    const handleChange = vi.fn()
    render(<BodyEditor body="" onChange={handleChange} />)
    const input = screen.getByLabelText('Request Body')

    fireEvent.change(input, { target: { value: '{"test":"ok"}' } })
    expect(handleChange).toHaveBeenCalledWith('{"test":"ok"}')
  })
})
