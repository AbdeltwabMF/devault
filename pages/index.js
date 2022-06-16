import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

export default function Home () {
  const router = useRouter()

  return (
    <>
      <div className={styles.main}>
        <div className={'container ' + `${styles.container}`}>
          <div className={'row ' + `${styles.header}`}>
            <div className='col col-12 '>
              <h1
                className={styles.headerTitle}
              >
                <span className={styles.decentralized}>Decentralized,</span>{' '}
                <span className={styles.selfHosted}>self-hosted,</span>{' '}
                and{' '}
                <span className={styles.encrypted}>encrypted</span>{' '}
                cloud storage that respects your privacy
              </h1>
            </div>
            <div className='col col-12 '>
              <h5 className={styles.headerDetails}>
                You deserve to live a sustainable, private, self-sufficient and independent life.
                <br />
                Join us now and expel big tech companies from your life.
                <br />
                Don&apos;t let anyone take this from you.
              </h5>
            </div>
            <div className='col col-12 '>
              <button
                onClick={() => router.push('/vault')}
                className={styles.getStarted}
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
