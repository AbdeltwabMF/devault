import styles from '../styles/Home.module.css'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useRouter } from 'next/router'

export default function Home () {
  const router = useRouter()

  return (
    <>
      <div className={styles.main}>
        <Container className={styles.container}>
          <Row className={styles.header}>
            <Col xs={12}>
              <h1 className={styles.headerTitle}>Decentralized encrypted cloud storage that respect your privacy</h1>
            </Col>
            <Col xs={12}>
              <h5 className={styles.headerDetails}>
                You deserve to live a sustainable, private, self-sufficient and independent life.
                <br />
                Join us now and expel big tech companies from your life.
                <br />
                Don't let anyone take this from you.
              </h5>
            </Col>
            <Col xs={12}>
              <Button
                onClick={() => router.push('/vault')}
                className={styles.getStarted}
              >
                Get started
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
