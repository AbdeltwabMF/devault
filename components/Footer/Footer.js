import styles from './Footer.module.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'

export default function Footer () {
  return (
    <footer>
      <Container>
        <Row>
          <Col md={6} xs={12}>
            <Row>
              &copy; {new Date().getFullYear()} Decentralized Vault
            </Row>
            <Row>
              <FontAwesomeIcon icon={faFacebook} size='lg' fixedWidth spin className={styles.facebook} />
              your privacy is important to us
            </Row>
          </Col>
          <Col md={6} xs={12}>contact</Col>
        </Row>
      </Container>
    </footer>
  )
}
