import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpFromBracket, faFolderOpen } from '@fortawesome/free-solid-svg-icons'

import styles from './NoFilesAddedYet.module.css'

export default function NoFile () {
  return (
    <>
      <div className={styles.main}>
        <FontAwesomeIcon
          icon={faFolderOpen}
          size='6x'
          className={styles.mainHeaderIcon}
        />
        <h1 className={styles.mainHeader}>Empty Vault</h1>
        <p className={styles.description}>
          <span className={styles.descriptionText}>No files added yet. To add files, choose a file and click the </span>
          <FontAwesomeIcon icon={faArrowUpFromBracket} className={styles.arrow} />
          <span className={styles.descriptionText}>icon button in the top.</span>
        </p>
      </div>
    </>
  )
}
