import styles from '../styles/Home.module.css'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Home () {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>DeVa - Decentralized Vault</h1>

      <div>
        <p className={styles.description}>
          A Blockchain-based Decentralized Cloud Storage System
        </p>
        <hr />
      </div>
      <Row className='mx-0'>
        <Button as={Col} variant='primary'>Button #1</Button>
        <Button as={Col} variant='secondary' className='mx-2'>Button #2</Button>
        <Button as={Col} variant='success'>Button #3</Button>
      </Row>
    </div>
  )
}
