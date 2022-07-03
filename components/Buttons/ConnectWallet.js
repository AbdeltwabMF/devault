import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'

import { TRUE, FALSE } from '../../utils/states'
import isMetamaskError from '../../utils/isMetamaskError'

import { Web3Context } from '../../pages/_app'
import { ConnectionContext } from '../Navigation/Navbar'

import SpinnerModal from '../Modals/SpinnerModal'

import styles from './ConnectWallet.module.css'

export default function ConnectWallet () {
  const {
    setIsConnected,
    setIsConnecting,
    setIsMetamaskInstalled,
    setIsNetworkCorrect,
    isMetamaskInstalled
  } = useContext(ConnectionContext)
  const { Initialize, chainId } = useContext(Web3Context)

  const handleConnection = async () => {
    console.log('Handle connection...')
    setIsConnecting(prevState => TRUE)

    try {
      await Initialize()

      window.sessionStorage.setItem('is_connected', 'true')
      setIsConnecting(prevState => FALSE)
      setIsMetamaskInstalled(prevState => TRUE)
      setIsConnected(prevState => TRUE)
      console.log('Connection established')

      console.log('chainId: ', chainId)
      if (chainId === 3) {
        setIsNetworkCorrect(prevState => TRUE)
      } else {
        setIsNetworkCorrect(prevState => FALSE)
      }
    } catch (error) {
      if (isMetamaskError(error) === false) {
        setIsMetamaskInstalled(prevState => FALSE)
      }
      window.sessionStorage.removeItem('is_connected')
      console.info('Connection error:', error.message)
    } finally {
      setIsConnecting(prevState => FALSE)
    }
  }

  return (
    <>
      {isMetamaskInstalled === FALSE
        ? (
          <SpinnerModal
            header='Metamask'
            message='Please install Metamask to continue.'
            type='error'
          />
          )
        : null}
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
