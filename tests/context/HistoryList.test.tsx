import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { HistoryList } from '@/components/History/HistoryList'
import { HTTP_METHODS } from '@/constants/http'

describe('HistoryList', () => {
  const mockUse = vi.fn()
  const fake = [
    {
      id: '123',
      method: HTTP_METHODS.GET,
      url: 'https://api.com',
      headers: [],
      body: '',
      timestamp: Date.now(),
    },
  ]

  it('triggers onUse when Use is clicked', () => {
    render(
      <HistoryList
        data={fake}
        onDelete={() => {}}
        onUse={mockUse}
      />
    )

    fireEvent.click(screen.getByText('Use'))
    expect(mockUse).toHaveBeenCalledWith(fake[0])
  })
})
