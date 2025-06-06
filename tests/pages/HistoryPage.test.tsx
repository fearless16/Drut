import React from 'react'
import { render, screen } from '@testing-library/react'
import { HistoryPage } from '@/pages/HistoryPage'
import { EnvProvider } from '@/context/EnvContext'
import { RequestFormProvider } from '@/context/RequestFormContext'
import { HistoryProvider } from '@/context/HistoryContext'
import { vi, describe, it, expect } from 'vitest'
import { HTTP_METHODS } from '@/constants/http'

// 1. Mock HistoryContext to provide one record
const fakeHistory = [
  {
    id: 'h1',
    method: HTTP_METHODS.GET,
    url: 'https://a.com',
    headers: [],
    body: '',
    timestamp: 123,
  },
]
vi.mock('@/context/HistoryContext', () => ({
  HistoryProvider: ({ children }: any) => children,
  useHistoryContext: () => ({
    history: fakeHistory,
    addRequest: vi.fn(),
    clearHistory: vi.fn(),
  }),
}))

// 2. Composite wrapper including all required providers
const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <EnvProvider>
    <RequestFormProvider>
      <HistoryProvider>{children}</HistoryProvider>
    </RequestFormProvider>
  </EnvProvider>
)

describe('HistoryPage', () => {
  it('renders request history page with one record', () => {
    render(<HistoryPage />, { wrapper: AllProviders })

    // Assert the page heading
    expect(
      screen.getByRole('heading', { name: /history/i })
    ).toBeInTheDocument()

    // Assert that our fake record shows up
    expect(screen.getByText('https://a.com')).toBeInTheDocument()
    expect(screen.getByText('GET')).toBeInTheDocument()
  })
})
