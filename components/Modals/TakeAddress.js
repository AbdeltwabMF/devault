import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'

import { TRUE, FALSE } from '../../utils/states'

import styles from './TakeAddress.module.css'

export default function InfoModal (props) {
  const [show, setShow] = useState(TRUE)
  const { header, message, buttonText, buttonAction, onClose, setToAddress, toAddress } = props

  const cancelHandler = () => {
    setShow(prevStat => FALSE)
    onClose()
  }

  const addressHandler = (e) => {
    setToAddress(prevStat => e.target.value)
    console.log('to address:', toAddress)
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
              icon={faShare}
              size='2x'
              className={styles.icon}
            />
            <span className={styles.header}>{header}</span>
            <span className={styles.message}>{message}</span>
            <form className={styles.form}>
              <label
                htmlFor='inputAddress'
                className={styles.label + ' form-label'}
              >The address you want to send to:
              </label>
              <input
                type='text'
                className={styles.input + ' form-control'}
                required
                id='inputAddress'
                onChange={addressHandler}
              />
              <div className={styles.footer + ' modal-footer'}>
                {buttonText && buttonAction && (
                  <button
                    type='submit'
                    className={styles.share + ' btn btn-primary'}
                    onClick={buttonAction}
                  >{buttonText}
                  </button>)}
                <button
                  type='button'
                  className={styles.close + ' btn btn-danger'}
                  data-bs-dismiss='modal'
                  onClick={cancelHandler}
                >Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
