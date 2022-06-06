import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import { useContext } from 'react'
import { Web3Context } from '../../pages/_app'

// import WrongNetwork from '../Alerts/WrongNetwork'

import { truncateAddress, truncateBalance } from '../../utils/regexUtility'
import styles from './ConnectedWallet.module.css'

export default function ConnectedWallet ({ account, balance }) {
  const { setAccount, chainId, setChainId } = useContext(Web3Context)
  return (
    <div>
      <div className={styles.container}>
        <p className={styles.balance}>{truncateBalance(balance)}
          <span className={styles.eth}>ETH</span>
        </p>
        <div className='dropdown'>
          <button
            className={'dropdown-toggle ' + `${styles.dropdown}`}
            type='button'
            id='addressOptions'
            data-bs-toggle='dropdown'
            aria-expanded='false'
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
          </button>
          <ul className={'dropdown-menu ' + `${styles.dropdownMenu}`} aria-labelledby='addressOptions'>
            <li>
              <button
                className={'dropdown-item ' + `${styles.dropdownItem}`}
                type='button'
                onClick={async () => {
                  setAccount(null)
                  window.sessionStorage.removeItem('isMetamaskConnected')
                }}
              >
                Disconnect
              </button>
            </li>
            <li>
              <button
                className={'dropdown-item ' + `${styles.dropdownItem}`}
                type='button'
                // onClick={async () => {
                //   if (chainId !== 3 && WrongNetwork(chainId)) {
                //     setChainId(prevState => 3)
                //   }
                // }}
              >
                Switch network
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
