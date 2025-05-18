import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RequestPage } from '../../src/pages/RequestPage'
import React from 'react'

describe('RequestPage', () => {
  it('renders page heading', () => {
    render(<RequestPage />)
    expect(screen.getByText('New API Request')).toBeInTheDocument()
  })

  it('shows RequestBuilder', () => {
    render(<RequestPage />)
    expect(screen.getByText('Send Request')).toBeInTheDocument()
  })

  it('does not show ResponseViewer initially', () => {
    render(<RequestPage />)
    expect(screen.queryByText(/Status/i)).not.toBeInTheDocument()
  })
})
