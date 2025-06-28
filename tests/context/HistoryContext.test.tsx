import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { HistoryProvider, useHistoryContext } from '@/context/HistoryContext'
import * as localforage from 'localforage'
import React from 'react'
import { HTTP_METHODS } from '@/constants/http'

vi.mock('localforage', async (importOriginal) => {
  const actual = (await importOriginal()) as any
  return {
    ...actual,
    getItem: vi.fn().mockResolvedValue([]),
    setItem: vi.fn().mockResolvedValue(undefined),
    removeItem: vi.fn().mockResolvedValue(undefined),
  }
})

const wrapper = ({ children }: any) => (
  <HistoryProvider>{children}</HistoryProvider>
)

describe('HistoryContext', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })
  it('handles storage errors like a pro', async () => {
    ;(localforage.getItem as any).mockRejectedValueOnce(
      new Error('Chutiya storage failed')
    )

    const { result } = renderHook(() => useHistoryContext(), { wrapper })

    await waitFor(() => {
      expect(result.current.history.length).toBe(0)
    })
  })

  it('loads history on init', async () => {
    ;(localforage.getItem as any).mockResolvedValueOnce([
      {
        id: '1',
        method: HTTP_METHODS.GET,
        url: 'https://yo.com',
        headers: [],
        body: '',
        timestamp: Date.now(),
      },
    ])

    const { result } = renderHook(() => useHistoryContext(), { wrapper })

    await waitFor(() => {
      expect(result.current.history.length).toBe(1)
      expect(result.current.history[0].url).toBe('https://yo.com')
    })
  })

  it('adds newest request on top like alpha male', async () => {
    ;(localforage.getItem as any).mockResolvedValueOnce([
      {
        id: '123',
        method: HTTP_METHODS.GET,
        url: 'https://older.com',
        headers: [],
        body: '',
        timestamp: Date.now() - 5000,
      },
    ])

    const { result } = renderHook(() => useHistoryContext(), { wrapper })

    await waitFor(() => {
      expect(result.current.history.length).toBe(1)
    })

    await act(async () => {
      await result.current.addRequest({
        method: HTTP_METHODS.POST,
        url: 'https://new.com',
        headers: [],
        body: '',
      })
    })

    await waitFor(() => {
      expect(result.current.history[0].url).toBe('https://new.com')
      expect(result.current.history[1].url).toBe('https://older.com')
    })
  })

  it('clearHistory can be called multiple times without dying', async () => {
    const { result } = renderHook(() => useHistoryContext(), { wrapper })
    await Promise.all([
      act(() => result.current.clearHistory()),
      act(() => result.current.clearHistory()),
    ])

    await waitFor(() => {
      expect(result.current.history).toEqual([])
    })
  })

  it('deletes a request by ID', async () => {
    const fakeHistory = [
      {
        id: '1',
        method: HTTP_METHODS.GET,
        url: 'https://a.com',
        headers: [],
        body: '',
        timestamp: 1,
      },
      {
        id: '2',
        method: HTTP_METHODS.GET,
        url: 'https://b.com',
        headers: [],
        body: '',
        timestamp: 2,
      },
    ]
    ;(localforage.getItem as any).mockResolvedValueOnce(fakeHistory)

    const { result } = renderHook(() => useHistoryContext(), { wrapper })

    await waitFor(() => {
      expect(result.current.history.length).toBe(2)
    })

    await act(async () => {
      await result.current.deleteRequest('1')
    })

    await waitFor(() => {
      expect(result.current.history).toHaveLength(1)
      expect(result.current.history[0].id).toBe('2')
    })
  })

  it('throws error if used outside provider', () => {
    const mockConsole = vi.spyOn(console, 'error').mockImplementation(() => {})

    let err
    try {
      renderHook(() => useHistoryContext())
    } catch (e) {
      err = e
    }

    expect(err).toBeInstanceOf(Error)
    expect(err?.message).toBe(
      'useHistoryContext must be used within HistoryProvider'
    )

    mockConsole.mockRestore()
  })
})
