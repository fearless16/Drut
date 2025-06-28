import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import * as localforage from 'localforage'
import { ThemeProvider } from 'react-bootstrap'
import { useTheme } from '@/context/ThemeContext'

vi.mock('localforage', async (importOriginal) => {
  const actual = await importOriginal() as object
  return {
    ...actual,
    getItem: vi.fn(),
    setItem: vi.fn(),
  }
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: query === '(prefers-color-scheme: dark)',
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
})

const wrapper = ({ children }: any) => <ThemeProvider>{children}</ThemeProvider>

describe('ThemeContext', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    document.body.className = ''
  })

  it('initializes theme from localforage if available', async () => {
    ;(localforage.getItem as any).mockResolvedValueOnce('light')

    const { result } = renderHook(() => useTheme(), { wrapper })

    await waitFor(() => {
      expect(result.current.theme).toBe('light')
      expect(document.body.classList.contains('theme-light')).toBe(true)
    })
  })

  it('falls back to system dark mode if no stored value', async () => {
    ;(localforage.getItem as any).mockResolvedValueOnce(null)

    const { result } = renderHook(() => useTheme(), { wrapper })

    await waitFor(() => {
      expect(result.current.theme).toBe('dark')
      expect(document.body.classList.contains('theme-dark')).toBe(true)
    })
  })

  it('toggleTheme switches theme and updates body/class', async () => {
    ;(localforage.getItem as any).mockResolvedValueOnce('dark')

    const { result } = renderHook(() => useTheme(), { wrapper })

    await waitFor(() => {
      expect(result.current.theme).toBe('dark')
    })

    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe('light')
    expect(document.body.classList.contains('theme-light')).toBe(true)
    expect(localforage.setItem).toHaveBeenCalledWith('drut_theme', 'light')
  })

  it('throws error when used outside provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => renderHook(() => useTheme())).toThrow(
      'useTheme must be used inside ThemeProvider'
    )

    spy.mockRestore()
  })
})
