import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faArrowsRotate, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import { UNSET, TRUE, FALSE } from '../../utils/states'
import { truncateAddress, truncateBalance } from '../../utils/regexUtility'

import { Web3Context } from '../../pages/_app'
import { ConnectionContext } from '../Navigation/Navbar'

import SuccessModal from '../Modals/SuccessModal'
import InfoModal from '../Modals/InfoModal'

import styles from './ConnectedWallet.module.css'

export default function ConnectedWallet ({ account, balance }) {
  const { chainId, setChainId, setProvider, setSigner, setAccount, setContract } = useContext(Web3Context)
  const { isConnected, setIsConnected, isSwitched, setIsSwitched } = useContext(ConnectionContext)

  const hadleDisconnection = async () => {
    setIsConnected(prevState => FALSE)
    setProvider(prevState => null)
    setSigner(prevState => null)
    setAccount(prevState => null)
    setContract(prevState => null)
    setIsSwitched(prevState => UNSET)
    window.sessionStorage.removeItem('is_connected')
  }

  const handleNetworkChange = async () => {
    setIsSwitched(prevState => UNSET)
    try {
      if (chainId !== 3) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{
            chainId: '0x3'
          }]
        })

        setChainId(prevState => 3)
        setIsSwitched(prevState => TRUE)
      } else {
        setIsSwitched(prevState => FALSE)
      }
      console.log('isSwitched:', isSwitched)
    } catch (error) {
      console.log('Error switching network:', error.message)
    }
  }

  return (
    <div>
      {isSwitched === TRUE
        ? (
          <SuccessModal
            header='Network switched'
            message='The network switched to the Ropsten network successfully.'
          />
          )
        : isSwitched === FALSE
          ? (
            <InfoModal
              header='Switch Network'
              message='You are currently on the Ropsten network.'
            />
            )
          : null}
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
                onClick={handleNetworkChange}
              >
                <FontAwesomeIcon
                  icon={faArrowsRotate}
                  size='lg'
                  fixedWidth
                  className={styles.arrowsRotate}
                />
                <span className={styles.switch}>
                  Switch network
                </span>
              </button>
            </li>
            <li>
              <button
                className={'dropdown-item ' + `${styles.dropdownItem}`}
                type='button'
                onClick={hadleDisconnection}
              >
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  size='lg'
                  fixedWidth
                  className={styles.arrowRightFromBracket}
                />
                <span className={styles.disconnect}>
                  Disconnect
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
