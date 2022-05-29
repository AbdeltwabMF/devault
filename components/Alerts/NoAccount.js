import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default function NoAccount () {
  const [show, setShow] = useState(true)
  const handleClose = () => setShow(false)

  return (
    <>
      <Modal show onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>No Account Detected!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Please, make sure you have an account and connected to localhost network.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
