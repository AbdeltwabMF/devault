import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { ethers } from 'ethers'
import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json'

const greeterAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'

export default function Home () {
  const [greeting, setGreetingValue] = useState('')

  async function requestAccounts () {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  async function fetchGreeting () {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      )

      try {
        const data = await contract.greet()
        document.getElementById('fetchGreeting').value = data
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  async function setGreeting () {
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccounts()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      setGreetingValue('')
      await transaction.wait()
      fetchGreeting()
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>DeVa - Decentralized Vault</title>
        <meta
          name='description'
          content='A Blockchain Based Decentralized Cloud Storage'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>DeVa - Decentralized Vault</h1>

        <div>
          <p className={styles.description}>
            A Blockchain Based Decentralized Cloud Storage System
          </p>
          <hr />
        </div>

        <div className={styles.grid}>
          <button className={styles.btn} onClick={setGreeting}>
            Set Greeting
          </button>

          <input
            id='setGreeting'
            className={styles.inpt}
            onChange={(e) => setGreetingValue(e.target.value)}
            value={greeting}
            placeholder='Set greeting'
          />
        </div>

        <div>
          <button className={styles.btn} onClick={fetchGreeting}>
            Get Greeting
          </button>

          <input
            id='fetchGreeting'
            className={styles.inpt}
            placeholder='Fetch greeting'
          />
        </div>
      </main>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Abd El-Twab M. Fakhry
      </footer>
    </div>
  )
}
