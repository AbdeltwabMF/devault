import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { useState, useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVault } from '@fortawesome/free-solid-svg-icons'

import { FileContext } from '../../pages/vault'

import styles from './UploadingFiles.module.css'

export default function Uploading ({ onFail, onSuccess }) {
  const [lgShow, setLgShow] = useState(true)
  const { setIsCanceled } = useContext(FileContext)

  const handleCancel = () => {
    setLgShow(false)
    setIsCanceled(prevState => true)
  }

  return (
    <>
      <Modal
        size='md'
        show={lgShow}
        onHide={() => setLgShow(false)}
        backdrop='static'
        keyboard={false}
        aria-labelledby='uploading-modal'
        centered
        className={styles.main}
      >
        <Modal.Header
          className={styles.header}
        >
          <Modal.Title
            id='uploading-modal-title'
            className={styles.title}
          >
            <FontAwesomeIcon
              icon={faVault}
              size='xl'
              fixedWidth
              className={styles.iconTitle}
            />
            Uploading your files to the eVault.
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className={styles.body}>
          <Spinner
            animation='border'
            role='status'
            className={styles.spinner}
          >
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </Modal.Body>
        <Modal.Footer className={styles.footer}>
          <Button
            onClick={handleCancel}
            className={styles.buttonCancel}
            variant='danger'
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
