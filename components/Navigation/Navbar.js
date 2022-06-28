import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseLock, faBars } from '@fortawesome/free-solid-svg-icons'

import ConnectWallet from '../Buttons/ConnectWallet'
import ConnectingWallet from '../Buttons/ConnectingWallet'
import ConnectedWallet from '../Buttons/ConnectedWallet'

import { Web3Context } from '../../pages/_app'

import styles from './Navbar.module.css'

export default function Navbar () {
  const [isConnecting, setIsConnecting] = useState(false)
  const { Initialize, account, balance } = useContext(Web3Context)

  const router = useRouter()

  const handleConnection = async () => {
    console.log('Handle connection...')
    setIsConnecting(prevState => true)

    try {
      await Initialize()

      window.sessionStorage.setItem('metamask', 'ok')
      console.log('Connection established')

      // console.log('chainId: ', chainId)
      // if (chainId !== 3 && WrongNetwork(chainId)) {
      //   setChainId(prevState => 3)
      // }
    } catch (error) {
      // if (handleMetamaskErrors(error)) {
      //   CannotConnectWallet(error.message)
      // } else {
      //   MetamaskNotInstalled()
      // }
      window.sessionStorage.removeItem('metamask')
      console.info('Connection error:', error.message)
    } finally {
      setIsConnecting(prevState => false)
    }
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <nav className='navbar navbar-expand-lg bg-transparent'>
            <div className='container-fluid'>
              <Link href='/'>
                <a className={'navbar-brand ' + styles.brand}>
                  <Image src='/logo-white.png' alt='logo' width='56px' height='56px' className='brandIcon' />
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
                  <li className='nav-item'>
                    <Link href='/vault'>
                      <a
                        aria-current='page'
                        className={'nav-link ' + (router.pathname === '/vault' ? ' active' : '') + ' ' + styles.link}
                      >The Vault
                      </a>
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link href='/docs'>
                      <a
                        aria-current='page'
                        className={'nav-link ' + (router.pathname === '/docs' ? ' active' : '') + ' ' + styles.link}
                      >Docs
                      </a>
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link href='/how-it-works'>
                      <a
                        aria-current='page'
                        className={'nav-link ' + (router.pathname === '/how-it-works' ? ' active' : '') + ' ' + styles.link}
                      >How it works
                      </a>
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link href='/resources'>
                      <a
                        aria-current='page'
                        className={'nav-link ' + (router.pathname === '/resources' ? ' active' : '') + ' ' + styles.link}
                      >Resources
                      </a>
                    </Link>
                  </li>
                </ul>
                <div>
                  {isConnecting
                    ? <ConnectingWallet />
                    : account > 0
                      ? <ConnectedWallet account={account} balance={balance} />
                      : <ConnectWallet handleConnection={handleConnection} />}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
