import Link from 'next/link'
import Image from 'next/image'
import styles from './Footer.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTelegram } from '@fortawesome/free-brands-svg-icons'

export default function Footer () {
  return (
    <footer className={styles.main}>
      <div className={'container ' + `${styles.container}`}>
        <div className={'row ' + `${styles.row1}`}>
          <div className={'col col-lg-6 col-12 ' + `${styles.col1}`}>
            <Link href='https://github.com/abdeltwabmf/devault'>
              <a
                className={styles.social}
              >
                <FontAwesomeIcon icon={faGithub} className={styles.socialIcon} />
                <span className={styles.label}>Source</span>
              </a>
            </Link>
            <Link href='https://t.me/+OeH3hX00HqxmZDc8'>
              <a
                className={styles.social}
              >
                <FontAwesomeIcon icon={faTelegram} className={styles.socialIcon} />
                <span className={styles.label}>Join</span>
              </a>
            </Link>
          </div>
          <div className={'col col-lg-6 col-12 ' + `${styles.col2}`}>
            <Image src='/favicon-32x32.png' alt='logo' width='32px' height='32px' className={styles.brandIcon} />
            <span className={styles.copyright}>
              &copy; {new Date().getFullYear()}
            </span>
            <span className={styles.brand}>Devault</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
