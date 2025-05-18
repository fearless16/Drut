import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'
import localforage from 'localforage'
import { EnvProvider, useEnvContext } from '@/context/EnvContext'

// Mock localforage default export
vi.mock('localforage', () => ({
  __esModule: true,
  default: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
}))

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <EnvProvider>{children}</EnvProvider>
)

describe('EnvContext', () => {
  beforeEach(() => {
    // Reset and set default mock behaviors
    ;(localforage.getItem as any).mockReset()
    ;(localforage.setItem as any).mockReset()
    ;(localforage.removeItem as any).mockReset()
    ;(localforage.getItem as any).mockResolvedValue(null)
    ;(localforage.setItem as any).mockResolvedValue(undefined)
    ;(localforage.removeItem as any).mockResolvedValue(undefined)
  })

  it('loads envs and selectedEnvId on mount', async () => {
    const fakeEnvs = [
      { id: '1', name: 'Env 1', variables: [], createdAt: 123 },
      { id: '2', name: 'Env 2', variables: [], createdAt: 456 },
    ]
    ;(localforage.getItem as any).mockImplementation(async (key: string) => {
      if (key === 'environments') return fakeEnvs
      if (key === 'selectedEnvId') return '1'
      return null
    })

    const { result } = renderHook(() => useEnvContext(), { wrapper })

    await waitFor(() => {
      expect(result.current.environments).toEqual(fakeEnvs)
      expect(result.current.selectedEnvId).toBe('1')
      expect(result.current.selectedEnv?.id).toBe('1')
    })
  })

  it('adds new env and persists it', async () => {
    const { result } = renderHook(() => useEnvContext(), { wrapper })

    await act(async () => {
      await result.current.addEnv('TestEnv', [
        { key: 'API_URL', value: 'https://test.com' },
      ])
    })

    await waitFor(() => {
      expect(result.current.environments).toHaveLength(1)
    })

    expect(localforage.setItem).toHaveBeenCalledWith(
      'environments',
      result.current.environments
    )
  })

  it('updates an existing env', async () => {
    const { result } = renderHook(() => useEnvContext(), { wrapper })

    // Add an env first
    await act(async () => {
      await result.current.addEnv('OldEnv', [])
    })
    const id = result.current.environments[0].id

    // Update it
    await act(async () => {
      await result.current.updateEnv(id, { name: 'UpdatedEnv' })
    })

    expect(result.current.environments[0].name).toBe('UpdatedEnv')
  })

  it('deletes env and clears selected if needed', async () => {
    const { result } = renderHook(() => useEnvContext(), { wrapper })

    // Add and select an env
    await act(async () => {
      await result.current.addEnv('ToDelete', [])
    })
    const id = result.current.environments[0].id
    await act(async () => {
      await result.current.selectEnv(id)
    })

    // Delete it
    await act(async () => {
      await result.current.deleteEnv(id)
    })

    expect(result.current.environments).toHaveLength(0)
    expect(result.current.selectedEnvId).toBeNull()
    expect(localforage.setItem).toHaveBeenCalledWith('selectedEnvId', null)
  })

  it('selects an environment', async () => {
    const { result } = renderHook(() => useEnvContext(), { wrapper })

    // Add an env
    await act(async () => {
      await result.current.addEnv('SelectMe', [])
    })

    await waitFor(() => {
      expect(result.current.environments).not.toHaveLength(0)
    })

    const id = result.current.environments[0].id
    await act(async () => {
      await result.current.selectEnv(id)
    })

    expect(result.current.selectedEnvId).toBe(id)
    expect(result.current.selectedEnv?.id).toBe(id)
  })

  it('handles empty envs gracefully', () => {
    const { result } = renderHook(() => useEnvContext(), { wrapper })

    expect(result.current.environments).toEqual([])
    expect(result.current.selectedEnvId).toBeNull()
    expect(result.current.selectedEnv).toBeNull()
  })
})
