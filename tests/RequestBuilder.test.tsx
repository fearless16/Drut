import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { RequestFormProvider } from '@/context/RequestFormContext'
import { HistoryProvider } from '@/context/HistoryContext'
import { ThemeProvider } from '@/context/ThemeContext'
import * as requestLib from '@/lib/requestHandler'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { RequestBuilder } from '@/components/RequestBuilder/RequestBuilder'

const mockResponse = { status: 200, body: { success: true } }

vi.mock('@/lib/requestHandler', async (importOriginal) => {
  const actual = (await importOriginal()) as object
  return {
    ...actual,
    requestHandler: vi.fn().mockResolvedValue({
      status: 200,
      body: { success: true },
    }),
  }
})

const customWrapper = ({ children }: any) => (
  <BrowserRouter>
    <ThemeProvider>
      <RequestFormProvider>
        <HistoryProvider>{children}</HistoryProvider>
      </RequestFormProvider>
    </ThemeProvider>
  </BrowserRouter>
)

describe('RequestBuilder', () => {
  const onResponse = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all fields and Send button', () => {
    render(<RequestBuilder onResponse={onResponse} />, {
      wrapper: customWrapper,
    })
    expect(
      screen.getByPlaceholderText('https://api.example.com')
    ).toBeInTheDocument()
    expect(screen.getByText('+ Add Header')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('{"key": "value"}')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Send Request/i })
    ).toBeInTheDocument()
  })

  it('disables Send button for invalid URL', () => {
    render(<RequestBuilder onResponse={onResponse} />, {
      wrapper: customWrapper,
    })
    fireEvent.change(screen.getByPlaceholderText('https://api.example.com'), {
      target: { value: 'invalid-url' },
    })
    expect(screen.getByRole('button', { name: /Send Request/i })).toBeDisabled()
  })

  it('adds and removes headers', () => {
    render(<RequestBuilder onResponse={onResponse} />, {
      wrapper: customWrapper,
    })
    fireEvent.click(screen.getByText('+ Add Header'))
    const keyInput = screen.getAllByPlaceholderText('Key')[0]
    const valueInput = screen.getAllByPlaceholderText('Value')[0]
    fireEvent.change(keyInput, { target: { value: 'Authorization' } })
    fireEvent.change(valueInput, { target: { value: 'Bearer token' } })

    expect(keyInput).toHaveValue('Authorization')
    expect(valueInput).toHaveValue('Bearer token')

    fireEvent.click(screen.getByText('×'))
    expect(screen.queryByPlaceholderText('Key')).not.toBeInTheDocument()
  })

  it('handles request and response correctly', async () => {
    render(<RequestBuilder onResponse={onResponse} />, {
      wrapper: customWrapper,
    })

    fireEvent.change(screen.getByPlaceholderText('https://api.example.com'), {
      target: { value: 'https://api.test.com' },
    })

    fireEvent.click(screen.getByRole('button', { name: /Send Request/i }))

    await waitFor(() => {
      expect(requestLib.requestHandler).toHaveBeenCalled()
      expect(onResponse).toHaveBeenCalledWith(mockResponse)
    })
  })

  it('changes request body', () => {
    render(<RequestBuilder onResponse={onResponse} />, {
      wrapper: customWrapper,
    })

    const textarea = screen.getByPlaceholderText('{"key": "value"}')
    fireEvent.change(textarea, { target: { value: '{"foo": "bar"}' } })

    expect(textarea).toHaveValue('{"foo": "bar"}')
  })

  it('changes method', () => {
    render(<RequestBuilder onResponse={onResponse} />, {
      wrapper: customWrapper,
    })

    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'POST' } })

    expect(select).toHaveValue('POST')
  })
})
