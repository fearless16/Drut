import React, { useState } from 'react'
import { useEnvContext } from '@/context/EnvContext'
import { EnvList } from '@/components/Env/EnvList'
import { EnvEditor } from '@/components/Env/EnvEditor'
import { Container, Row, Col, Button } from 'react-bootstrap'

export const EnvPage: React.FC = () => {
  const { environments, addEnv, updateEnv, deleteEnv } = useEnvContext()
  const [editingEnvId, setEditingEnvId] = useState<string | null>(null)

  const handleSave = (name: string, variables: any[]) => {
    if (editingEnvId) {
      updateEnv(editingEnvId, { name, variables })
      setEditingEnvId(null)
    } else {
      addEnv(name, variables)
    }
  }

  const handleEdit = (id: string) => {
    setEditingEnvId(id)
  }

  const handleCancel = () => setEditingEnvId(null)

  const editingEnv = environments.find((e) => e.id === editingEnvId) || null

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col>
          <h2>Manage Environments</h2>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <EnvList
            environments={environments}
            onEdit={handleEdit}
            onDelete={deleteEnv}
          />
        </Col>
        <Col md={6}>
          <EnvEditor
            key={editingEnv?.id || 'new'}
            env={editingEnv}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </Col>
      </Row>
    </Container>
  )
}
