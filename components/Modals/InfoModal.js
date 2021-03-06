import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'

import { TRUE, FALSE } from '../../utils/states'

import styles from './InfoModal.module.css'

export default function InfoModal (props) {
  const [show, setShow] = useState(TRUE)
  const { header, message, buttonText, buttonAction, onClose } = props

  const cancelHandle = () => {
    setShow(prevStat => FALSE)
    onClose()
  }

  return (
    <>
      <div
        className={'modal fade ' + `${show === TRUE ? ' show ' : ''}` + `${styles.modal}`}
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        style={{ display: show === TRUE ? 'block' : 'none' }}
      >
        <div className={'modal-content ' + styles.content}>
          <div className={'modal-body ' + styles.body}>
            <FontAwesomeIcon
              icon={faInfo}
              size='2x'
              className={styles.icon}
            />
            <span className={styles.header}>{header}</span>
            <span className={styles.message}>{message}</span>
            <div className={styles.footer + ' modal-footer'}>
              {buttonText && buttonAction && (
                <button
                  type='button'
                  className={styles.action + ' btn btn-primary'}
                  onClick={buttonAction}
                >{buttonText}
                </button>)}
              <button
                type='button'
                className={styles.close + ' btn btn-danger'}
                data-bs-dismiss='modal'
                onClick={cancelHandle}
              >Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
