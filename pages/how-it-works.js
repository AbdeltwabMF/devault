import styles from '../styles/HowItWorks.module.css'
import Image from 'next/image'

export default function HowItWorks () {
  return (
    <>
      <div className={styles.main}>
        <Image src='/favicon.svg' alt='Decentralized Vault' width={128} height={128} />
      </div>
    </>
  )
}
