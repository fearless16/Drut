import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { UrlInput } from '../src/components/RequestBuilder/UrlInput'
import React from 'react'

describe('UrlInput', () => {
  it('renders input with label', () => {
    render(<UrlInput url="" onChange={() => {}} />)
    expect(screen.getByLabelText('Request URL')).toBeInTheDocument()
  })

  it('displays the current URL value', () => {
    render(<UrlInput url="https://test.com" onChange={() => {}} />)
    const input = screen.getByLabelText('Request URL') as HTMLInputElement
    expect(input.value).toBe('https://test.com')
  })

  it('calls onChange when user types', () => {
    const handleChange = vi.fn()
    render(<UrlInput url="" onChange={handleChange} />)
    const input = screen.getByLabelText('Request URL')

    fireEvent.change(input, { target: { value: 'https://new.com' } })
    expect(handleChange).toHaveBeenCalledWith('https://new.com')
  })

  it('renders error message if error prop is set', () => {
    render(<UrlInput url="" onChange={() => {}} error="Invalid URL" />)
    expect(screen.getByText('Invalid URL')).toBeInTheDocument()
  })

  it('applies is-invalid class when error is present', () => {
    render(<UrlInput url="" onChange={() => {}} error="Some error" />)
    const input = screen.getByLabelText('Request URL')
    expect(input).toHaveClass('is-invalid')
  })
})
