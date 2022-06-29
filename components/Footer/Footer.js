import Link from 'next/link'
import Image from 'next/image'
import styles from './Footer.module.css'

export default function Footer () {
  return (
    <footer className={styles.main}>
      <div className={'container ' + `${styles.container}`}>
        <div className={'row ' + `${styles.row1}`}>
          <div className={'col col-lg-4 col-12 ' + `${styles.col1}`}>
            <Link href='https://github.com/abdeltwabmf/decentralized-evault'>
              <a className={styles.social}>
                <Image
                  height='20'
                  width='20'
                  alt='GitHub'
                  className={styles.socialIcon}
                  src='https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/github.svg'
                />
                <span className={styles.labelLinkSource}>Source</span>
              </a>
            </Link>
            <Link href='https://t.me/+OeH3hX00HqxmZDc8'>
              <a className={styles.social}>
                <Image
                  height='20'
                  width='20'
                  alt='Telegram'
                  className={styles.socialIcon}
                  src='https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/telegram.svg'
                />
                <span className={styles.labelLinkJoin}>Join</span>
              </a>
            </Link>
          </div>
          <div className={'col col-lg-4 col-12 ' + `${styles.col2}`}>
            <span className={styles.label}>Built with</span>
            <Image
              height='20'
              width='20'
              alt='Vim'
              className={styles.toolsIcon}
              src='https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/vim.svg'
            />
            <span className={styles.label}>&amp;</span>
            <Image
              height='20'
              width='20'
              alt='Next.js'
              className={styles.toolsIcon}
              src='https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/nextdotjs.svg'
            />
            <span className={styles.label}>on</span>
            <Image
              height='20'
              width='20'
              alt='Artix Linux'
              className={styles.toolsIcon}
              src='https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/artixlinux.svg'
            />
          </div>
          <div className={'col col-lg-4 col-12 ' + `${styles.col3}`}>
            &copy; {new Date().getFullYear()}
            <Image src='/devault-64.png' alt='logo' width='32px' height='32px' className='brandIcon' />
            <span className={styles.brand}>Devault</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
