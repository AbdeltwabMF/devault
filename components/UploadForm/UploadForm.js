import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'

import { UNSET, TRUE, FALSE } from '../../utils/states'

import AskPassphrase from '../Modals/AskPassphrase'

import styles from './UploadForm.module.css'

export default function UploadForm ({ captureFiles, uploadFiles }) {
  const [askingPassphrase, setAskingPassphrase] = useState(UNSET)
  const [isReadyForUploading, setIsReadyForUploading] = useState(UNSET)

  useEffect(() => {
    if (askingPassphrase === FALSE && isReadyForUploading === TRUE) {
      setAskingPassphrase(prevStat => UNSET)
      console.log(isReadyForUploading)
      uploadFiles()
    }
  }, [askingPassphrase, isReadyForUploading, uploadFiles])

  const getPassphrase = (e) => {
    e.preventDefault()
    setAskingPassphrase(prevStat => TRUE)
  }

  return (
    <>
      {askingPassphrase === TRUE && <AskPassphrase
        isEncryption
        setAskingPassphrase={setAskingPassphrase}
        setIsReadyForUploading={setIsReadyForUploading}
        header='Encrypt file'
        message='Enter your passphrase to encrypt your files'
                                    />}
      <form
        className={styles.main}
        onSubmit={getPassphrase}
      >
        <div className=''>
          <input
            className={'form-control form-control-md ' + styles.control}
            id='fileCapturer'
            type='file'
            required
            onChange={captureFiles}
          />
        </div>
        <button
          type='submit'
          className={styles.button}
        >
          <FontAwesomeIcon
            icon={faArrowUpFromBracket}
            size='lg'
            fixedWidth
            className={styles.icon}
          />
          <span className={styles.upload}>Upload</span>
        </button>
      </form>
    </>
  )
}
