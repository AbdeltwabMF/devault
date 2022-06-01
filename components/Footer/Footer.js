import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Vim, Artixlinux, Github, Telegram, ReactJs, Vercel } from '@icons-pack/react-simple-icons/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseLock } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer () {
  return (
    <footer className={styles.main}>
      <Container className={styles.container}>
        <Row className={styles.row1}>
          <Col xs={12} lg={4} className={styles.col1}>
            <Link href='https://github.com/abdeltwabmf/decentralized-vault'>
              <a className={styles.social}>
                <Github color='#3e3e3e' className={styles.socialIcon} />
                <span className={styles.labelLink}>View Source</span>
              </a>
            </Link>
            <Link href='https://t.me/+OeH3hX00HqxmZDc8'>
              <a className={styles.social}>
                <Telegram color='#0D6EFD' className={styles.socialIcon} />
                <span className={styles.labelLink}>Join Telegram</span>
              </a>
            </Link>
          </Col>
          <Col xs={12} lg={4} className={styles.col2}>
            <span className={styles.label}>Built with </span>
            <Vim color='#009732' size={19} className={styles.toolsIcon} /> &amp;
            <ReactJs color='#0D6EFD' size={19} className={styles.toolsIcon} />
            <span className={styles.label}>on</span>
            <Artixlinux color='#148FB5' size={19} className={styles.toolsIcon} />
          </Col>
          <Col xs={12} lg={4} className={styles.col3}>
            &copy; {new Date().getFullYear()}
            <FontAwesomeIcon icon={faHouseLock} size='lg' fixedWidth className={styles.brandIcon} />
            <span className={styles.brand}>Decentralized eVault</span>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
