import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useContext, createContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { Web3Context } from '../../pages/_app'

import { UNSET, TRUE } from '../../utils/states'

import ConnectWallet from '../Buttons/ConnectWallet'
import ConnectingWallet from '../Buttons/ConnectingWallet'
import ConnectedWallet from '../Buttons/ConnectedWallet'

import styles from './Navbar.module.css'

export const ConnectionContext = createContext()

export default function Navbar () {
  const [isConnecting, setIsConnecting] = useState(UNSET)
  const [isConnected, setIsConnected] = useState(UNSET)
  const [isSwitched, setIsSwitched] = useState(UNSET)
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(UNSET)
  const [isNetworkCorrect, setIsNetworkCorrect] = useState(UNSET)
  const { account, balance } = useContext(Web3Context)

  const value = {
    isConnecting,
    setIsConnecting,
    isConnected,
    setIsConnected,
    isSwitched,
    setIsSwitched,
    isMetamaskInstalled,
    setIsMetamaskInstalled,
    isNetworkCorrect,
    setIsNetworkCorrect
  }

  useEffect(() => {
    const __checkConnection = async () => {
      if (window.sessionStorage.getItem('is_connected') === 'true' && account) {
        setIsConnected(prevState => TRUE)
      }
    }
    __checkConnection()
  }, [account])

  const router = useRouter()

  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <nav className='navbar navbar-expand-lg bg-transparent'>
            <div className='container-fluid'>
              <Link href='/'>
                <a className={'navbar-brand ' + styles.brand}>
                  <Image src='/devault-512.png' alt='logo' width='56px' height='56px' className='brandIcon' />
                  <span className={styles.brandText}>Devault</span>
                </a>
              </Link>

              <button
                className={'navbar-toggler ' + `${styles.navbarToggler}`}
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#navbarNavDropdown'
                aria-controls='navbarNavDropdown'
                aria-expanded='false'
                aria-label='Toggle navigation'
              >
                <FontAwesomeIcon icon={faBars} size='lg' fixedWidth className={styles.navbarTogglerIcon} />
              </button>

              <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                  <li className={'nav-item ' + styles.navItem}>
                    <Link href='/vault'>
                      <a
                        aria-current='page'
                        className={'nav-link ' + (router.pathname === '/vault' ? styles.active : '') + ' ' + styles.link}
                      >The Vault
                      </a>
                    </Link>
                  </li>
                  <li className={'nav-item ' + styles.navItem}>
                    <Link href='/docs'>
                      <a
                        aria-current='page'
                        className={'nav-link ' + (router.pathname === '/docs' ? styles.active : '') + ' ' + styles.link}
                      >Docs
                      </a>
                    </Link>
                  </li>
                  <li className={'nav-item ' + styles.navItem}>
                    <Link href='/how'>
                      <a
                        aria-current='page'
                        className={'nav-link ' + (router.pathname === '/how' ? styles.active : '') + ' ' + styles.link}
                      >How it works
                      </a>
                    </Link>
                  </li>
                  <li className={'nav-item ' + styles.navItem}>
                    <Link href='/resources'>
                      <a
                        aria-current='page'
                        className={'nav-link ' + (router.pathname === '/resources' ? styles.active : '') + ' ' + styles.link}
                      >Resources
                      </a>
                    </Link>
                  </li>
                </ul>
                <div>
                  {isConnecting === TRUE
                    ? (<ConnectingWallet />)
                    : (isConnected === TRUE
                        ? (
                          <ConnectionContext.Provider value={value}>
                            <ConnectedWallet account={account} balance={balance} />
                          </ConnectionContext.Provider>
                          )
                        : (
                          <ConnectionContext.Provider value={value}>
                            <ConnectWallet />
                          </ConnectionContext.Provider>
                          ))}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
