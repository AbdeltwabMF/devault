import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFan } from '@fortawesome/free-solid-svg-icons'

import { TRUE, FALSE } from '../../utils/states'

import styles from './SpinnerModal.module.css'

export default function SpinnerModal (props) {
  const [show, setShow] = useState(TRUE)
  const { header, message, buttonText, buttonAction, onClose } = props

  const cancelHandler = () => {
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
              icon={faFan}
              size='2x'
              spin
              className={styles.icon}
            />
            <span className={styles.header}>{header}</span>
            <span className={styles.message}>{message}</span>
            <div className={styles.footer + ' modal-footer'}>
              {buttonAction && buttonText && (
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
                onClick={cancelHandler}
              >Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
