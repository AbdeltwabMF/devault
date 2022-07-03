import styles from './Error404.module.css'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkSlash } from '@fortawesome/free-solid-svg-icons'

export default function Error404 () {
  const router = useRouter()

  return (
    <>
      <div className={styles.container}>
        <FontAwesomeIcon
          icon={faLinkSlash}
          size='4x'
          className={styles.icon}
        />
        <h1 className={styles.header}>404</h1>
        <p className={styles.message}>The server can not find the requested page.</p>
        <button className={styles.button + ' btn btn-primary'} onClick={() => router.push('/')}>
          Go back home
        </button>
      </div>
    </>
  )
}
