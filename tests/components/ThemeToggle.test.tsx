import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ThemeContext } from '@/context/ThemeContext'
import { describe, expect, it, vi } from 'vitest'

describe('ThemeToggle', () => {
  const toggleTheme = vi.fn()

  const renderWithContext = (theme: 'light' | 'dark') =>
    render(
      <ThemeContext.Provider
        value={{
          theme: 'light',
          toggleTheme: vi.fn(),
          variant: 'light',
          className: 'light-mode',
        }}
      >
        <ThemeToggle />
      </ThemeContext.Provider>
    )

  it('renders correctly in light mode', () => {
    const { getByTestId } = renderWithContext('light')
    const toggleBtn = getByTestId('theme-toggle-btn')
    expect(toggleBtn.className).toContain('light')
  })

  it('renders correctly in dark mode', () => {
    const { getByTestId } = renderWithContext('dark')
    const toggleBtn = getByTestId('theme-toggle-btn')
    expect(toggleBtn.className).toContain('dark')
  })

  it('calls toggleTheme on click', () => {
    const { getByTestId } = renderWithContext('light')
    const toggleBtn = getByTestId('theme-toggle-btn')
    fireEvent.click(toggleBtn)
    expect(toggleTheme).toHaveBeenCalledTimes(1)
  })
})
