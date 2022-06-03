import Dropdown from 'react-bootstrap/Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import { useContext } from 'react'
import { AccountContext } from '../../pages/_app'

import WrongNetwork from '../Alerts/WrongNetwork'

import { truncateAddress, truncateBalance } from '../../utils/regexUtility'
import styles from './ConnectedWallet.module.css'

export default function ConnectedWallet ({ account, balance }) {
  const { setAccount, chainId, setChainId } = useContext(AccountContext)
  return (
    <div>
      <div className={styles.container}>
        <p className={styles.balance}>{truncateBalance(balance)}
          <span className={styles.eth}>ETH</span>
        </p>
        <Dropdown>
          <Dropdown.Toggle
            variant='success'
            id='dropdown-basic'
            className={styles.dropdown}
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
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={async () => {
                setAccount(null)
                window.sessionStorage.removeItem('isMetamaskConnected')
              }}
            >Disconnect
            </Dropdown.Item>
            <Dropdown.Item
              onClick={async () => {
                if (chainId !== 3 && WrongNetwork(chainId)) {
                  setChainId(prevState => 3)
                }
              }}
            >Switch Network
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}
