import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseLock, faBars } from '@fortawesome/free-solid-svg-icons'

import ConnectWallet from '../Buttons/ConnectWallet'
import ConnectedWallet from '../Buttons/ConnectedWallet'
import ConnectingWallet from '../Buttons/ConnectingWallet'
import MetamaskNotInstalled from '../Alerts/MetamaskNotInstalled'
import CannotConnectWallet from '../Alerts/CannotConnectWallet'
import { AccountContext } from '../../pages/_app'
import WrongNetwork from '../Alerts/WrongNetwork'
import handleMetamaskErrors from '../../hooks/handleMetamaskErrors'

import styles from './NavBar.module.css'

export default function NavBar () {
  const [isConnecting, setIsConnecting] = useState(false)
  const { Initialize, account, balance, chainId, setChainId } = useContext(AccountContext)

  const router = useRouter()

  const handleConnection = async () => {
    setIsConnecting(prevState => true)
    console.log('Handle connection...')
    try {
      await Initialize()

      window.sessionStorage.setItem('isMetamaskConnected', 'true')
      console.log('Connection established')

      console.log('chainId: ', chainId)
      if (chainId !== 3 && WrongNetwork(chainId)) {
        setChainId(prevState => 3)
      }
    } catch (error) {
      if (handleMetamaskErrors(error)) {
        CannotConnectWallet(error.message)
      } else {
        MetamaskNotInstalled()
      }
      console.info('Connection error:', error.message)
      window.sessionStorage.removeItem('isMetamaskConnected')
    } finally {
      setIsConnecting(prevState => false)
    }
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <Navbar collapseOnSelect expand='lg' bg='transparent' variant='light'>
            <Navbar.Brand as={Link} href='/'>
              <a className={'navbar-brand ' + styles.brand}>
                <FontAwesomeIcon icon={faHouseLock} size='xl' fixedWidth className={styles.brandIcon} />
                <span className={styles.brandText}>Decentralized eVault</span>
              </a>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' className={styles.navbarToggler}>
              <FontAwesomeIcon icon={faBars} size='lg' fixedWidth className={styles.navbarTogglerIcon} />
            </Navbar.Toggle>
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='me-auto'>
                <Nav.Link as={Link} href='/vault'>
                  <a
                    className={'nav-link ' + (router.pathname === '/vault' ? ' active' : '') + ' ' + styles.link}
                  >My Vault
                  </a>
                </Nav.Link>
                <Nav.Link as={Link} href='/docs'>
                  <a
                    className={'nav-link ' + (router.pathname === '/docs' ? ' active' : '') + ' ' + styles.link}
                  >Docs
                  </a>
                </Nav.Link>
                <Nav.Link as={Link} href='/how-it-works'>
                  <a
                    className={'nav-link ' + (router.pathname === '/how-it-works' ? ' active' : '') + ' ' + styles.link}
                  >How it works
                  </a>
                </Nav.Link>
                <Nav.Link as={Link} href='/resources'>
                  <a
                    className={'nav-link ' + (router.pathname === '/resources' ? ' active' : '') + ' ' + styles.link}
                  >Resources
                  </a>
                </Nav.Link>
              </Nav>
              <Nav>
                <Navbar.Text>
                  {
              isConnecting
                ? <ConnectingWallet />
                : account > 0
                  ? <ConnectedWallet account={account} balance={balance} />
                  : <ConnectWallet handleConnection={handleConnection} />
              }
                </Navbar.Text>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    </>
  )
}
