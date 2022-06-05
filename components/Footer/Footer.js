import { Vim, Artixlinux, Github, Telegram, ReactJs } from '@icons-pack/react-simple-icons/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseLock } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer () {
  return (
    <footer className={styles.main}>
      <div className={'container ' + `${styles.container}`}>
        <div className={'row ' + `${styles.row1}`}>
          <div className={'col xl-12 lg-4 ' + `${styles.col1}`}>
            <Link href='https://github.com/abdeltwabmf/decentralized-vault'>
              <a className={styles.social}>
                <Github color='teal' className={styles.socialIcon} />
                <span className={styles.labelLink}>View Source</span>
              </a>
            </Link>
            <Link href='https://t.me/+OeH3hX00HqxmZDc8'>
              <a className={styles.social}>
                <Telegram color='teal' className={styles.socialIcon} />
                <span className={styles.labelLink}>Join Telegram</span>
              </a>
            </Link>
          </div>
          <div className={'col xl-12 lg-4 ' + `${styles.col2}`}>
            <span className={styles.label}>Built with</span>
            <Vim color='teal' size={19} className={styles.toolsIcon} />
            <span className={styles.label}>&amp;</span>
            <ReactJs color='teal' size={19} className={styles.toolsIcon} />
            <span className={styles.label}>on</span>
            <Artixlinux color='teal' size={19} className={styles.toolsIcon} />
          </div>
          <div className={'col xl-12 lg-4 ' + `${styles.col3}`}>
            &copy; {new Date().getFullYear()}
            <FontAwesomeIcon icon={faHouseLock} size='lg' fixedWidth className={styles.brandIcon} />
            <span className={styles.brand}>Decentralized eVault</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
