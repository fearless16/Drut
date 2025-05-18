import { render, screen } from '@testing-library/react'
import { HistoryPage } from '@/pages/HistoryPage'
import { HistoryContext } from '@/context/HistoryContext'
import { describe, it, expect } from 'vitest'
import React from 'react'

const fakeContext = {
  history: [
    {
      id: '1',
      method: 'GET',
      url: 'https://api.com',
      headers: [],
      body: '',
      timestamp: Date.now(),
    },
  ],
  addRequest: () => {},
  clearHistory: () => {},
}

describe('HistoryPage', () => {
  it('renders request history page with one record', () => {
    render(
      <HistoryContext.Provider value={fakeContext}>
        <HistoryPage />
      </HistoryContext.Provider>
    )

    expect(screen.getByText('Request History')).toBeInTheDocument()
    expect(screen.getByText('https://api.com')).toBeInTheDocument()
  })
})
