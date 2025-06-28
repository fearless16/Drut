import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { RequestPage } from '@/pages/RequestPage'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { HistoryProvider } from '@/context/HistoryContext'

const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <ThemeProvider>
      <HistoryProvider>{children}</HistoryProvider>
    </ThemeProvider>
  </MemoryRouter>
)

const renderWithProviders = (ui: React.ReactElement) =>
  render(<AllProviders>{ui}</AllProviders>)

describe('RequestPage', () => {
  it('renders page heading', () => {
    renderWithProviders(<RequestPage />)
    expect(screen.getByText(/new api request/i)).toBeInTheDocument()
  })

  it('renders RequestBuilder component', () => {
    renderWithProviders(<RequestPage />)
    expect(screen.getByTestId('request-builder')).toBeInTheDocument()
  })

  it('does not show ResponseViewer initially', () => {
    renderWithProviders(<RequestPage />)
    expect(screen.queryByTestId('response-viewer')).not.toBeInTheDocument()
  })

  it('shows ResponseViewer when response is set', () => {
    renderWithProviders(<RequestPage />)
    const button = screen.getByRole('button', { name: /send request/i })

    // You can mock sendRequest to force setting response state
    fireEvent.click(button)

    // Now check if ResponseViewer appears
    // (make sure ResponseViewer has data-testid set too!)
    expect(screen.getByTestId('response-viewer')).toBeInTheDocument()
  })
})
