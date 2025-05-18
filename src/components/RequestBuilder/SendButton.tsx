import React from 'react'

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
    <button
      className="btn btn-primary"
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? 'Sending...' : 'Send Request'}
    </button>
  )
}
