import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { HistoryProvider, useHistoryContext } from '@/context/HistoryContext'
import { HTTP_METHODS } from '@/constants/http'
import * as localforage from 'localforage'

vi.mock('localforage', async (importOriginal) => {
  const actual = (await importOriginal()) as object
  return {
    ...actual,
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  }
})

const mockedLocalforage = localforage as unknown as {
  getItem: ReturnType<typeof vi.fn>
  setItem: ReturnType<typeof vi.fn>
  removeItem: ReturnType<typeof vi.fn>
}

// Dummy component to interact with context
const DummyComponent = () => {
  const { history, addRequest, clearHistory, deleteRequest } =
    useHistoryContext()

  return (
    <>
      <button
        onClick={() =>
          addRequest({
            method: HTTP_METHODS.GET,
            url: 'https://test.com',
            headers: [],
            body: '',
          })
        }
      >
        Add
      </button>
      <button onClick={clearHistory}>Clear</button>
      <button onClick={() => history[0] && deleteRequest(history[0].id)}>
        Delete
      </button>
      <div data-testid="history-count">{history.length}</div>
    </>
  )
}

const renderWithProvider = () =>
  render(
    <HistoryProvider>
      <DummyComponent />
    </HistoryProvider>
  )

describe('HistoryContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockedLocalforage.getItem.mockResolvedValue([])
  })

  it('loads initial history from localforage', async () => {
    mockedLocalforage.getItem.mockResolvedValueOnce([
      {
        id: '1',
        method: HTTP_METHODS.GET,
        url: 'https://init.com',
        headers: [],
        body: '',
        timestamp: Date.now(),
      },
    ])

    renderWithProvider()

    await waitFor(() =>
      expect(screen.getByTestId('history-count').textContent).toBe('1')
    )
  })

  it('adds a request and persists to localforage', async () => {
    renderWithProvider()

    fireEvent.click(screen.getByText('Add'))

    await waitFor(() => {
      expect(mockedLocalforage.setItem).toHaveBeenCalledWith(
        'history',
        expect.arrayContaining([
          expect.objectContaining({ url: 'https://test.com' }),
        ])
      )
      expect(screen.getByTestId('history-count').textContent).toBe('1')
    })
  })

  it('clears all history', async () => {
    renderWithProvider()

    fireEvent.click(screen.getByText('Clear'))

    await waitFor(() =>
      expect(mockedLocalforage.removeItem).toHaveBeenCalledWith('history')
    )

    expect(screen.getByTestId('history-count').textContent).toBe('0')
  })

  it('deletes a specific request', async () => {
    mockedLocalforage.getItem.mockResolvedValueOnce([
      {
        id: '1',
        method: HTTP_METHODS.GET,
        url: 'https://delete.com',
        headers: [],
        body: '',
        timestamp: Date.now(),
      },
    ])

    renderWithProvider()

    await waitFor(() =>
      expect(screen.getByTestId('history-count').textContent).toBe('1')
    )

    fireEvent.click(screen.getByText('Delete'))

    await waitFor(() =>
      expect(mockedLocalforage.setItem).toHaveBeenCalledWith('history', [])
    )

    expect(screen.getByTestId('history-count').textContent).toBe('0')
  })

  it('throws error when hook used outside provider', () => {
    const BadComp = () => {
      useHistoryContext()
      return null
    }

    expect(() => render(<BadComp />)).toThrow(
      'useHistoryContext must be used within HistoryProvider'
    )
  })
})
