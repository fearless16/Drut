import localforage from 'localforage'
import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  variant: Theme
  className: string
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
const THEME_KEY = 'drut_theme'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const init = async () => {
      const stored = (await localforage.getItem<string>(THEME_KEY)) as Theme
      const system = window.matchMedia('(prefers-color-scheme: dark)').matches
      const resolved = stored || (system ? 'dark' : 'light')

      setTheme(resolved)
      document.body.classList.add('theme-transition')
      document.body.classList.add(`theme-${resolved}`)
    }

    init()
  }, [])

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark')
    document.body.classList.add(`theme-${theme}`)
    localforage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        variant: theme,
        className: `theme-${theme}`,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
