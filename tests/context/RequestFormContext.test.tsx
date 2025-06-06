import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import {
  RequestFormProvider,
  useRequestFormContext,
  type RequestPreset,
} from '@/context/RequestFormContext'
import { HTTP_METHODS } from '@/constants/http'

const wrapper = ({ children }: any) => (
  <RequestFormProvider>{children}</RequestFormProvider>
)

describe('RequestFormContext', () => {
  const sample: RequestPreset = {
    method: HTTP_METHODS.POST,
    url: 'https://example.com',
    headers: [{ key: 'X', value: '1' }],
    body: 'test',
  }

  it('provides default null preset', () => {
    const { result } = renderHook(() => useRequestFormContext(), { wrapper })
    expect(result.current.preset).toBe(null)
  })

  it('sets and clears preset correctly', () => {
    const { result } = renderHook(() => useRequestFormContext(), { wrapper })

    act(() => {
      result.current.setPreset(sample)
    })
    expect(result.current.preset).toEqual(sample)

    act(() => {
      result.current.setPreset(null)
    })
    expect(result.current.preset).toBe(null)
  })
})
