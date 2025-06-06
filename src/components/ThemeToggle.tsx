import React from 'react'
import { Button } from 'react-bootstrap'
import { useTheme } from '@/context/ThemeContext'

export const ThemeToggle: React.FC = () => {
  const { toggleTheme, isDark } = useTheme()

  const nextTheme = isDark ? 'Light' : 'Dark'
  const variant = isDark ? 'outline-secondary' : 'outline-dark'

  return (
    <Button variant={variant} onClick={toggleTheme} size="sm">
      Switch to {nextTheme} Mode
    </Button>
  )
}
