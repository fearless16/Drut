import React, { useState } from 'react'
import { Button, Form, Stack } from 'react-bootstrap'
import type { EnvRecord, EnvVar } from '@/context/EnvContext'

interface EnvEditorProps {
  env: EnvRecord | null
  onSave: (name: string, vars: EnvVar[]) => void
  onCancel: () => void
}

export const EnvEditor: React.FC<EnvEditorProps> = ({
  env,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(env?.name || '')
  const [vars, setVars] = useState<EnvVar[]>(env?.variables || [])

  const updateVar = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...vars]
    updated[index] = { ...updated[index], [field]: value }
    setVars(updated)
  }

  const addVar = () => setVars([...vars, { key: '', value: '' }])

  const removeVar = (index: number) =>
    setVars(vars.filter((_, i) => i !== index))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSave(name.trim(), vars)
      setName('')
      setVars([])
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h5>{env ? 'Edit Environment' : 'New Environment'}</h5>
      <Form.Group className="mb-2">
        <Form.Label>Environment Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Staging"
          aria-label='Environment Name'
        />
      </Form.Group>

      {vars.map((v, i) => (
        <Stack direction="horizontal" gap={2} className="mb-2" key={i}>
          <Form.Control
            placeholder="KEY"
            value={v.key}
            onChange={(e) => updateVar(i, 'key', e.target.value)}
          />
          <Form.Control
            placeholder="VALUE"
            value={v.value}
            onChange={(e) => updateVar(i, 'value', e.target.value)}
          />
          <Button variant="outline-danger" onClick={() => removeVar(i)}>
            ×
          </Button>
        </Stack>
      ))}

      <div className="d-flex justify-content-between">
        <Button variant="outline-secondary" type="button" onClick={addVar}>
          + Add Variable
        </Button>
        <div className="d-flex gap-2">
          {env && (
            <Button variant="outline-warning" type="button" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button variant="primary" type="submit">
            Save
          </Button>
        </div>
      </div>
    </Form>
  )
}
