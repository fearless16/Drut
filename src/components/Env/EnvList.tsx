import React from 'react'
import type { EnvRecord } from '@/context/EnvContext'
import { Button, ListGroup, Stack } from 'react-bootstrap'

interface EnvListProps {
  environments: EnvRecord[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export const EnvList: React.FC<EnvListProps> = ({
  environments,
  onEdit,
  onDelete,
}) => {
  if (!environments.length) {
    return <div className="text-muted">No environments created yet.</div>
  }

  return (
    <ListGroup>
      {environments.map((env) => (
        <ListGroup.Item key={env.id}>
          <Stack direction="horizontal" gap={2}>
            <div className="me-auto">
              <strong>{env.name}</strong>
              <div className="text-muted small">
                {env.variables.length} variable(s)
              </div>
            </div>
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => onEdit(env.id)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => onDelete(env.id)}
            >
              Delete
            </Button>
          </Stack>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
