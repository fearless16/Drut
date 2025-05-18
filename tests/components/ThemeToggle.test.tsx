import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ThemeProvider } from '@/context/ThemeContext'

describe('ThemeToggle', () => {
  const setup = () =>
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

  it('shows correct button text and toggles', () => {
    setup()
    const btn = screen.getByRole('button')
    expect(btn.textContent).toMatch(/Switch to Dark/i)

    fireEvent.click(btn)
    expect(btn.textContent).toMatch(/Switch to Light/i)

    fireEvent.click(btn)
    expect(btn.textContent).toMatch(/Switch to Dark/i)
  })
})
