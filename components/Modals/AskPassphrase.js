import { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'

import { UNSET, TRUE, FALSE } from '../../utils/states'

import { FileContext } from '../../pages/vault'
import styles from './AskPassphrase.module.css'

export default function AskPassphrase (props) {
  const [passphrase1, setPassphrase1] = useState(UNSET)
  const [passphrase2, setPassphrase2] = useState(UNSET)
  const [show, setShow] = useState(TRUE)
  const { setPassphrase } = useContext(FileContext)
  const { header, message, isEncryption, setAskingPassphrase, setIsReadyForDownloading, setIsReadyForUploading, onClose } = props

  const submitHandler = (e) => {
    e.preventDefault()

    if (passphrase1 !== passphrase2) {
      window.alert('Passphrases do not match')
    } else if (passphrase1.length < 1 || passphrase1.length > 64) {
      window.alert('Passphrase length must be between 1 and 64 characters')
    } else {
      setShow(prevStat => FALSE)
      setPassphrase(prevStat => passphrase1)
      setAskingPassphrase(prevStat => FALSE)
      if (!isEncryption) {
        setIsReadyForDownloading(prevStat => TRUE)
      } else {
        setIsReadyForUploading(prevStat => TRUE)
      }
    }
  }

  const passphrase1Handler = (e) => {
    console.log('Passphrase', e.target.value)
    setPassphrase1(prevStat => e.target.value)
    if (!isEncryption) {
      setPassphrase2(prevStat => e.target.value)
    }
  }

  const passphrase2Handler = (e) => {
    console.log('Retype passphrase', e.target.value)
    setPassphrase2(prevStat => e.target.value)
  }

  const cancelHandle = () => {
    setPassphrase1(prevStat => UNSET)
    setPassphrase2(prevStat => UNSET)
    setShow(prevStat => FALSE)
    setAskingPassphrase(prevStat => UNSET)
    onClose()
    if (!isEncryption) {
      setIsReadyForDownloading(prevStat => FALSE)
    } else {
      setIsReadyForUploading(prevStat => FALSE)
    }
  }

  return (
    <>
      <div>
        <div
          className={'modal fade ' + `${show === TRUE ? ' show' : ''}` + ' ' + `${styles.modal}`}
          id='exampleModal'
          tabIndex='-1'
          aria-labelledby='exampleModalLabel'
          style={{ display: show === TRUE ? 'block' : 'none' }}
        >
          <div className={'modal-content ' + styles.content}>
            <div className={'modal-body ' + styles.body}>
              <div className={styles.header}>
                <FontAwesomeIcon
                  icon={isEncryption ? faLock : faLockOpen}
                  size='2x'
                  className={styles.icon}
                />
                <span className={styles.header}>{header}</span>
                <span className={styles.message}>{message}</span>
              </div>
              <form className={styles.form}>
                <div className='col-md-12'>
                  <label
                    htmlFor='inputPassword1'
                    className={styles.label + ' form-label'}
                  >Passphrase
                  </label>
                  <input
                    type='password'
                    className={styles.input + ' form-control'}
                    required
                    id='inputPassword1'
                    onChange={passphrase1Handler}
                  />
                </div>
                {isEncryption
                  ? (
                    <div className='col-md-12 mt-2'>
                      <label
                        htmlFor='inputPassword2'
                        className={styles.label + ' form-label'}
                      >Retype passphrase
                      </label>
                      <input
                        type='password'
                        className={styles.input + ' form-control'}
                        required
                        id='inputPassword2'
                        onChange={passphrase2Handler}
                      />
                    </div>)
                  : <></>}
                <div className={styles.footer + ' modal-footer justify-content-center'}>
                  <button
                    type='submit'
                    className={styles.upload + ' btn btn-primary'}
                    onClick={submitHandler}
                  >{isEncryption ? 'Upload' : 'Download'}
                  </button>
                  <button
                    type='button'
                    className={styles.close + ' btn btn-danger'}
                    data-bs-dismiss='modal'
                    onClick={cancelHandle}
                  >Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
