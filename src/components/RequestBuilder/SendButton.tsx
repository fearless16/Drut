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
  return (
    <Button onClick={onClick} disabled={disabled || loading}>
      {loading ? 'Sending...' : 'Send Request'}
    </Button>
  )
}
