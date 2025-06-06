import { renderHook, act } from '@testing-library/react'
import { useRequestForm } from '@/hooks/useRequestForm'
import { describe, it, expect } from 'vitest'
import { HTTP_METHODS } from '@/constants/http'

describe('useRequestForm', () => {
  it('initializes with correct defaults', () => {
    const { result } = renderHook(() => useRequestForm())
    expect(result.current.method).toBe(HTTP_METHODS.GET)
    expect(result.current.url).toBe('')
    expect(result.current.headers).toEqual([])
    expect(result.current.body).toBe('')
    expect(result.current.isValid).toBe(false)
  })

  it('updates url and validates correctly', () => {
    const { result } = renderHook(() => useRequestForm())

    act(() => {
      result.current.setUrl('https://example.com')
    })

    expect(result.current.url).toBe('https://example.com')
    expect(result.current.isValid).toBe(true)
  })

  it('updates method and body', () => {
    const { result } = renderHook(() => useRequestForm())

    act(() => {
      result.current.setMethod(HTTP_METHODS.POST)
      result.current.setBody('{"test": 1}')
    })

    expect(result.current.method).toBe(HTTP_METHODS.POST)
    expect(result.current.body).toBe('{"test": 1}')
  })

  it('updates headers array', () => {
    const { result } = renderHook(() => useRequestForm())
    const headers = [{ key: 'X-Test', value: '123' }]

    act(() => {
      result.current.setHeaders(headers)
    })

    expect(result.current.headers).toEqual(headers)
  })
})
