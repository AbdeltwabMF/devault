import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faTimes, faInfo, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useState, useContext } from 'react'

import { TRUE, FALSE, UNSET } from '../../utils/states'

import styles from './StatusAlert.module.css'

export default function StatusAlert ({ header, message, type }) {
  const [show, setShow] = useState(TRUE)

  const handleClose = () => {
    setShow(prevState => FALSE)
  }

  return (
    <>
      <div
        className={'modal fade ' + `${show === TRUE ? ' show ' : ''}` + ' ' + `${styles.modal}`}
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        style={{ display: show === TRUE ? 'block' : 'none' }}
      >
        <div className={'modal-dialog ' + styles.dialog}>
          <div className={'modal-content ' + styles.content}>
            <div className={'modal-body ' + styles.body}>
              <FontAwesomeIcon
                icon={type === 'error'
                  ? faTimes
                  : type === 'warn'
                    ? faExclamationTriangle
                    : type === 'info'
                      ? faInfo
                      : faCheck}
                size='4x'
                fixedWidth
                className={`${styles.icon} ${type === 'error' ? styles.error : type === 'warn' ? styles.warn : type === 'info' ? styles.info : styles.success}`}
              />
              <h2 className={styles.title}>{header}</h2>
              <p className={styles.message}>{message}</p>
              <div className={styles.footer + ' modal-footer justify-content-center'}>
                <button
                  type='submit'
                  className={styles.ok + ' btn btn-primary'}
                  onClick={handleClose}
                >
                  <span className={styles.okText}>OK</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
