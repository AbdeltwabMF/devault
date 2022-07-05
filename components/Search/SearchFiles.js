import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import styles from './SearchFiles.module.css'

export default function SearchFiles () {
  return (
    <>
      <div className={styles.main}>
        <form className={styles.form}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size='lg'
            fixedWidth
            className={styles.magnifyingGlass}
          />
          <input
            className={styles.input}
            id='searchFiles'
            type='text'
            placeholder='Search files...'
          />
        </form>
      </div>
    </>
  )
}
