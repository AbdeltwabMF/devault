import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

import { TRUE, FALSE } from '../../utils/states'

import styles from './SuccessModal.module.css'

export default function SuccessModal ({ header, message, buttonText, buttonAction }) {
  const [show, setShow] = useState(TRUE)

  const handleCancel = () => {
    setShow(prevStat => FALSE)
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
              icon={faCircleCheck}
              size='5x'
              className={styles.icon}
            />
            <h2 className={styles.header}>{header}</h2>
            <p className={styles.message}>{message}</p>
            <div className={styles.footer + ' modal-footer'}>
              <button
                type='button'
                className={styles.action + ' btn btn-primary'}
                onClick={buttonAction}
              >{buttonText}
              </button>
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
    </>
  )
}
