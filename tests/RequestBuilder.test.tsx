import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import * as requestLib from '../src/lib/requestHandler'
import { HTTP_METHODS } from '../src/constants/http'
import { EnvProvider } from '../src/context/EnvContext'

// ----- Common mocks for all cases -----
const mockAddRequest = vi.fn()
const mockSetPreset = vi.fn()

vi.mock('../src/context/HistoryContext', () => ({
  useHistoryContext: () => ({ addRequest: mockAddRequest }),
}))

vi.mock('../src/context/RequestFormContext', async () => {
  const actual = await vi.importActual('../src/context/RequestFormContext')
  return {
    ...actual,
    useRequestFormContext: () => ({
      preset: {
        method: HTTP_METHODS.POST,
        url: 'https://preset.com',
        headers: [{ key: 'Auth', value: 'Bearer' }],
        body: 'someBody',
      },
      setPreset: mockSetPreset,
    }),
  }
})

const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <EnvProvider>{children}</EnvProvider>
)

// ✅ Full suite when `isValid = true`
vi.mock('../src/hooks/useRequestForm', () => ({
  useRequestForm: () => ({
    method: HTTP_METHODS.POST,
    setMethod: vi.fn(),
    url: 'https://preset.com',
    setUrl: vi.fn(),
    headers: [],
    setHeaders: vi.fn(),
    body: 'someBody',
    setBody: vi.fn(),
    isValid: true,
  }),
}))

import { RequestBuilder } from '../src/components/RequestBuilder/RequestBuilder'

describe('RequestBuilder (valid form)', () => {
  it('applies preset from context', async () => {
    render(<RequestBuilder onResponse={() => {}} />, { wrapper: AllProviders })

    await waitFor(() => {
      expect(screen.getByDisplayValue('https://preset.com')).toBeInTheDocument()
      expect(screen.getByDisplayValue('someBody')).toBeInTheDocument()
    })

    expect(mockSetPreset).toHaveBeenCalledWith(null)
  })

  it('renders all form components', () => {
    render(<RequestBuilder onResponse={() => {}} />, { wrapper: AllProviders })

    expect(screen.getByLabelText(/request url/i)).toBeInTheDocument()
    expect(screen.getByText('+ Add Header')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /send request/i })
    ).toBeInTheDocument()
  })

  it('calls requestHandler and adds request to history', async () => {
    const mockHandler = vi
      .spyOn(requestLib, 'requestHandler')
      // @ts-ignore
      .mockResolvedValue({ status: 200 })

    const handleResponse = vi.fn()

    render(<RequestBuilder onResponse={handleResponse} />, {
      wrapper: AllProviders,
    })

    const button = screen.getByRole('button', { name: /send request/i })
    fireEvent.click(button)

    await waitFor(() => {
      expect(mockHandler).toHaveBeenCalledWith({
        method: HTTP_METHODS.POST,
        url: 'https://preset.com',
        headers: [],
        body: 'someBody',
      })

      expect(handleResponse).toHaveBeenCalledWith({ status: 200 })
      expect(mockAddRequest).toHaveBeenCalledWith({
        method: HTTP_METHODS.POST,
        url: 'https://preset.com',
        headers: [],
        body: 'someBody',
      })
    })
  })
})

describe('RequestBuilder (invalid form)', () => {
  it('disables SendButton when URL is invalid', async () => {
    // Reset module cache
    vi.resetModules()

    // Re-mock AFTER reset
    vi.doMock('../src/hooks/useRequestForm', () => ({
      useRequestForm: () => ({
        method: 'GET',
        setMethod: vi.fn(),
        url: '',
        setUrl: vi.fn(),
        headers: [],
        setHeaders: vi.fn(),
        body: '',
        setBody: vi.fn(),
        isValid: false,
      }),
    }))

    // Dynamically import AFTER mocks
    const { RequestBuilder } = await import(
      '../src/components/RequestBuilder/RequestBuilder'
    )

    const { EnvProvider } = await import('../src/context/EnvContext')

    const AllProviders = ({ children }: any) => (
      <EnvProvider>{children}</EnvProvider>
    )

    render(<RequestBuilder onResponse={() => {}} />, { wrapper: AllProviders })

    const button = screen.getByRole('button', { name: /send request/i })
    expect(button).toBeDisabled()
  })
})
