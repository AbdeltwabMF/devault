import styles from '../styles/About.module.css'

export default function Home () {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to DeVa</h1>

        <div>
          <p className={styles.description}>
            A Blockchain Based Decentralized Cloud Storage
          </p>
          <hr />
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Private</h2>
            <p>
              DeVa encrypts and distributes your files across a decentralized
              network. You control your private encryption keys and you own your
              data.
            </p>
          </div>

          <div className={styles.card}>
            <h2>Source</h2>
            <p>
              Every file is encrypted, split into pieces, and stored on diverse
              Nodes
            </p>
          </div>

          <div className={styles.card}>
            <h2>Available</h2>
            <p>
              Due to the nature of the decentralized network, your data is
              multi-region by default, always available when you need it.
            </p>
          </div>

          <div className={styles.card}>
            <h2>Open Source</h2>
            <p>DeVa software is completely open source</p>
          </div>
        </div>
      </main>
    </div>
  )
}
