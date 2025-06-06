import React from 'react'
import { useHistoryContext } from '@/context/HistoryContext'
import { useRequestFormContext } from '@/context/RequestFormContext'
import { HistoryList } from '@/components/History/HistoryList'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export const HistoryPage: React.FC = () => {
  const { history, clearHistory, deleteRequest } = useHistoryContext()
  const { setPreset } = useRequestFormContext()

  return (
    <Container className="py-4">
      <Row className="align-items-center mb-3">
        <Col>
          <h2>Request History</h2>
        </Col>
        <Col xs="auto">
          <Button variant="outline-danger" onClick={clearHistory}>
            Clear History
          </Button>
        </Col>
      </Row>
      <HistoryList
        data={history}
        onReplay={setPreset}
        onDelete={deleteRequest}
      />
    </Container>
  )
}
