import React from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'

const Home: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.wrapper}>
      <Container className={`text-center py-5 ${styles.fadeIn}`}>
        <Row className="mb-4">
          <Col>
            <div
              className={`${styles.logoWrap} d-flex align-items-center justify-content-center`}
            >
              <span className={styles.title}>⚡</span>
              <span className={styles.logo}> DRUT</span>
            </div>
            <div className={styles.line} />
            <p className={styles.slogan}>
              Drut –{' '}
              <span className={styles.nowait}>
                for developers who don't wait
              </span>
            </p>
            <p className={styles.tagline}>
              The API client built for <span className={styles.punch}>war</span>
              .
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center mb-5">
          <Col md={8} lg={6}>
            <p className={styles.subtext}>
              No login. No cloud. No bullshit. Just speed, control. <br />
              <br />
              <b>Pure f**king performance — right in your browser.</b>
            </p>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Button
              size="lg"
              variant="outline-light"
              className={styles.pulseBtn}
              onClick={() => navigate('/request')}
            >
              🚀 Start Building Requests
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home
