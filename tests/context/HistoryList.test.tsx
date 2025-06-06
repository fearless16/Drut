import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { HistoryList } from '@/components/History/HistoryList'
import { HTTP_METHODS } from '@/constants/http'
import { format } from 'date-fns'

describe('HistoryList', () => {
  const mockReplay = vi.fn()
  const mockDelete = vi.fn()
  const time = Date.now()

  const fake = [
    {
      id: '123',
      method: HTTP_METHODS.GET,
      url: 'https://api.com',
      headers: [],
      body: '',
      timestamp: time,
    },
  ]

  it('renders all history data correctly', () => {
    render(
      <HistoryList
        data={fake}
        onReplay={mockReplay}
        onDelete={mockDelete}
      />
    )

    expect(screen.getByText(HTTP_METHODS.GET)).toBeInTheDocument()
    expect(screen.getByText('https://api.com')).toBeInTheDocument()
    expect(screen.getByText(format(time, 'PPpp'))).toBeInTheDocument()
  })

  it('triggers onReplay when Replay is clicked', () => {
    render(
      <HistoryList
        data={fake}
        onReplay={mockReplay}
        onDelete={mockDelete}
      />
    )

    fireEvent.click(screen.getByText('Replay'))
    expect(mockReplay).toHaveBeenCalledWith(fake[0])
  })

  it('triggers onDelete when Delete is clicked', () => {
    render(
      <HistoryList
        data={fake}
        onReplay={mockReplay}
        onDelete={mockDelete}
      />
    )

    fireEvent.click(screen.getByText('Delete'))
    expect(mockDelete).toHaveBeenCalledWith(fake[0].id)
  })

  it('shows empty state when no data is present', () => {
    render(
      <HistoryList
        data={[]}
        onReplay={mockReplay}
        onDelete={mockDelete}
      />
    )

    expect(screen.getByText(/no history yet/i)).toBeInTheDocument()
  })
})
