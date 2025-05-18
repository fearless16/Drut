import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { EnvSelector } from '@/components/Env/EnvSelector'
import { EnvContext } from '@/context/EnvContext'

describe('EnvSelector', () => {
  it('renders options and handles select', () => {
    const selectEnv = vi.fn()
    const ctx = {
      environments: [{ id: '1', name: 'Dev', variables: [], createdAt: 1 }],
      selectedEnvId: null,
      selectEnv,
    }

    render(
      <EnvContext.Provider value={ctx as any}>
        <EnvSelector />
      </EnvContext.Provider>
    )

    fireEvent.change(screen.getByLabelText('Select Environment'), {
      target: { value: '1' },
    })

    expect(selectEnv).toHaveBeenCalledWith('1')
  })
})
