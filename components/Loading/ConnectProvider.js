import Spinner from 'react-bootstrap/Spinner'
import styles from './ConnectProvider.module.css'

export default function ConnectProvider () {
  return (
    <>
      <div className={styles.container}>
        <Spinner animation='border' variant='success' className={styles.spinner} />
        <div className={styles.connecting}>
          <p>Connecting to metamask account...</p>
        </div>
      </div>
    </>
  )
}
