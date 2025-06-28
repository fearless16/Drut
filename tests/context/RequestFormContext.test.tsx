import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { HTTP_METHODS } from '@/constants/http'
import { RequestFormProvider, useRequestFormContext } from '@/context/RequestFormContext'
import { ActionType } from '@/context/reducer/requestFormReducer'

const wrapper = ({ children }: any) => (
  <RequestFormProvider>{children}</RequestFormProvider>
)

describe('RequestFormContext', () => {
  it('throws if used outside provider', () => {
    expect(() => renderHook(() => useRequestFormContext())).toThrow(
      'useRequestFormContext must be used within RequestFormProvider'
    )
  })

  it('provides initial state', () => {
    const { result } = renderHook(() => useRequestFormContext(), { wrapper })
    expect(result.current.state).toEqual({
      method: HTTP_METHODS.GET,
      url: '',
      headers: [],
      body: '',
    })
  })

  it('updates state using dispatch', () => {
    const { result } = renderHook(() => useRequestFormContext(), { wrapper })

    act(() => {
      result.current.dispatch({
        type: ActionType.SET_URL,
        payload: 'https://yo.com',
      })
    })

    expect(result.current.state.url).toBe('https://yo.com')
  })

  it('setPreset sets all fields', () => {
    const { result } = renderHook(() => useRequestFormContext(), { wrapper })

    const preset = {
      method: HTTP_METHODS.POST,
      url: 'https://preset.com',
      headers: [{ key: 'x', value: 'y' }],
      body: '{"hello": "world"}',
    }

    act(() => {
      result.current.setPreset(preset)
    })

    expect(result.current.state).toEqual(preset)
  })

  it('resetForm resets to initialState', () => {
    const { result } = renderHook(() => useRequestFormContext(), { wrapper })

    act(() => {
      result.current.dispatch({ type: ActionType.SET_URL, payload: 'https://yo.com' })
      result.current.resetForm()
    })

    expect(result.current.state.url).toBe('')
    expect(result.current.state.method).toBe(HTTP_METHODS.GET)
  })
})
