import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { HistoryPage } from '@/pages/HistoryPage'
import { EnvProvider } from '@/context/EnvContext'
import { RequestFormProvider } from '@/context/RequestFormContext'
import { HistoryProvider } from '@/context/HistoryContext'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { HTTP_METHODS } from '@/constants/http'
import { useNavigate, useLocation } from 'react-router-dom'

// Fake history record
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

// Mocks
const clearHistoryMock = vi.fn()
const deleteRequestMock = vi.fn()
const setPresetMock = vi.fn()
const navigateMock = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useLocation: () => ({ pathname: '/not-root' }),
  }
})

vi.mock('@/context/HistoryContext', () => ({
  HistoryProvider: ({ children }: any) => children,
  useHistoryContext: () => ({
    history: fakeHistory,
    addRequest: vi.fn(),
    clearHistory: clearHistoryMock,
    deleteRequest: deleteRequestMock,
  }),
}))

vi.mock('@/context/RequestFormContext', () => ({
  RequestFormProvider: ({ children }: any) => children,
  useRequestFormContext: () => ({
    setPreset: setPresetMock,
  }),
}))

// Composite provider
const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <EnvProvider>
    <RequestFormProvider>
      <HistoryProvider>{children}</HistoryProvider>
    </RequestFormProvider>
  </EnvProvider>
)

describe.only('HistoryPage - Full Coverage', () => {
  beforeEach(() => {
    clearHistoryMock.mockClear()
    deleteRequestMock.mockClear()
    setPresetMock.mockClear()
    navigateMock.mockClear()
  })

  it('renders heading and record details', () => {
    render(<HistoryPage />, { wrapper: AllProviders })
    expect(screen.getByRole('heading', { name: /request history/i })).toBeInTheDocument()
    expect(screen.getByText('https://a.com')).toBeInTheDocument()
    expect(screen.getByText('GET')).toBeInTheDocument()
  })

  it('calls clearHistory when Clear History button is clicked', () => {
    render(<HistoryPage />, { wrapper: AllProviders })
    fireEvent.click(screen.getByRole('button', { name: /clear history/i }))
    expect(clearHistoryMock).toHaveBeenCalledTimes(1)
  })

  it('calls onReplay when Replay button is clicked', () => {
    render(<HistoryPage />, { wrapper: AllProviders })

    const replayBtn = screen.getByRole('button', { name: /replay/i })
    fireEvent.click(replayBtn)

    expect(setPresetMock).toHaveBeenCalledWith(fakeHistory[0])
    expect(navigateMock).toHaveBeenCalledWith('/request', { state: fakeHistory[0] })
  })

  it('calls onDelete when Delete button is clicked', () => {
    render(<HistoryPage />, { wrapper: AllProviders })

    const deleteBtn = screen.getByRole('button', { name: /delete/i })
    fireEvent.click(deleteBtn)

    expect(deleteRequestMock).toHaveBeenCalledWith('h1')
  })

  it('removes headerPadding class when pathname !== "/"', () => {
    document.body.classList.add('headerPadding')
    render(<HistoryPage />, { wrapper: AllProviders })
    expect(document.body.classList.contains('headerPadding')).toBe(false)
  })
})
