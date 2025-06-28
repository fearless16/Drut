import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { ThemeProvider, useTheme } from '@/context/ThemeContext'
import localforage from 'localforage'

// ⛑ Properly mock localforage default
vi.mock('localforage', () => {
  return {
    default: {
      getItem: vi.fn(),
      setItem: vi.fn(),
    },
  }
})

// ⚙ Helper to extract mocked version
const mockedLocalforage = localforage as unknown as {
  getItem: ReturnType<typeof vi.fn>
  setItem: ReturnType<typeof vi.fn>
}

// 🔧 Mock matchMedia for system theme
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: query === '(prefers-color-scheme: dark)',
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
})

// 🧪 TestComponent to hook into context
const Dummy = () => {
  const { theme, variant, className, toggleTheme } = useTheme()
  return (
    <>
      <div data-testid="theme">{theme}</div>
      <div data-testid="variant">{variant}</div>
      <div data-testid="className">{className}</div>
      <button onClick={toggleTheme}>Toggle</button>
    </>
  )
}

const renderThemeContext = async () => {
  await act(async () => {
    render(
      <ThemeProvider>
        <Dummy />
      </ThemeProvider>
    )
  })
}

describe('ThemeContext', () => {
  beforeEach(() => {
    document.body.className = ''
    vi.clearAllMocks()
  })

  it('loads system dark theme if no saved value', async () => {
    mockedLocalforage.getItem.mockResolvedValueOnce(null)

    await renderThemeContext()

    expect(screen.getByTestId('theme').textContent).toBe('dark')
    expect(document.body.classList.contains('theme-dark')).toBe(true)
    expect(mockedLocalforage.setItem).toHaveBeenCalledWith('drut_theme', 'dark')
  })

  it('loads stored theme from localforage if exists', async () => {
    mockedLocalforage.getItem.mockResolvedValueOnce('light')

    await renderThemeContext()

    expect(screen.getByTestId('theme').textContent).toBe('light')
    expect(document.body.classList.contains('theme-light')).toBe(true)
  })

  it('toggles from light → dark → light and updates class + storage', async () => {
    mockedLocalforage.getItem.mockResolvedValueOnce('light')

    await renderThemeContext()

    const toggleBtn = screen.getByRole('button', { name: /toggle/i })
    expect(screen.getByTestId('theme').textContent).toBe('light')

    await act(() => fireEvent.click(toggleBtn))
    expect(screen.getByTestId('theme').textContent).toBe('dark')
    expect(document.body.classList.contains('theme-dark')).toBe(true)
    expect(mockedLocalforage.setItem).toHaveBeenCalledWith('drut_theme', 'dark')

    await act(() => fireEvent.click(toggleBtn))
    expect(screen.getByTestId('theme').textContent).toBe('light')
    expect(document.body.classList.contains('theme-light')).toBe(true)
    expect(mockedLocalforage.setItem).toHaveBeenCalledWith('drut_theme', 'light')
  })

  it('provides correct className and variant values', async () => {
    mockedLocalforage.getItem.mockResolvedValueOnce('dark')

    await renderThemeContext()

    expect(screen.getByTestId('variant').textContent).toBe('dark')
    expect(screen.getByTestId('className').textContent).toBe('theme-dark')
  })

  it('throws error when useTheme used outside provider', () => {
    const Breaker = () => {
      useTheme()
      return <div />
    }

    expect(() => render(<Breaker />)).toThrowError(
      'useTheme must be used inside ThemeProvider'
    )
  })
})
