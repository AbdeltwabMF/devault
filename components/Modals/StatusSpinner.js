import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { TRUE, FALSE } from '../../utils/states'

import styles from './StatusSpinner.module.css'

export default function StatusSpinner ({ header, message, type }) {
  const [show, setShow] = useState(TRUE)

  const handleCancel = () => {
    setShow(prevStat => FALSE)
  }

  return (
    <>
      <div
        className={'modal fade ' + `${show === TRUE ? ' show' : ''}` + ' ' + `${styles.modal}`}
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        style={{ display: show === TRUE ? 'block' : 'none' }}
      >
        <div className={'modal-dialog ' + styles.dialog}>
          <div className={'modal-content ' + styles.content}>
            <div className={'modal-body ' + styles.body}>
              <FontAwesomeIcon
                icon={faSpinner}
                size='4x'
                spin
                className={styles.spinner + ' ' + `${styles.icon} ${type === 'error' ? styles.error : type === 'warn' ? styles.warn : type === 'info' ? styles.info : styles.success}`}
              />
              <h2 className={styles.title}>{header}</h2>
              <p className={styles.message}>{message}</p>
              <div className={styles.footer}>
                <button
                  type='button'
                  className={styles.close + ' btn btn-danger'}
                  data-bs-dismiss='modal'
                  onClick={handleCancel}
                >Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
