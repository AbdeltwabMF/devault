import 'bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css'
import '../styles/globals.css'

import { useState, createContext, useEffect } from 'react'
import Head from 'next/head'

import { ethers } from 'ethers'

import Storage from '../artifacts/contracts/storage.sol/Storage.json'
import Layout from '../components/Layouts/Layout'
import { getLibrary } from '../utils/getLibrary'

export const Web3Context = createContext()

export default function App ({ Component, pageProps }) {
  const [provider, setProvider] = useState(null)
  const [contract, setContract] = useState(null)
  const [chainId, setChainId] = useState(null)
  const [signer, setSigner] = useState(null)
  const [account, setAccount] = useState(null)
  const [blockNumber, setBlockNumber] = useState(null)
  const [balance, setBalance] = useState(null)
  // 3 = '0x449fE6C97F4AD1d4769971F9fb1C33a64856AB73'
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.min.js')
  }, [])

  useEffect(() => {
    const __restoreStates = async () => {
      if (window.sessionStorage.getItem('is_connected') === 'true') {
        await Initialize()
      }
    }
    __restoreStates()
  }, [])

  const Initialize = async () => {
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer..
    const provider = getLibrary()
    await provider.send('eth_requestAccounts', [])

    const _signer = provider.getSigner()
    const _account = await _signer.getAddress()
    const _balance = await provider.getBalance(_account)
      .then(_balance => ethers.utils.formatEther(_balance))

    setSigner(prevState => _signer)
    setAccount(prevState => _account)
    setBalance(prevState => _balance)

    const _contract = new ethers.Contract(contractAddress, Storage.abi, provider).connect(_signer)
    setContract(prevState => _contract)

    const _chainId = await provider.getNetwork()
    setChainId(prevState => _chainId.chainId)

    const _blockNumber = await provider.getBlockNumber()
    setBlockNumber(prevState => _blockNumber)
  }

  useEffect(() => {
    const __update = async () => {
      if (provider) {
        const _balance = await provider.getBalance(account)
          .then(_balance => ethers.utils.formatEther(_balance))
        setBalance(prevState => _balance)

        const _blockNumber = await provider.getBlockNumber()
        setBlockNumber(prevState => _blockNumber)
      }
    }
    __update()
  }, [account, chainId, provider])

  const value = {
    provider,
    setProvider,
    signer,
    setSigner,
    account,
    setAccount,
    contract,
    setContract,
    balance,
    setBalance,
    chainId,
    setChainId,
    blockNumber,
    setBlockNumber,
    Initialize,
    contractAddress
  }

  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <meta name='description' content='Devault; your way to the decentralized cloud' />
        <meta name='msapplication-TileColor' content='#2b5797' />
        <meta name='theme-color' content='#ffffff' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <title>Devault | The decentralized and encrypted cloud</title>
      </Head>
      <Web3Context.Provider value={value}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Web3Context.Provider>
    </>
  )
}
