import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css'
import theme from '../themes/light'

import Head from 'next/head'
import PropTypes from 'prop-types'
import { useState, createContext, useEffect } from 'react'

import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ChakraProvider } from '@chakra-ui/react'

import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'

import Storage from '../artifacts/contracts/storage.sol/Storage.json'
import Layout from '../components/Layouts/Layout'
import createEmotionCache from '../utils/createEmotionCache'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export const AccountContext = createContext()

const getLibrary = () => {
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    return provider
  } else if (typeof window.web3 !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.web3.currentProvider)
    return provider
  } else {
    // If neither are available, we'll just use the default
    // provider, which just points to the local node
    return new ethers.providers.JsonRpcProvider()
  }
}

export default function App (props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const [signer, setSigner] = useState(null)
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(null)
  const [contract, setContract] = useState(null)
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

  useEffect(() => {
    const checkConnection = async () => {
      if (window.localStorage.getItem('Wallet') === 'Connected') {
        await getContract()
        await getSigner()
      }
    }
    checkConnection()
  }, [])

  const getSigner = async () => {
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer..
    const provider = getLibrary()
    await provider.send('eth_requestAccounts', [])

    const signer = provider.getSigner()
    const account = await signer.getAddress()
    const balance = await provider.getBalance(account).then(balance => ethers.utils.formatEther(balance))

    setSigner(prevState => signer)
    setAccount(prevState => account)
    setBalance(prevState => balance)
  }

  const getContract = async () => {
    const provider = getLibrary()
    const contract = new ethers.Contract(contractAddress, Storage.abi, provider)

    setContract(prevState => contract)
  }

  const value = {
    signer,
    setSigner,
    account,
    setAccount,
    contract,
    balance,
    setBalance,
    setContract,
    getSigner,
    getContract
  }

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ChakraProvider>
          <Web3ReactProvider getLibrary={getLibrary}>
            <AccountContext.Provider value={value}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AccountContext.Provider>
          </Web3ReactProvider>
        </ChakraProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired
}
