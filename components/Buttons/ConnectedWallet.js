import { useState, useContext, createContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import { UNSET, TRUE, FALSE } from '../../utils/states'
import { truncateAddress, truncateBalance } from '../../utils/regexUtility'

import { Web3Context } from '../../pages/_app'
import { ConnectionContext } from '../Navigation/Navbar'

import StatusAlert from '../Modals/StatusAlert'

import styles from './ConnectedWallet.module.css'

export default function ConnectedWallet ({ account, balance }) {
  const { chainId, setChainId, setProvider, setSigner } = useContext(Web3Context)
  const { isConnected, setIsConnected, setIsConnecting, isSwitched, setIsSwitched } = useContext(ConnectionContext)

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

        setChainId(prevState => 3)
        setIsSwitched(prevState => TRUE)
      } else {
        setIsSwitched(prevState => FALSE)
      }
    } catch (error) {
      console.log('Error switching network:', error.message)
    } finally {
      setIsConnecting(prevState => FALSE)
    }
  }

  return (
    <div>
      <div>
        {isSwitched === TRUE
          ? (
            <StatusAlert
              header='Switch Network'
              message='The network switched to the Ropsten network successfully.'
              type='success'
            />
            )
          : isSwitched === FALSE
            ? (
              <StatusAlert
                header='Switch Network'
                message='You are currently on the Ropsten network.'
                type='info'
              />
              )
            : null}
      </div>
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
