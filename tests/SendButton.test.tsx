import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SendButton } from '../src/components/RequestBuilder/SendButton'
import React from 'react'

describe('SendButton', () => {
  it('renders the send text when not loading', () => {
    render(<SendButton onClick={() => {}} />)
    expect(screen.getByRole('button')).toHaveTextContent('Send Request')
  })

  it('renders loading text when loading is true', () => {
    render(<SendButton loading={true} onClick={() => {}} />)
    expect(screen.getByRole('button')).toHaveTextContent('Sending...')
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<SendButton onClick={handleClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })

  it('is disabled when disabled is true', () => {
    render(<SendButton disabled={true} onClick={() => {}} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('is disabled when loading is true', () => {
    render(<SendButton loading={true} onClick={() => {}} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
