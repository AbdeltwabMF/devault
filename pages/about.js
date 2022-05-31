import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import styles from '../styles/About.module.css'

export default function Home () {
  return (
    <div>
      <Container className={styles.container}>
        <h1 className={styles.title}>Decentralized eVault</h1>
        <Row>
          <Col xs={12}>
            <div>
              <p className={styles.description}>
                A Blockchain-based decentralized encrypted cloud storage.
              </p>
              <hr />
            </div>
          </Col>
          <Col xs={12}>
            <div className={styles.card}>
              <h2>Private</h2>
              <p>
                DeeVa encrypts and distributes your files across a decentralized
                network. You control your private encryption keys and you own your
                data.
              </p>
            </div>
          </Col>
          <Col xs={12}>
            <div className={styles.card}>
              <h2>Source</h2>
              <p>
                Every file is encrypted, split into pieces, and stored on diverse
                Nodes
              </p>
            </div>
          </Col>
          <Col xs={12}>
            <div className={styles.card}>
              <h2>Available</h2>
              <p>
                Due to the nature of the decentralized network, your data is
                multi-region by default, always available when you need it.
              </p>
            </div>
          </Col>
          <Col xs={12}>
            <div className={styles.card}>
              <h2>Open Source</h2>
              <p>DeeVa software is completely open source</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
