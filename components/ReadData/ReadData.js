import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from './ReadData.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function ReadData ({ choosenFile }) {
  return (
    <>
      <Form className={styles.main}>
        <Form.Group controlId='formFile'>
          <Form.Control type='file' className={styles.control} required name='file' onChange={choosenFile} /* isInvalid={invalidType} */ />
        </Form.Group>
        <Button variant='primary' type='submit' className={styles.button}>Upload <FontAwesomeIcon icon={faPlus} size='xl' fixedWidth className={styles.icon} /></Button>
      </Form>
    </>
  )
}
