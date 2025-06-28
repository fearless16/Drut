import React from 'react'
import { useTheme } from '@/context/ThemeContext'
import styles from './ThemeToggle.module.css'
import { ThemeToggleIcon } from './ToggleIcon'

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={styles.wrapper} data-testid="theme-wrapper">
      <button
        className={`${styles.toggle} ${theme === 'dark' ? styles.dark : styles.light}`}
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        data-testid="theme-toggle-btn"
      >
        <div className={styles.thumb} data-testid="theme-thumb" />
        <ThemeToggleIcon isDark={theme === 'dark'} />
      </button>
    </div>
  )
}
