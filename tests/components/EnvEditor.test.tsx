import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { EnvEditor } from '@/components/Env/EnvEditor'

describe('EnvEditor', () => {
  const mockSave = vi.fn()
  const mockCancel = vi.fn()

  it('renders new env form', () => {
    render(<EnvEditor env={null} onSave={mockSave} onCancel={mockCancel} />)

    expect(screen.getByText('New Environment')).toBeInTheDocument()
    expect(screen.getByText('+ Add Variable')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
  })

  it('adds and removes variables', () => {
    render(<EnvEditor env={null} onSave={mockSave} onCancel={mockCancel} />)

    fireEvent.click(screen.getByText('+ Add Variable'))
    expect(screen.getAllByPlaceholderText('KEY').length).toBe(1)

    fireEvent.change(screen.getByPlaceholderText('KEY'), {
      target: { value: 'API_KEY' },
    })
    fireEvent.change(screen.getByPlaceholderText('VALUE'), {
      target: { value: '123' },
    })

    fireEvent.click(screen.getByText('×'))
    expect(screen.queryByPlaceholderText('KEY')).not.toBeInTheDocument()
  })

  it('submits form with name and vars', () => {
    render(<EnvEditor env={null} onSave={mockSave} onCancel={mockCancel} />)

    fireEvent.change(screen.getByLabelText('Environment Name'), {
      target: { value: 'Staging' },
    })

    fireEvent.click(screen.getByText('+ Add Variable'))
    fireEvent.change(screen.getByPlaceholderText('KEY'), {
      target: { value: 'URL' },
    })
    fireEvent.change(screen.getByPlaceholderText('VALUE'), {
      target: { value: 'api.com' },
    })

    fireEvent.click(screen.getByText('Save'))
    expect(mockSave).toHaveBeenCalledWith('Staging', [
      { key: 'URL', value: 'api.com' },
    ])
  })

  it('prefills env when editing', () => {
    render(
      <EnvEditor
        env={{
          id: 'x',
          name: 'EditMe',
          createdAt: 1,
          variables: [{ key: 'A', value: 'B' }],
        }}
        onSave={mockSave}
        onCancel={mockCancel}
      />
    )

    expect(screen.getByDisplayValue('EditMe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('A')).toBeInTheDocument()
    expect(screen.getByDisplayValue('B')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('calls cancel on cancel click', () => {
    render(
      <EnvEditor
        env={{ id: '1', name: 'Test', createdAt: 1, variables: [] }}
        onSave={mockSave}
        onCancel={mockCancel}
      />
    )

    fireEvent.click(screen.getByText('Cancel'))
    expect(mockCancel).toHaveBeenCalled()
  })
})
