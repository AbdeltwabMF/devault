import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useRouter } from 'next/router'
import { useState, useContext } from 'react'

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
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand
          // as={Link}
          href='/'
          className={`${styles.brand} ${router.pathname === '/' ? 'active' : ''}`}
        >Decentralized-Vault
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {account
              ? (
                <Nav.Link
                  // as={Link}
                  href='/vault'
                  className={`${styles.navLink} ${router.pathname === '/vault' ? 'active' : ''}`}
                >My Vault
                </Nav.Link>
                )
              : <></>}
            <Nav.Link
              // as={Link}
              href='/howitworks'
              className={`${styles.navLink} ${router.pathname === '/howitworks' ? 'active' : ''}`}
            >How it Works
            </Nav.Link>
            <Nav.Link
                // as={Link}
              href='/docs'
              className={`${styles.navLink} ${router.pathname === '/docs' ? 'active' : ''}`}
            >Docs
            </Nav.Link>
            <Nav.Link
                // as={Link}
              href='/toolsandtechnologies'
              className={`${styles.navLink} ${router.pathname === '/toolsandtechnologies' ? 'active' : ''}`}
            >Tools &amp; Technologies
            </Nav.Link>
            <Nav.Link
              // as={Link}
              href='/about'
              className={`${styles.navLink} ${router.pathname === '/about' ? 'active' : ''}`}
            >About
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
  )
}
