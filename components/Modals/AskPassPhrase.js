import { useState, useContext } from 'react'

import { FileContext } from '../../pages/vault'
import styles from './AskPassPhrase.module.css'

export default function AskPassPhrase ({ isEncryption }) {
  const [passphrase1, setPassphrase1] = useState('')
  const [passphrase2, setPassphrase2] = useState('')
  const [show, setShow] = useState(true)
  const { setPassphrase } = useContext(FileContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (passphrase1 !== passphrase2) {
      window.alert('Passphrases do not match')
    } else {
      setShow(false)
      setPassphrase(prevStat => passphrase1)
    }
  }

  const handlePassphrase1 = (e) => {
    console.log('Passphrase', e.target.value)
    setPassphrase1(prevStat => e.target.value)
  }

  const handlePassphrase2 = (e) => {
    console.log('Passphrase confirm', e.target.value)
    setPassphrase2(prevStat => e.target.value)
  }

  const handleCancel = () => {
    setPassphrase1('')
    setPassphrase2('')
    setShow(prevStat => false)
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
              <div className='modal-body'>
                <p className={styles.header}>
                  {isEncryption ? 'Enter your passphrase to encrypt' : 'Enter your passphrase to decrypt'}
                </p>
                <form>
                  <div className='col-md-12 mb-3 '>
                    <label htmlFor='inputPassword1' className='form-label'>Passphrase</label>
                    <input
                      type='password'
                      className='form-control'
                      required
                      id='inputPassword1'
                      onChange={handlePassphrase1}
                    />
                  </div>
                  {isEncryption
                    ? (
                      <div className='col-md-12'>
                        <label htmlFor='inputPassword2' className='form-label'>Confirm passphrase</label>
                        <input
                          type='password'
                          className='form-control'
                          required
                          id='inputPassword2'
                          onChange={handlePassphrase2}
                        />
                      </div>)
                    : <></>}
                  <div className='modal-footer justify-content-center'>
                    <button
                      type='button'
                      className='btn btn-danger'
                      data-bs-dismiss='modal'
                      onClick={handleCancel}
                    >Close
                    </button>
                    <button
                      type='submit'
                      className='btn btn-primary'
                      onClick={handleSubmit}
                    >{isEncryption ? 'Upload' : 'Download'}
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
