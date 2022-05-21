import Link from 'next/link'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import styles from './NavBar.module.css'
import { useState } from 'react'
import Web3 from 'web3'

export default function NavBar () {
  const [account, setAccount] = useState('Disconnected')

  try {
    // https://ethereum.stackexchange.com/questions/43498/how-to-import-web3-into-a-react-project
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
    // https://dev.to/ramonak/javascript-how-to-access-the-return-value-of-a-promise-object-1bck
    const getAccount = async () => {
      const accounts = await web3.eth.getAccounts()
      console.log('getAccount: ', accounts[0])
      setAccount(accounts[0])
    }
    getAccount()
  } catch (error) {
    console.log('Connection Error: ', error)
  }

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='/' className={styles.brand}>Decentralized-Vault</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/vault' className={styles.navLink}>My Vault</Nav.Link>
            <Nav.Link href='/howitworks' className={styles.navLink}>How it Works</Nav.Link>
            <NavDropdown title='Resources' id='collasible-nav-dropdown'>
              <NavDropdown.Item href='/resources/docs' className={styles.navLink}>Docs</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='/resources/toolsandtechnologies' className={styles.navLink}>Tools and Technologies</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href='/about' className={styles.navLink}>About</Nav.Link>
          </Nav>
          <Nav>
            <Navbar.Text>
              {account === 'Disconnected' ? 'Disconnected' : 'Connected to: '} <Link href={`https://etherscan.io/address/${account}`}><a>{account === 'Disconnected' ? '' : account}</a></Link>
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
