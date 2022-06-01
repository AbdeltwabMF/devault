import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Vim, ReactJs, Artixlinux, Github, Telegram } from '@icons-pack/react-simple-icons/'
import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer () {
  return (
    <footer className={styles.main}>
      <Container className={styles.container}>
        <Row className={styles.social}>
          <Col xs={12} md={6} lg={3} className={styles.github}>
            <Link href='https://github.com/abdeltwabmf/decentralized-vault'>
              <a>
                <Github color='#0D6EFD' className={styles.icon} />on
                <span className={styles.label}>View Code</span>
              </a>
            </Link>
          </Col>
          <Col xs={12} md={6} lg={3} className={styles.telegram}>
            <Link href='https://t.me/+OeH3hX00HqxmZDc8'>
              <a>
                <Telegram color='#0D6EFD' className={styles.icon} />on
                <span className={styles.label}>Join Telegram</span>
              </a>
            </Link>
          </Col>
        </Row>

        <Row className={styles.acknowledgements}>
          <div>
            Built with <Vim color='#0D6EFD' className={styles.icon} /> &amp;
            <ReactJs color='#0D6EFD' className={styles.icon} />on
            <Artixlinux color='#0D6EFD' className={styles.icon} />
          </div>
        </Row>

        <Row className={styles.copy}>
          &copy; Copyright {new Date().getFullYear()} Decentralized Vault
        </Row>
      </Container>
    </footer>
  )
}
