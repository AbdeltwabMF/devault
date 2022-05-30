import styles from './Error404.module.css'

export default function Error404 () {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>The server can not find the requested page.</p>
      </div>
    </>
  )
}
