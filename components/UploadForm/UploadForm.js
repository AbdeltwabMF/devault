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
        onClose={() => setAskingPassphrase(prevStat => UNSET)}
                                    />}
      <form
        className={styles.main}
        onSubmit={getPassphrase}
      >
        <div className={styles.controlContainer}>
          <label className={styles.label}>
            <input
              className={'' + styles.control}
              id='fileCapturer'
              type='file'
              onChange={captureFiles}
              required
              multiple
            />
            <FontAwesomeIcon
              icon={faArrowUpFromBracket}
              size='lg'
              fixedWidth
              className={styles.arrowUpFromBracket}
            />
            <span className={styles.uploadText}>Upload</span>
          </label>
        </div>
        <input className={styles.reset} type='reset' id='resetForm' />
        <button
          type='submit'
          id='fileSelect'
          className={styles.button}
        />
      </form>
    </>
  )
}
