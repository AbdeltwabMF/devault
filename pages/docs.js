import Image from 'next/image'
import styles from '../styles/Docs.module.css'

export default function Docs () {
  return (
    <>
      <div className={styles.main}>
        <Image
          src='/devault-fetrah-1024.jpg'
          alt='fetrah'
          width='460rem'
          height='460rem'
        />
      </div>
    </>
  )
}
