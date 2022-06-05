import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons'

import styles from './TransactionStatus.module.css'

export default function TransactionStatus ({ isSucceed }) {
  const [show, setShow] = useState(true)

  setTimeout(() => {
    setShow(false)
  }, 5000)

  return (
    <>
      <div
        className={'modal fade ' + `${show ? ' show' : ''}` + ' ' + `${styles.modal}`}
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        style={{ display: show ? 'block' : 'none' }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-body'>
              <FontAwesomeIcon
                icon={isSucceed ? faCheck : faXmark}
                size='2x'
                fixedWidth
                beat
                className={`${styles.icon} ${isSucceed ? styles.success : styles.fail}`}
              />
              {
              isSucceed === true
                ? <h3 className={styles.title}>Transaction made successfully! </h3>
                : <h3 className={styles.title}>Cannot make a transaction!</h3>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
