import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'

import AskPassphrase from '../Modals/AskPassphrase'

import styles from './UploadForm.module.css'

export default function UploadForm ({ captureFiles, uploadFiles }) {
  const [askingPassphrase, setAskingPassphrase] = useState(null)
  const [isReadyForUploading, setIsReadyForUploading] = useState(false)

  useEffect(() => {
    if (askingPassphrase === false && isReadyForUploading) {
      setAskingPassphrase(null)
      console.log(isReadyForUploading)
      uploadFiles()
    }
  }, [askingPassphrase, isReadyForUploading])

  const getPassphrase = (e) => {
    e.preventDefault()
    setAskingPassphrase(true)
  }

  return (
    <>
      {askingPassphrase && <AskPassphrase isEncryption setAskingPassphrase={setAskingPassphrase} setIsReadyForUploading={setIsReadyForUploading} />}
      <form
        className={styles.main}
        onSubmit={getPassphrase}
      >
        <div className=''>
          <input
            className={'form-control form-control-md ' + `${styles.control}`}
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
