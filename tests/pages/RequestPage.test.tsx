import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RequestPage } from '@/pages/RequestPage'
import { HistoryProvider } from '@/context/HistoryContext'
import React from 'react'
import { EnvProvider } from '@/context/EnvContext'

const wrapper = ({ children }: any) => <EnvProvider>{children}</EnvProvider>

describe('RequestPage', () => {
  const setup = () =>
    render(
      <HistoryProvider>
        <RequestPage />
      </HistoryProvider>,
      { wrapper }
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
