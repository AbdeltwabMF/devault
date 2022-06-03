import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css'

import Head from 'next/head'
import { useState, createContext, useEffect } from 'react'

import { ethers } from 'ethers'

import Storage from '../artifacts/contracts/storage.sol/Storage.json'
import Layout from '../components/Layouts/Layout'
import { getLibrary } from '../utils/getLibrary'

export const AccountContext = createContext()

export default function App ({ Component, pageProps }) {
  const [signer, setSigner] = useState(null)
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)
  const [blockNumber, setBlockNumber] = useState(null)
  const [balance, setBalance] = useState(null)
  const [contract, setContract] = useState(null)
  const [chainId, setChainId] = useState(null)
  // 1= '0x02C789CCD01aa2916A9f00dcEBfE30b1DC7Feb10'
  // 2= '0x579B81f6b261EB16a14E0978928390cC44Dfc7F8'
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

  useEffect(() => {
    const checkConnection = async () => {
      if (window.sessionStorage.getItem('isMetamaskConnected') === 'true') {
        await Initialize()
      }
    }
    checkConnection()
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
    console.log(_chainId.chainId)

    const _blockNumber = await provider.getBlockNumber()
    setBlockNumber(prevState => _blockNumber)
    console.log(_blockNumber)
  }

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
      </Head>
      <AccountContext.Provider value={value}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AccountContext.Provider>
    </>
  )
}
