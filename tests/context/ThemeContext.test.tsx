import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from '@/context/ThemeContext'

const wrapper = ({ children }: any) => <ThemeProvider>{children}</ThemeProvider>

describe('ThemeContext', () => {
  beforeEach(() => {
    document.body.classList.remove('light', 'dark')
    localStorage.clear()
  })

  it('defaults to light theme', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.theme).toBe('light')
    expect(document.body.classList.contains('light')).toBe(true)
  })

  it('loads stored theme from localStorage', () => {
    localStorage.setItem('drut_theme', 'dark')
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.theme).toBe('dark')
    expect(document.body.classList.contains('dark')).toBe(true)
  })

  it('toggles theme correctly', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    act(() => result.current.toggleTheme())
    expect(result.current.theme).toBe('dark')
    expect(document.body.classList.contains('dark')).toBe(true)

    act(() => result.current.toggleTheme())
    expect(result.current.theme).toBe('light')
    expect(document.body.classList.contains('light')).toBe(true)
  })

  it('persists theme in localStorage', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    act(() => result.current.toggleTheme())
    expect(localStorage.getItem('drut_theme')).toBe('dark')
  })
})
