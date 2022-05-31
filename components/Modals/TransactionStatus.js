import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons'

import styles from './TransactionStatus.module.css'

export default function TransactionStatus ({ isSucceed }) {
  const [lgShow, setLgShow] = useState(true)

  return (
    <>
      <Modal
        size='md'
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby='uploading-modal'
        centered
        className={styles.main}
      >
        <Modal.Body className={styles.body}>
          <FontAwesomeIcon
            icon={isSucceed ? faCheck : faXmark}
            size='5x'
            fixedWidth
            beat
            className={`${styles.icon} ${isSucceed ? styles.success : styles.fail}`}
          />
          {
          isSucceed === true
            ? <h3 className={styles.title}>Transaction made successfully! </h3>
            : <h3 className={styles.title}>Cannot make a transaction!</h3>
          }
        </Modal.Body>
      </Modal>
    </>
  )
}
