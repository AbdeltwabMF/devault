import styles from './UploadForm.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons'

export default function UploadForm ({ captureFile, uploadFile }) {
  return (
    <>
      <form
        className={styles.main}
        onSubmit={uploadFile}
      >
        <div className=''>
          <input
            className={'form-control form-control-md ' + `${styles.control}`}
            id='formFileSm'
            type='file'
            onChange={captureFile}
          />
        </div>
        <button
          type='submit'
          className={styles.button}
        >
          <FontAwesomeIcon
            icon={faArrowUpFromBracket}
            size='lg'
            fixedWidth className={styles.icon}
          />
          <span className={styles.upload}>Upload</span>
        </button>
      </form>
    </>
  )
}
