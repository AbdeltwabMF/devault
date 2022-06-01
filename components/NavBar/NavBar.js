import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'
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
          as={Link}
          href='/'
          className={`${styles.brand} ${router.pathname === '/' ? 'active' : ''}`}
        ><a className='navbar-brand'>Decentralized-Vaults</a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {account
              ? (
                <Nav.Link
                  as={Link}
                  href='/vault'
                  className={`${styles.navLink} ${router.pathname === '/vault' ? 'active' : ''}`}
                ><a className='nav-link'>My Vault</a>
                </Nav.Link>
                )
              : <></>}
            <Nav.Link
              as={Link}
              href='/howitworks'
              className={`${styles.navLink} ${router.pathname === '/howitworks' ? 'active' : ''}`}
            ><a className='nav-link'>How it Works</a>
            </Nav.Link>
            <Nav.Link
              as={Link}
              href='/docs'
              className={`${styles.navLink} ${router.pathname === '/docs' ? 'active' : ''}`}
            ><a className='nav-link'>Docs</a>
            </Nav.Link>
            <Nav.Link
              as={Link}
              href='/toolsandtechnologies'
              className={`${styles.navLink} ${router.pathname === '/toolsandtechnologies' ? 'active' : ''}`}
            ><a className='nav-link'>Tools &amp; Technologies</a>
            </Nav.Link>
            <Nav.Link
              as={Link}
              href='/about'
              className={`${styles.navLink} ${router.pathname === '/about' ? 'active' : ''}`}
            ><a className='nav-link'>About</a>
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
