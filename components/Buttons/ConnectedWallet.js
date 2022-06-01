import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import { truncateAddress, truncateBalance } from '../../utils/regexUtility'
import styles from './ConnectedWallet.module.css'

export default function ConnectedWallet ({ account, balance }) {
  return (
    <div>
      <div className={styles.container}>
        <p className={styles.balance}>{truncateBalance(balance)}
          <span className={styles.eth}>ETH</span>
        </p>
        <Button
          variant='outline-primary'
          className={styles.button}
        >
          <p className={styles.address}>
            {(account === undefined)
              ? 'No Account'
              : truncateAddress(account)}
          </p>
          {(account === undefined)
            ? (
              <FontAwesomeIcon
                icon={faCircleXmark}
                size='lg'
                fixedWidth
                beat
                className={styles.iconXmark}
              />
              )
            : (
              <FontAwesomeIcon
                icon={faCircleCheck}
                size='lg'
                fixedWidth
                beat
                className={styles.iconCheck}
              />
              )}
        </Button>{' '}
      </div>
    </div>
  )
}
