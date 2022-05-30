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
    window.localStorage.setItem('Wallet', 'Connected')
    setIsConnecting(false)
    console.log('Connection established')
  }

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand
          // as={Link}
          active={router.pathname === '/' ? 'true' : 'false'}
          href='/'
          className={styles.brand}
        >Decentralized-Vault
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {account
              ? (
                <Nav.Link
                  // as={Link}
                  active={router.pathname === '/vault' ? 'true' : 'false'}
                  href='/vault' className={styles.navLink}
                >My Vault
                </Nav.Link>
                )
              : <></>}
            <Nav.Link
              // as={Link}
              active={router.pathname === '/howitworks' ? 'true' : 'false'}
              href='/howitworks'
              className={styles.navLink}
            >How it Works
            </Nav.Link>
            <NavDropdown title='Resources' id='collasible-nav-dropdown'>
              <NavDropdown.Item
                // as={Link}
                active={router.pathname === '/resources/docs' ? 'true' : 'false'}
                href='/resources/docs'
                className={styles.navLink}
              >Docs
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                // as={Link}
                active={router.pathname === '/resources/toolsandtechnologies' ? 'true' : 'false'}
                href='/resources/toolsandtechnologies'
                className={styles.navLink}
              >Tools and Technologies
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              // as={Link}
              active={router.pathname === '/about' ? 'true' : 'false'}
              href='/about'
              className={styles.navLink}
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
