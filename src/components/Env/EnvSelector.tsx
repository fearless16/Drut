import React from 'react'
import { useEnvContext } from '@/context/EnvContext'
import { Form } from 'react-bootstrap'

export const EnvSelector: React.FC = () => {
  const { environments, selectedEnvId, selectEnv } = useEnvContext()

  return (
    <Form.Group className="mb-3" controlId="env-selector">
      <Form.Label>Select Environment</Form.Label>
      <Form.Select
        value={selectedEnvId || ''}
        onChange={(e) => selectEnv(e.target.value || null)}
      >
        <option value="">-- No Environment --</option>
        {environments.map((env) => (
          <option key={env.id} value={env.id}>
            {env.name}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}
