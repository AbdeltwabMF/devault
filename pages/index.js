import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Home () {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Devault | The decentralized and encrypted cloud</title>
      </Head>
      <div className={styles.main}>
        <div className={'container ' + `${styles.container}`}>
          <div className={'row ' + `${styles.header}`}>
            <div className='col col-12 '>
              <h1 className={styles.headerTitle}>
                Devault is a {' '}
                <span className={styles.decentralized}>decentralized,</span>{' '}
                <span className={styles.selfHosted}>self-hosted,</span>{' '}
                and{' '}
                <span className={styles.encrypted}>end-to-end encrypted</span>{' '}
                cloud storage that respects your privacy
              </h1>
            </div>
            <div className='col col-12 '>
              <h5 className={styles.headerDetails}>
                You deserve to live a sustainable, private, self-sufficient, and independent life.
                <br />
                Devault is making that happen where there is no spying, no surveillance, no backdoors, and ads.
                <br />
                The future is making a comeback.
              </h5>
            </div>
            <div className='col col-12 '>
              <button
                onClick={() => router.push('/vault')}
                className={styles.buttonGetStarted}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
