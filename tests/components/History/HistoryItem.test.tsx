import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { HTTP_METHODS } from '@/constants/http'
import { HistoryItem } from '@/components/History/HistoryItem'

describe('HistoryItem', () => {
  const fakeItem = {
    id: 'abc123',
    method: HTTP_METHODS.GET,
    url: 'https://yo.api',
    headers: [],
    body: '',
    timestamp: new Date('2023-01-01T12:00:00').getTime(),
  }

  const onReplay = vi.fn()
  const onDelete = vi.fn()

  it('renders method, url, and timestamp', () => {
    render(
      <HistoryItem item={fakeItem} onReplay={onReplay} onDelete={onDelete} />
    )

    expect(screen.getByText(HTTP_METHODS.GET)).toBeInTheDocument()
    expect(screen.getByText('https://yo.api')).toBeInTheDocument()
    expect(
      screen.getByText(new Date(fakeItem.timestamp).toLocaleString())
    ).toBeInTheDocument()
  })

  it('calls onReplay when Replay button is clicked', () => {
    render(
      <HistoryItem item={fakeItem} onReplay={onReplay} onDelete={onDelete} />
    )
    fireEvent.click(screen.getByText('Replay'))
    expect(onReplay).toHaveBeenCalledWith(fakeItem)
  })

  it('calls onDelete when Delete button is clicked', () => {
    render(
      <HistoryItem item={fakeItem} onReplay={onReplay} onDelete={onDelete} />
    )
    fireEvent.click(screen.getByText('Delete'))
    expect(onDelete).toHaveBeenCalledWith('abc123')
  })
})
