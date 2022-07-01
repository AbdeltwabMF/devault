import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import { UNSET, TRUE, FALSE } from '../../utils/states'

import styles from '../StatusAlert.module.css'

export default function StatusAlert ({ header, message, type, onClose }) {
  const [isOpen, setIsOpen] = useState(TRUE)

  const handleClose = () => {
    setIsOpen(prevState => FALSE)
    onClose()
  }

  return (
    <div className={styles.container}>
      <div className={styles.alert}>
        <div className={styles.header}>
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            size='lg'
            fixedWidth
            className={styles.icon}
          />
          <p className={styles.title}>{header}</p>
        </div>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={handleClose}
          >
            <FontAwesomeIcon
              icon={faTimes}
              size='lg'
              fixedWidth
              className={styles.icon}
            />
            <span className={styles.cancel}>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  )
}
