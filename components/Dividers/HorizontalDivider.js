import styles from './HorizontalDivider.module.css'

export default function () {
  return (
    <>
      <div className={styles.main}>
        <hr className={styles.line} />
        <span className={styles.text}>
          Your data is your own
        </span>
        <hr className={styles.line} />
      </div>
    </>
  )
}
