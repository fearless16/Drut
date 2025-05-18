import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { EnvPage } from '@/pages/EnvPage'
import { EnvContext } from '@/context/EnvContext'

const fakeCtx = {
  environments: [{ id: '1', name: 'Test', variables: [], createdAt: 1 }],
  selectedEnvId: null,
  addEnv: () => {},
  updateEnv: () => {},
  deleteEnv: () => {},
  selectEnv: () => {},
  selectedEnv: null,
}

describe('EnvPage', () => {
  it('renders heading and components', () => {
    render(
      <EnvContext.Provider value={fakeCtx}>
        <EnvPage />
      </EnvContext.Provider>
    )

    expect(screen.getByText('Manage Environments')).toBeInTheDocument()
    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })
})
