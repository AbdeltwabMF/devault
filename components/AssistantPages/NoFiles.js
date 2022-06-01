import styles from './NoFiles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faFaceGrinBeam } from '@fortawesome/free-solid-svg-icons'

export default function NoFile () {
  return (
    <>
      <div className={styles.main}>
        <FontAwesomeIcon icon={faFaceGrinBeam} size='5x' className={styles.mainHeaderIcon} />
        <h1 className={styles.mainHeader}>Empty eVault</h1>
        <h4 className={styles.assistantHeader}>No Files added yet</h4>
        <p className={styles.description}>
          <span className={styles.descriptionText}>You have no files in your vault. To add files, click the Upload</span>
          <FontAwesomeIcon icon={faPlusCircle} className={styles.plusIcon} />
          <span className={styles.descriptionText}>button in the top.</span>
        </p>
      </div>
    </>
  )
}
