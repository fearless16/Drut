import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { EnvList } from '@/components/Env/EnvList'

describe('EnvList', () => {
  const fakeEnvs = [
    { id: '1', name: 'Staging', variables: [], createdAt: 1 },
    {
      id: '2',
      name: 'Prod',
      variables: [{ key: 'X', value: 'Y' }],
      createdAt: 2,
    },
  ]

  it('renders all envs', () => {
    render(
      <EnvList environments={fakeEnvs} onEdit={() => {}} onDelete={() => {}} />
    )
    expect(screen.getByText('Staging')).toBeInTheDocument()
    expect(screen.getByText('Prod')).toBeInTheDocument()
  })

  it('triggers edit and delete callbacks', () => {
    const onEdit = vi.fn()
    const onDelete = vi.fn()
    render(
      <EnvList environments={fakeEnvs} onEdit={onEdit} onDelete={onDelete} />
    )

    fireEvent.click(screen.getAllByText('Edit')[0])
    fireEvent.click(screen.getAllByText('Delete')[0])

    expect(onEdit).toHaveBeenCalledWith('1')
    expect(onDelete).toHaveBeenCalledWith('1')
  })

  it('shows fallback text for empty list', () => {
    render(<EnvList environments={[]} onEdit={() => {}} onDelete={() => {}} />)
    expect(screen.getByText(/no environments/i)).toBeInTheDocument()
  })
})
