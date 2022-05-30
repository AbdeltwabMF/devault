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
  const { getSigner, getContract, account, balance } = useContext(AccountContext)

  const router = useRouter()

  const handleConnection = async () => {
    console.log('Handle connection...')
    setIsConnecting(true)
    await getSigner()
    await getContract()

    const unixTime = Math.round(new Date().getTime() / 1000)
    window.localStorage.setItem('Wallet', 'Connected')
    window.localStorage.setItem('Created', unixTime)
    window.localStorage.setItem('Expired', unixTime + (60 * 60 * 24))

    setIsConnecting(false)
    console.log('Connection established')
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
            <NavDropdown title='Resources' id='collasible-nav-dropdown'>
              <NavDropdown.Item
                // as={Link}
                href='/resources/docs'
                className={`${styles.navLink} ${router.pathname === '/resources/docs' ? 'active' : ''}`}
              >Docs
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                // as={Link}
                href='/resources/toolsandtechnologies'
                className={`${styles.navLink} ${router.pathname === '/resources/toolsandtechnologies' ? 'active' : ''}`}
              >Tools and Technologies
              </NavDropdown.Item>
            </NavDropdown>
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
