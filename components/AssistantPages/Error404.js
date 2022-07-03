import styles from './Error404.module.css'
import { useRouter } from 'next/router'

export default function Error404 () {
  const router = useRouter()
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>The server can not find the requested page.</p>
        <button className={styles.button + ' btn btn-primary'} onClick={() => router.push('/')}>
          Go back home
        </button>
      </div>
    </>
  )
}
