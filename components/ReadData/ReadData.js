import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from './ReadData.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function ReadData ({ captureFile, uploadFile }) {
  return (
    <>
      <Form className={styles.main} onSubmit={uploadFile}>
        <Form.Group controlId='formFile'>
          <Form.Control type='file' className={styles.control} required name='file' onChange={captureFile} /* isInvalid={invalidType} */ />
        </Form.Group>
        <Button variant='primary' type='submit' className={styles.button}>Upload <FontAwesomeIcon icon={faPlus} size='xl' fixedWidth className={styles.icon} /></Button>
      </Form>
    </>
  )
}
