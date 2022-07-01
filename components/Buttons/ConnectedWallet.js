import { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import { UNSET, TRUE, FALSE } from '../../utils/states'
import { truncateAddress, truncateBalance } from '../../utils/regexUtility'

import { Web3Context } from '../../pages/_app'
import { ConnectionContext } from '../Navigation/Navbar'

import styles from './ConnectedWallet.module.css'

export default function ConnectedWallet ({ account, balance }) {
  const [isSwitched, setIsSwitched] = useState(UNSET)
  const { chainId, setChainId, setProvider, setSigner } = useContext(Web3Context)
  const { isConnected, setIsConnected, setIsConnecting } = useContext(ConnectionContext)

  const hadleDisconnection = async () => {
    setIsConnected(prevState => FALSE)
    setProvider(prevState => null)
    setSigner(prevState => null)
    window.sessionStorage.removeItem('is_connected')
  }

  const handleNetworkChange = async () => {
    setIsConnecting(prevState => TRUE)
    try {
      if (chainId !== 3) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{
            chainId: '0x3'
          }]
        })
      }
      setChainId(prevState => 3)
      setIsSwitched(prevState => TRUE)
    } catch (error) {
      console.log('Error switching network:', error.message)
    } finally {
      setIsConnecting(prevState => FALSE)
    }
  }

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
              {isConnected === TRUE ? truncateAddress(account) : ''}
            </p>
            {isConnected === TRUE
              ? (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  size='lg'
                  fixedWidth
                  beat
                  className={styles.iconCheck}
                />
                )
              : (
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  size='lg'
                  fixedWidth
                  beat
                  className={styles.iconXmark}
                />
                )}
          </button>
          <ul className={'dropdown-menu ' + `${styles.dropdownMenu}`} aria-labelledby='addressOptions'>
            <li>
              <button
                className={'dropdown-item ' + `${styles.dropdownItem}`}
                type='button'
                onClick={hadleDisconnection}
              >
                Disconnect
              </button>
            </li>
            <li>
              <button
                className={'dropdown-item ' + `${styles.dropdownItem}`}
                type='button'
                onClick={handleNetworkChange}
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
