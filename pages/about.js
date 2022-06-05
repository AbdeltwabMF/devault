import styles from '../styles/About.module.css'

export default function Home () {
  return (
    <div className={styles.main}>
      <div className={'container ' + `${styles.container}`}>
        <h1 className={styles.title}>Decentralized eVault</h1>
        <div className='row '>
          <div className='col col-12'>
            <div>
              <p className={styles.description}>
                A Blockchain-based decentralized encrypted cloud storage.
              </p>
              <hr />
            </div>
          </div>
          <div className='col col-12'>
            <div className={styles.card}>
              <h2>Private</h2>
              <p>
                DeeVa encrypts and distributes your files across a decentralized
                network. You control your private encryption keys and you own your
                data.
              </p>
            </div>
          </div>
          <div className='col col-12'>
            <div className={styles.card}>
              <h2>Source</h2>
              <p>
                Every file is encrypted, split into pieces, and stored on diverse
                Nodes
              </p>
            </div>
          </div>
          <div className='col col-12'>
            <div className={styles.card}>
              <h2>Available</h2>
              <p>
                Due to the nature of the decentralized network, your data is
                multi-region by default, always available when you need it.
              </p>
            </div>
          </div>
          <div className='col col-12'>
            <div className={styles.card}>
              <h2>Open Source</h2>
              <p>DeeVa software is completely open source</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
