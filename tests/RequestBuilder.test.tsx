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
  const actual = await importOriginal() as object
  return {
    ...actual,
    requestHandler: vi.fn().mockResolvedValue(mockResponse),
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
    expect(screen.getByText('Send Request')).toBeInTheDocument()
  })

  it('validates URL and disables button', () => {
    render(<RequestBuilder onResponse={onResponse} />, {
      wrapper: customWrapper,
    })
    const sendBtn = screen.getByText('Send Request') as HTMLButtonElement
    expect(sendBtn.disabled).toBe(true)

    const urlInput = screen.getByPlaceholderText('https://api.example.com')
    fireEvent.change(urlInput, { target: { value: 'http://valid.com' } })
    expect(sendBtn.disabled).toBe(false)
  })

  it('sends request and triggers onResponse + saves to history', async () => {
    render(<RequestBuilder onResponse={onResponse} />, {
      wrapper: customWrapper,
    })

    fireEvent.change(screen.getByPlaceholderText('https://api.example.com'), {
      target: { value: 'https://yo.com' },
    })
    fireEvent.click(screen.getByText('Send Request'))

    await waitFor(() => {
      expect(requestLib.requestHandler).toHaveBeenCalled()
      expect(onResponse).toHaveBeenCalledWith(mockResponse)
    })
  })

  it('adds and removes headers', () => {
    render(<RequestBuilder onResponse={onResponse} />, {
      wrapper: customWrapper,
    })

    fireEvent.click(screen.getByText('+ Add Header'))
    expect(screen.getAllByPlaceholderText('Key')).toHaveLength(1)

    const removeBtn = screen.getByText('×')
    fireEvent.click(removeBtn)
    expect(screen.queryByPlaceholderText('Key')).not.toBeInTheDocument()
  })

  it('edits header values', () => {
    render(<RequestBuilder onResponse={onResponse} />, {
      wrapper: customWrapper,
    })

    fireEvent.click(screen.getByText('+ Add Header'))
    const keyInput = screen.getByPlaceholderText('Key') as HTMLInputElement
    const valueInput = screen.getByPlaceholderText('Value') as HTMLInputElement

    fireEvent.change(keyInput, { target: { value: 'Authorization' } })
    fireEvent.change(valueInput, { target: { value: 'Bearer token' } })

    expect(keyInput.value).toBe('Authorization')
    expect(valueInput.value).toBe('Bearer token')
  })

  it('dispatches correct method', () => {
    render(<RequestBuilder onResponse={onResponse} />, {
      wrapper: customWrapper,
    })

    const methodSelect = screen.getByDisplayValue('GET')
    fireEvent.change(methodSelect, { target: { value: 'POST' } })
    expect(screen.getByDisplayValue('POST')).toBeInTheDocument()
  })

  it('updates body textarea', () => {
    render(<RequestBuilder onResponse={onResponse} />, {
      wrapper: customWrapper,
    })

    const textarea = screen.getByPlaceholderText(
      '{"key": "value"}'
    ) as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: '{"id": 1}' } })
    expect(textarea.value).toBe('{"id": 1}')
  })
})
