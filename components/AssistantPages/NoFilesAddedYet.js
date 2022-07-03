import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpFromBracket, faFolderOpen } from '@fortawesome/free-solid-svg-icons'

import styles from './NoFilesAddedYet.module.css'

export default function NoFile () {
  return (
    <>
      <div className={styles.main}>
        <FontAwesomeIcon
          icon={faFolderOpen}
          size='4x'
          className={styles.icon}
        />
        <h1 className={styles.header}>Empty Vault</h1>
        <div className={styles.messageContainer}>
          <span
            className={styles.descriptionText}
          >No files added yet. To add files, choose a file and click the
          </span>
          <FontAwesomeIcon
            icon={faArrowUpFromBracket}
            className={styles.arrow}
          />
          <span
            className={styles.descriptionText}
          >icon button in the top.
          </span>
        </div>
      </div>
    </>
  )
}
