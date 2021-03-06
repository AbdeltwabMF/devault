import styles from './HorizontalDivider.module.css'

export default function HorizontalDivider () {
  return (
    <>
      <div className={styles.main}>
        <hr className={styles.line} />
        <span className={styles.text}>
          Your data is yours
        </span>
        <hr className={styles.line} />
      </div>
    </>
  )
}
