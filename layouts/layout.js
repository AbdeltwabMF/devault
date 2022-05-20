import Head from 'next/head'

import Footer from '../components/Footer/Footer'
import NavBar from '../components/NavBar/NavBar'

export default function mainLayout ({ children }) {
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

        <main>
          {children}
        </main>

        <Footer />
      </div>
    </>
  )
}
