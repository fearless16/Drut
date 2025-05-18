import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RequestPage } from '@/pages/RequestPage'
import { HistoryProvider } from '@/context/HistoryContext'
import React from 'react'

describe('RequestPage', () => {
  const setup = () =>
    render(
      <HistoryProvider>
        <RequestPage />
      </HistoryProvider>
    )

  it('renders page heading', () => {
    setup()
    expect(screen.getByText('New API Request')).toBeInTheDocument()
  })

  it('shows RequestBuilder', () => {
    setup()
    expect(screen.getByText('Send Request')).toBeInTheDocument()
  })

  it('does not show ResponseViewer initially', () => {
    setup()
    expect(screen.queryByText(/Status/i)).not.toBeInTheDocument()
  })
})
