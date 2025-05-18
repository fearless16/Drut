import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { RequestBuilder } from '../src/components/RequestBuilder/RequestBuilder'
import * as requestLib from '../src/lib/requestHandler'
import React from 'react'

describe('RequestBuilder', () => {
  it('renders all form components', () => {
    render(<RequestBuilder onResponse={() => {}} />)

    expect(screen.getByLabelText('Request URL')).toBeInTheDocument()
    expect(screen.getByText('+ Add Header')).toBeInTheDocument()
    expect(screen.getByText('Send Request')).toBeInTheDocument()
  })

  it('disables SendButton when URL is invalid', () => {
    render(<RequestBuilder onResponse={() => {}} />)

    const button = screen.getByText('Send Request') as HTMLButtonElement
    expect(button).toBeDisabled()
  })

  it('calls requestHandler with correct data', async () => {
    const mockHandler = vi
      .spyOn(requestLib, 'requestHandler')
      //@ts-expect-error other request params are not required
      .mockResolvedValue({ status: 200 })

    const handleResponse = vi.fn()

    render(<RequestBuilder onResponse={handleResponse} />)

    fireEvent.change(screen.getByLabelText('Request URL'), {
      target: { value: 'https://example.com' },
    })

    const button = screen.getByText('Send Request') as HTMLButtonElement
    expect(button).not.toBeDisabled()

    fireEvent.click(button)

    await waitFor(() => {
      expect(mockHandler).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://example.com',
        headers: [],
        body: '',
      })

      expect(handleResponse).toHaveBeenCalledWith({ status: 200 })
    })
  })
})
