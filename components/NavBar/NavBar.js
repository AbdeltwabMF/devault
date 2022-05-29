import Link from 'next/link'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import styles from './NavBar.module.css'
import { useState } from 'react'
import Web3 from 'web3'
import { useRouter } from 'next/router'
import ConnectWallet from '../Buttons/ConnectWallet'
import ConnectedWallet from '../Buttons/ConnectedWallet'
import ConnectingWallet from '../Buttons/ConnectingWallet'

export default function NavBar () {
  const [connected, setConnected] = useState(false)
  const [account, setAccount] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)

  const router = useRouter()

  const handleConnection = async () => {
    console.log('Handle connection...')
    setIsConnecting(true)
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
    await web3.eth.getAccounts().then(accounts => {
      setAccount(accounts[0])
      setConnected(true)
    })
    setIsConnecting(false)
  }

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand
          // as={Link}
          active={router.pathname === '/'}
          href='/'
          className={styles.brand}
        >Decentralized-Vault
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link
              // as={Link}
              active={router.pathname === '/vault'}
              href='/vault' className={styles.navLink}
            >My Vault
            </Nav.Link>
            <Nav.Link
              // as={Link}
              active={router.pathname === '/howitworks'}
              href='/howitworks'
              className={styles.navLink}
            >How it Works
            </Nav.Link>
            <NavDropdown title='Resources' id='collasible-nav-dropdown'>
              <NavDropdown.Item
                // as={Link}
                active={router.pathname === '/resources/docs'}
                href='/resources/docs'
                className={styles.navLink}
              >Docs
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                // as={Link}
                active={router.pathname === '/resources/toolsandtechnologies'}
                href='/resources/toolsandtechnologies'
                className={styles.navLink}
              >Tools and Technologies
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              // as={Link}
              active={router.pathname === '/about'}
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
                : connected
                  ? <ConnectedWallet account={account} />
                  : <ConnectWallet handleConnection={handleConnection} />
              }
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
