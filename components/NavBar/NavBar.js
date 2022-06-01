import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseLock } from '@fortawesome/free-solid-svg-icons'

import ConnectWallet from '../Buttons/ConnectWallet'
import ConnectedWallet from '../Buttons/ConnectedWallet'
import ConnectingWallet from '../Buttons/ConnectingWallet'
import { AccountContext } from '../../pages/_app'

import styles from './NavBar.module.css'

export default function NavBar () {
  const [isConnecting, setIsConnecting] = useState(false)
  const { Initialize, account, balance } = useContext(AccountContext)

  const router = useRouter()

  const handleConnection = async () => {
    setIsConnecting(prevState => true)
    console.log('Handle connection to metamask...')
    try {
      await Initialize()

      window.sessionStorage.setItem('isMetamaskConnected', 'true')
      console.log('Connection established')
    } catch (error) {
      console.info('Connection error:', error.message)
      window.sessionStorage.removeItem('isMetamaskConnected')
    }
    setIsConnecting(prevState => false)
  }

  return (
    <div className={styles.main}>
      <Navbar collapseOnSelect expand='xl' bg='transparent' variant='light'>
        <Container>
          <Navbar.Brand as={Link} href='/'>
            <a className={'navbar-brand ' + styles.brand}>
              <FontAwesomeIcon icon={faHouseLock} size='xl' fixedWidth className={styles.brandIcon} />
              <span className={styles.brandText}>Decentralized eVault</span>
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              {account
                ? (
                  <Nav.Link as={Link} href='/vault'>
                    <a
                      className={'nav-link ' + (router.pathname === '/vault' ? ' active' : '') + ' ' + styles.link}
                    >My Vault
                    </a>
                  </Nav.Link>
                  )
                : <></>}
              <Nav.Link as={Link} href='/howitworks'>
                <a
                  className={'nav-link ' + (router.pathname === '/howitworks' ? ' active' : '') + ' ' + styles.link}
                >How it Works
                </a>
              </Nav.Link>
              <Nav.Link as={Link} href='/docs'>
                <a
                  className={'nav-link ' + (router.pathname === '/docs' ? ' active' : '') + ' ' + styles.link}
                >Docs
                </a>
              </Nav.Link>
              <Nav.Link as={Link} href='/toolsandtechnologies'>
                <a
                  className={'nav-link ' + (router.pathname === '/toolsandtechnologies' ? ' active' : '') + ' ' + styles.link}
                >Tools &amp; Technologies
                </a>
              </Nav.Link>
              <Nav.Link as={Link} href='/about'>
                <a
                  className={'nav-link ' + (router.pathname === '/about' ? ' active' : '') + ' ' + styles.link}
                >About
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
        </Container>
      </Navbar>
    </div>
  )
}
