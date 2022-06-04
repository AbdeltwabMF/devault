/**
  * @fileoverview This file is for my vault page.
  *         it uses web3 library to interact with the blockchain.
  *         connecting to metamask and getting the account address.
  *         and then instantiating the contract.
  *         and then calling its methods.
  * @author Abd El-Twab M. Fakhry <abdeltwab.m.fakhry at gmail dot com>
  * @version v0.1.0
  * @license GPL-3.0
  */

import { useState, useEffect, useContext, createContext } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { ethers } from 'ethers'

import FilesList from '../components/FilesList/FilesList'
import UploadFiles from '../components/UploadFiles/UploadFiles'
import UploadingFiles from '../components/Modals/UploadingFiles'
import TransactionStatus from '../components/Modals/TransactionStatus'
import FileUploadedSuccessfully from '../components/Alerts/FileUploadedSuccessfully'
import NoFils from '../components/AssistantPages/NoFiles'
import getIpfs from '../utils/getIpfs'

import { AccountContext } from './_app'

import styles from '../styles/Vault.module.css'

export const FileContext = createContext()

export default function Vault () {
  const {
    contract,
    account,
    chainId,
    blockNumber,
    setBlockNumber,
    balance,
    setBalance,
    provider
  } = useContext(AccountContext)
  const [files, setFiles] = useState([])
  const [buffer, setBuffer] = useState(null)
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [size, setSize] = useState(0)
  const [hash, setHash] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)
  const [isCanceled, setIsCanceled] = useState(false)
  const [isMakingTransaction, setIsMakingTransaction] = useState(false)
  const [isTransactionSucceed, setIsTransactionSucceed] = useState(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isMetamask, setIsMetamask] = useState(false)

  const value = {
    isCanceled,
    setIsCanceled,
    isFetching,
    setIsFetching,
    isDownloading,
    setIsDownloading,
    isCapturing,
    setIsCapturing
  }

  useEffect(() => {
    console.log('Did contract mount in vault:', contract)
    if (window.sessionStorage.getItem('isMetamaskConnected') === 'true') {
      setIsMetamask(prevState => true)
    }
    if (contract && account) {
      setIsFetching(prevState => true)
      console.log('Fetching files metadata form blockchain...')
      const ___getFiles = async () => {
        const _options = { from: account }

        try {
          const _files = await contract.getFiles(_options)
          if (_files.length > 0) {
            setFiles(prevState => _files)
          }
        } catch (err) {
          console.log('Cannot fetch files from blockchain:', err.message)
        }
      }

      ___getFiles()
      setIsFetching(prevState => false)
    }
  }, [isMakingTransaction, chainId, blockNumber, balance, account, contract])

  const __refresh = async () => {
    if (provider) {
      const _balance = await provider.getBalance(account)
        .then(_balance => ethers.utils.formatEther(_balance))
      setBalance(prevState => _balance)

      const _blockNumber = await provider.getBlockNumber()
      setBlockNumber(prevState => _blockNumber)
    }
  }

  /**
  * @description Reading contents of files (or raw data buffers) stored on the user's computer.
  */
  const captureFile = async (e) => {
    setIsCapturing(prevState => true)
    console.log('Capturing the file...')

    try {
      const _file = e.target.files[0]
      const _reader = new window.FileReader()
      _reader.readAsArrayBuffer(_file)

      _reader.onloadend = () => {
        setBuffer(prevState => Buffer.from(_reader.result))
        setType(prevState => _file.type)
        setName(prevState => _file.name)
      }
    } catch (error) {
      console.log('Cannot capture the file:', error.message)
    }

    e.preventDefault()
    setIsCapturing(prevState => false)
  }

  const uploadFile = async (e) => {
    setIsCanceled(prevState => false)
    setIsUploading(prevState => true)
    console.log('Uploading file to IPFS...')
    e.preventDefault()

    try {
      const ipfs = getIpfs()
      const response = await ipfs.add(buffer)
      setSize(prevState => response.size)
      setHash(prevState => response.path)
    } catch (error) {
      console.log('Cannot upload file to IPFS:', error.message)
    } finally {
      if (isCanceled) {
        setSize(prevState => 0)
        setHash(prevState => 0)
      }
      console.log(isCanceled ? 'Uploading canceled.' : '')
      setIsUploading(prevState => false)
    }
  }

  const downloadFile = async (_hash) => {
    setIsDownloading(prevState => true)
    console.log('Retrieving & decrypting the file...')

    const ipfs = getIpfs()
    const cid = 'QmQJp93vDRsRkiW5ujsQgku4ro3z8djzkah6PKQwaTnKjP'
    for await (const buf of ipfs.get(cid)) {
      console.log(buf.toString('utf-8'))
    }
    setIsDownloading(prevState => false)
  }

  useEffect(() => {
    const storeMetadata = async () => {
      setIsTransactionSucceed(prevState => null)
      setIsMakingTransaction(prevState => true)
      console.log('Storing the file metadata in the blockchain...')
      setType(type === '' ? prevState => 'none' : prevState => type)

      try {
        const _options = { from: account, gasLimit: 3000000 }

        const _tx = await contract.storeFile(name, size, type, hash, _options)
        // wait for the transaction to be mined
        const _receipt = await _tx.wait()
        console.log('Receipt:', _receipt)

        setIsTransactionSucceed(prevState => true)
      } catch (err) {
        console.log('Cannot make a transaction:', err.message)
        setIsTransactionSucceed(prevState => false)
      } finally {
        setIsMakingTransaction(prevState => false)
      }

      await __refresh()
    }
    if (size && hash && !isCanceled) {
      storeMetadata()
    }
  }, [size, hash])

  return (
    <>
      <div className={styles.main}>
        {isUploading
          ? <FileContext.Provider value={value}><UploadingFiles /></FileContext.Provider>
          : <></>}
        {isTransactionSucceed !== null ? <FileUploadedSuccessfully isSucceed={isTransactionSucceed} /> : <></>}
        <Container className={styles.container}>
          <Row>
            {account
              ? (
                <>
                  <Col xs={12} className={styles.readData}>
                    <UploadFiles
                      captureFile={captureFile}
                      uploadFile={uploadFile}
                    />
                    <hr className={styles.devider} />
                  </Col>
                  <Col xs={12}>
                    {files.length > 0
                      ? (
                        <FilesList
                          files={files}
                          downloadFile={downloadFile}
                        />)
                      : <><NoFils /></>}
                  </Col>
                </>
                )
              : <></>}
          </Row>
        </Container>
      </div>
    </>
  )
}
