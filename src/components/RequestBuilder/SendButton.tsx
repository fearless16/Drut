import { useTheme } from '@/context/ThemeContext'
import React from 'react'
import { Button } from 'react-bootstrap'

interface SendButtonProps {
  disabled?: boolean
  loading?: boolean
  onClick: () => void
}

export const SendButton: React.FC<SendButtonProps> = ({
  disabled = false,
  loading = false,
  onClick,
}) => {
  const { theme } = useTheme()
  return (
    <Button
      variant={theme === 'dark' ? 'primary' : 'dark'}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? 'Sending...' : 'Send Request'}
    </Button>
  )
}
