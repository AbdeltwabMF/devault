import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseLock, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

import ConnectWallet from '../Buttons/ConnectWallet'
import ConnectedWallet from '../Buttons/ConnectedWallet'
import ConnectingWallet from '../Buttons/ConnectingWallet'
import MetamaskNotInstalled from '../Alerts/MetamaskNotInstalled'
import { AccountContext } from '../../pages/_app'

import styles from './NavBar.module.css'

export default function NavBar () {
  const [isConnecting, setIsConnecting] = useState(false)
  const { Initialize, account, balance, provider } = useContext(AccountContext)

  const router = useRouter()

  const handleConnection = async () => {
    setIsConnecting(prevState => true)
    console.log('Handle connection...')
    try {
      await Initialize()

      window.sessionStorage.setItem('isMetamaskConnected', 'true')
      console.log('Connection established')
    } catch (error) {
      if (!provider) {
        MetamaskNotInstalled()
      }
      console.info('Connection error:', error.message)
      window.sessionStorage.removeItem('isMetamaskConnected')
    }
    setIsConnecting(prevState => false)
  }

  return (
    <>
      <div className={styles.main}>
        <Navbar collapseOnSelect expand='lg' bg='transparent' variant='light'>
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
                <NavDropdown title='Resources' id='resources' className={styles.dropdownMenu}>
                  <NavDropdown.Item as={Link} href='/resources/howitworks'>
                    <a
                      className={'dropdown-item ' + (router.pathname === '/resources/howitworks' ? ' active' : '') + ' ' + styles.dropdownLink}
                    >How it works
                    </a>
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} href='/resources/toolsandtechnologies'>
                    <a
                      className={'dropdown-item ' + (router.pathname === '/resources/toolsandtechnologies' ? ' active' : '') + ' ' + styles.dropdownLink}
                    >Tools &amp; Technologies
                    </a>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} href='/about'>
                    <a
                      className={'dropdown-item ' + (router.pathname === '/about' ? ' active' : '') + ' ' + styles.dropdownLink}
                    >About
                    </a>
                  </NavDropdown.Item>
                </NavDropdown>
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
    </>
  )
}
