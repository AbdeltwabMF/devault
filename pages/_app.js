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

import { ethers } from 'ethers'

import Storage from '../artifacts/contracts/storage.sol/Storage.json'
import Layout from '../components/Layouts/Layout'
import createEmotionCache from '../utils/createEmotionCache'
import { getLibrary } from '../utils/getLibrary'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export const AccountContext = createContext()

export default function App (props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const [signer, setSigner] = useState(null)
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(null)
  const [contract, setContract] = useState(null)
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

  useEffect(() => {
    const checkConnection = async () => {
      if (window.sessionStorage.getItem('isMetamaskConnected') === 'true') {
        await Initialize()
      }
    }
    checkConnection()
  }, [account, signer, contract])

  const Initialize = async () => {
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

    const contract = new ethers.Contract(contractAddress, Storage.abi, provider).connect(signer)
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
    Initialize,
    contractAddress
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
          <AccountContext.Provider value={value}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AccountContext.Provider>
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
