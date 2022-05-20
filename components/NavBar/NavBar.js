import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

export default function NavBar () {
  const router = useRouter()
  console.log(router)

  return (
    <Navbar>
      <Container>
        <Navbar.Brand href='#home'>Navbar with text</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
            Signed in as: <a href='#login'>Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
