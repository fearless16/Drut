import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { RequestPage } from '@/pages/RequestPage'
import { vi, describe, it, expect } from 'vitest'

// ---- Mocks ----
vi.mock('@/components/RequestBuilder/RequestBuilder', () => ({
  RequestBuilder: ({ onResponse }: { onResponse: (data: any) => void }) => (
    <button onClick={() => onResponse({ status: 200, data: 'mock data' })}>
      Send Request
    </button>
  ),
}))

vi.mock('@/components/ResponseViewer', () => ({
  ResponseViewer: ({ response }: { response: any }) => (
    <div>Response: {response.data}</div>
  ),
}))

// ---- Tests ----
describe('RequestPage', () => {
  it('renders heading and Send Request button', () => {
    render(<RequestPage />)

    expect(screen.getByRole('heading', { name: /new api request/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send request/i })).toBeInTheDocument()
  })

  it('does not show ResponseViewer initially', () => {
    render(<RequestPage />)
    expect(screen.queryByText(/response:/i)).not.toBeInTheDocument()
  })

  it('shows ResponseViewer after request is sent', () => {
    render(<RequestPage />)
    fireEvent.click(screen.getByText(/send request/i))
    expect(screen.getByText(/response: mock data/i)).toBeInTheDocument()
  })
})
