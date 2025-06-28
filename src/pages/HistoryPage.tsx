import React from 'react'
import { useHistoryContext } from '@/context/HistoryContext'
import {
  useRequestFormContext,
  type RequestFormState,
} from '@/context/RequestFormContext'
import { HistoryList } from '@/components/History/HistoryList'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

export const HistoryPage: React.FC = () => {
  const { history, clearHistory, deleteRequest } = useHistoryContext()
  const { setPreset } = useRequestFormContext()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  if (pathname !== '/') {
    document.body.classList.remove('headerPadding')
  }

  const handleReplay = (record: RequestFormState) => {
    setPreset(record)
    return navigate('/request', {
      state: record,
    })
  }
  return (
    <Container style={{ paddingTop: '5rem'}}>
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
        onReplay={handleReplay}
        onDelete={deleteRequest}
      />
    </Container>
  )
}
