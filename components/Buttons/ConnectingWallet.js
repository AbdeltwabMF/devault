import Button from 'react-bootstrap/Button'
import styles from './ConnectingWallet.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function ConnectingWallet () {
  return (
    <>
      <Button
        variant='primary'
        disabled
        className={styles.button}
      >
        <FontAwesomeIcon
          icon={faSpinner}
          size='lg'
          fixedWidth
          spin
          className={styles.iconSpinner}
        />
        <span className={styles.load}>Connecting...</span>
      </Button>
    </>
  )
}
