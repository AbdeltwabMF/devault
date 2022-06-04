import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'

import styles from './ConnectWallet.module.css'

export default function ConnectWallet ({ handleConnection }) {
  return (
    <>
      <button
        onClick={handleConnection}
        className={styles.button}
      >
        <FontAwesomeIcon
          icon={faWallet}
          size='lg'
          fixedWidth
          className={styles.iconWallet}
        />
        <span className={styles.connect}>Connect Wallet</span>
      </button>
    </>
  )
}
