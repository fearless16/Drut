import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

enum ThemeType {
  LIGHT = 'light',
  DARK = 'dark'
}

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
const THEME_KEY = 'drut_theme'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(THEME_KEY) as Theme
    return stored === ThemeType.DARK ? ThemeType.DARK : ThemeType.LIGHT
  })

  useEffect(() => {
    document.body.classList.remove(ThemeType.LIGHT, ThemeType.DARK)
    document.body.classList.add(theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme((prev) => (prev === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT))

  const isDark = theme === ThemeType.DARK

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
