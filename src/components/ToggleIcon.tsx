import React from 'react'
import styles from './ToggleIcon.module.css'

interface Props {
  isDark: boolean
}

export const ThemeToggleIcon: React.FC<Props> = ({ isDark }) => {
  return (
    <div className={styles.neuBox}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className={`${styles.icon} ${isDark ? styles.dark : styles.light}`}
        aria-label="Theme Switch Icon"
      >
        <g>
          <circle cx="32" cy="32" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
          <g stroke="currentColor" strokeWidth="2">
            <line x1="32" y1="16" x2="32" y2="10" />
            <line x1="32" y1="48" x2="32" y2="54" />
            <line x1="16" y1="32" x2="10" y2="32" />
            <line x1="48" y1="32" x2="54" y2="32" />
            <line x1="21.8" y1="21.8" x2="18" y2="18" />
            <line x1="42.2" y1="42.2" x2="46" y2="46" />
            <line x1="21.8" y1="42.2" x2="18" y2="46" />
            <line x1="42.2" y1="21.8" x2="46" y2="18" />
          </g>
        </g>
      </svg>
    </div>
  )
}
