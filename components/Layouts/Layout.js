import Head from 'next/head'

import Footer from '../Footer/Footer'
import NavBar from '../NavBar/NavBar'

import styles from './Layout.module.css'

export default function Layout ({ children }) {
  return (
    <>
      <Head>
        <title>Decentralized Vault</title>

        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />

        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div>
        <header>
          <NavBar />
        </header>

        <main className={styles.main}>
          {children}
        </main>

        <Footer />
      </div>
    </>
  )
}
