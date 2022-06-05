import { useState, useContext } from 'react'

import { FileContext } from '../../pages/vault'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import styles from './UploadingFiles.module.css'

export default function UploadingFile () {
  const [show, setShow] = useState(true)
  const { setIsCanceled } = useContext(FileContext)

  const handleCancel = () => {
    setShow(false)
    setIsCanceled(prevState => true)
  }

  return (
    <>
      <div
        className={'modal fade ' + `${show ? ' show' : ''}` + ' ' + `${styles.main}`}
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        style={{ display: show ? 'block' : 'none' }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className={'modal-body ' + `${styles.body}`}>
              <FontAwesomeIcon icon={faSpinner} size='2x' spin className={styles.spinner} />
              <div className={styles.title}>
                Your files are being encrypted and uploaded. This may take a few minutes.
              </div>
              <div className={styles.footer}>
                <button
                  type='button'
                  onClick={handleCancel}
                  class='btn btn-danger'
                  data-bs-dismiss='modal'
                >Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
