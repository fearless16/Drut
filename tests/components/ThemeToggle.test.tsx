import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ThemeContext } from '@/context/ThemeContext'

const mockToggleTheme = vi.fn()

const renderWithTheme = (theme: 'light' | 'dark') => {
  return render(
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: mockToggleTheme,
        variant: theme,
        className: `theme-${theme}`,
      }}
    >
      <ThemeToggle />
    </ThemeContext.Provider>
  )
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly in dark mode', () => {
    renderWithTheme('dark')
    const toggleBtn = screen.getByTestId('theme-toggle-btn')
    expect(toggleBtn).toBeInTheDocument()
    expect(toggleBtn.className).toContain('dark')
  })

  it('renders correctly in light mode', () => {
    renderWithTheme('light')
    const toggleBtn = screen.getByTestId('theme-toggle-btn')
    expect(toggleBtn).toBeInTheDocument()
    expect(toggleBtn.className).toContain('light')
  })

  it('calls toggleTheme on click', () => {
    renderWithTheme('light')
    const toggleBtn = screen.getByTestId('theme-toggle-btn')
    fireEvent.click(toggleBtn)
    expect(mockToggleTheme).toHaveBeenCalledTimes(1)
  })

  it('renders the icon and thumb', () => {
    renderWithTheme('dark')
    expect(screen.getByTestId('theme-thumb')).toBeInTheDocument()
    expect(screen.getByTestId('theme-toggle-btn')).toBeInTheDocument()
  })
})
