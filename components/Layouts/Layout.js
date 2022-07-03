import Footer from '../Footer/Footer'
import Navbar from '../Navigation/Navbar'

import styles from './Layout.module.css'

export default function Layout ({ children }) {
  return (
    <>
      <div>
        <header>
          <Navbar />
        </header>

        <main className={styles.main}>
          {children}
        </main>

        <Footer />
      </div>
    </>
  )
}
