import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import styles from './NavBar.module.css'

export default function NavBar () {
  const router = useRouter()
  console.log(router)

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='#home'>Decentralized-Vault</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='#myvault'>My Vault</Nav.Link>
            <Nav.Link href='#howitworks'>How it Works</Nav.Link>
            <NavDropdown title='Resources' id='collasible-nav-dropdown'>
              <NavDropdown.Item href='#resources/docs'>Docs</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#resources/toolsandtech'>Tools and Technologies</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href='#About'>About</Nav.Link>
          </Nav>
          <Nav>
            <Navbar.Text>
              Signed in as: <Link href='#https://etherscan.io/address/'><a>Address</a></Link>
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
