import { describe, it, expect } from 'vitest'
import { useRequestForm } from '../src/hooks/useRequestForm'
import { renderHook } from '@testing-library/react'
import { act } from 'react'

describe('useRequestForm', () => {
  it('has default values', () => {
    const { result } = renderHook(() => useRequestForm())
    expect(result.current.method).toBe('GET')
    expect(result.current.url).toBe('')
    expect(result.current.headers).toEqual([])
    expect(result.current.body).toBe('')
    expect(result.current.isValid).toBe(false)
  })

  it('updates method correctly', () => {
    const { result } = renderHook(() => useRequestForm())
    act(() => {
      result.current.setMethod('POST')
    })
    expect(result.current.method).toBe('POST')
  })

  it('validates URL correctly', () => {
    const { result } = renderHook(() => useRequestForm())

    act(() => {
      result.current.setUrl('ftp://something.com')
    })
    expect(result.current.isValid).toBe(false)

    act(() => {
      result.current.setUrl('https://valid.com')
    })
    expect(result.current.isValid).toBe(true)
  })

  it('sets headers and body correctly', () => {
    const { result } = renderHook(() => useRequestForm())

    act(() => {
      result.current.setHeaders([{ key: 'x-api-key', value: '123' }])
    })
    expect(result.current.headers).toEqual([{ key: 'x-api-key', value: '123' }])

    act(() => {
      result.current.setBody('{ "name": "Paju" }')
    })
    expect(result.current.body).toBe('{ "name": "Paju" }')
  })
})
