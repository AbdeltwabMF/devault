import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Button from 'react-bootstrap/Button'

import styles from '../styles/Home.module.css'

const MySwal = withReactContent(Swal)

export default function Home () {
  const handleClick = () => {
    MySwal.fire(
      'The Internet?',
      'That thing is still around?',
      'question'
    )
  }

  return (
    <>
      <div className={styles.main}>
        <Button onClick={handleClick}>s</Button>
      </div>
    </>
  )
}
