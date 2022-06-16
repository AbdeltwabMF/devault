import { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'

import { FileContext } from '../../pages/vault'
import styles from './AskPassphrase.module.css'

export default function AskPassphrase ({ isEncryption, setAskingPassphrase, setIsReadyForDownloading, setIsReadyForUploading }) {
  const [passphrase1, setPassphrase1] = useState('')
  const [passphrase2, setPassphrase2] = useState('')
  const [show, setShow] = useState(true)
  const { setPassphrase } = useContext(FileContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (passphrase1 !== passphrase2) {
      window.alert('Passphrases do not match')
    } else if (passphrase1.length < 1 || passphrase1.length > 64) {
      window.alert('Passphrase length must be between 1 and 64 characters')
    } else {
      setShow(prevStat => false)
      setPassphrase(prevStat => passphrase1)
      setAskingPassphrase(prevStat => false)
      if (!isEncryption) {
        setIsReadyForDownloading(prevStat => true)
      } else {
        setIsReadyForUploading(prevStat => true)
      }
    }
  }

  const handlePassphrase1 = (e) => {
    console.log('Passphrase', e.target.value)
    setPassphrase1(prevStat => e.target.value)
    if (!isEncryption) {
      setPassphrase2(prevStat => e.target.value)
    }
  }

  const handlePassphrase2 = (e) => {
    console.log('Retype passphrase', e.target.value)
    setPassphrase2(prevStat => e.target.value)
  }

  const handleCancel = () => {
    setPassphrase1(prevStat => '')
    setPassphrase2(prevStat => '')
    setShow(prevStat => false)
    setAskingPassphrase(prevStat => null)
    if (!isEncryption) {
      setIsReadyForDownloading(prevStat => false)
    } else {
      setIsReadyForUploading(prevStat => false)
    }
  }

  return (
    <>
      <div>
        <div
          className={'modal fade ' + `${show ? ' show' : ''}` + ' ' + `${styles.modal}`}
          id='exampleModal'
          tabIndex='-1'
          aria-labelledby='exampleModalLabel'
          style={{ display: show ? 'block' : 'none' }}
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className={styles.body + ' modal-body'}>
                <div className={styles.header}>
                  <FontAwesomeIcon icon={isEncryption ? faLock : faLockOpen} size='3x' className={styles.lockIcon} beat />
                  <p>
                    {isEncryption ? 'Enter a passphrase to encrypt your file' : 'Enter your passphrase to decrypt the file'}
                  </p>
                </div>
                <form>
                  <div className='col-md-12 mb-3 '>
                    <label htmlFor='inputPassword1' className='form-label'>Passphrase</label>
                    <input
                      type='password'
                      className={styles.input + ' form-control'}
                      required
                      id='inputPassword1'
                      onChange={handlePassphrase1}
                    />
                  </div>
                  {isEncryption
                    ? (
                      <div className='col-md-12'>
                        <label htmlFor='inputPassword2' className='form-label'>Retype passphrase</label>
                        <input
                          type='password'
                          className={styles.input + ' form-control'}
                          required
                          id='inputPassword2'
                          onChange={handlePassphrase2}
                        />
                      </div>)
                    : <></>}
                  <div className={styles.footer + ' modal-footer justify-content-center'}>
                    <button
                      type='submit'
                      className={styles.upload + ' btn btn-primary'}
                      onClick={handleSubmit}
                    >{isEncryption ? 'Upload' : 'Download'}
                    </button>
                    <button
                      type='button'
                      className={styles.close + ' btn btn-danger'}
                      data-bs-dismiss='modal'
                      onClick={handleCancel}
                    >Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
