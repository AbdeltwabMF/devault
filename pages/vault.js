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
import { ethers } from 'ethers'

import FilesList from '../components/FilesList/FilesList'
import UploadForm from '../components/UploadForm/UploadForm'
import NoFilesAddedYet from '../components/AssistantPages/NoFilesAddedYet'

import getCrypto from '../utils/getCrypto'
import getIpfs from '../utils/getIpfs'

import { Web3Context } from './_app'

import styles from '../styles/Vault.module.css'

export const FileContext = createContext()
export const ProcessContext = createContext()

export default function Vault () {
  const {
    provider,
    contract,
    account,
    chainId,
    blockNumber,
    setBlockNumber,
    balance,
    setBalance
  } = useContext(Web3Context)

  const [files, setFiles] = useState([])

  const [rowData, setRowData] = useState(null)
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [size, setSize] = useState(0)
  const [hash, setHash] = useState('')
  const [passphrase, setPassphrase] = useState('')

  const [isRequestingPassphrase, setIsRequestingPassphrase] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isUploadCanceled, setIsUploadCanceled] = useState(false)
  const [isTransactionSucceed, setIsTransactionSucceed] = useState(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isSameSession, setIsSameSession] = useState(false)
  const [isReadyForTransaction, setIsReadyForTransaction] = useState(false)

  const processContextValue = {
    isRequestingPassphrase,
    setIsRequestingPassphrase,
    isUploading,
    setIsUploading,
    isUploadCanceled,
    setIsUploadCanceled,
    isTransactionSucceed,
    setIsTransactionSucceed,
    isDownloading,
    setIsDownloading,
    isSameSession,
    setIsSameSession,
    isReadyForTransaction,
    setIsReadyForTransaction
  }

  const fileContextValue = {
    rowData,
    setRowData,
    name,
    setName,
    type,
    setType,
    size,
    setSize,
    hash,
    setHash,
    passphrase,
    setPassphrase
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
  }, [isTransactionSucceed])

  useEffect(() => {
    const fetchFilesMetadata = async () => {
      if (window.sessionStorage.getItem('metamask') === 'ok') {
        setIsSameSession(prevState => true)
      }

      if (contract && account) {
        const _options = { from: account }

        try {
          console.log('Fetching files metadata form blockchain...')
          const _files = await contract.getFiles(_options)
          if (_files.length > 0) {
            setFiles(prevState => _files)
          }
        } catch (err) {
          console.log('Cannot fetch files from blockchain:', err.message)
          // TODO: handle error
        }
      }
    }
    fetchFilesMetadata()
  }, [isTransactionSucceed, chainId, account, contract])

  useEffect(() => {
    if (isReadyForTransaction) {
      const __storeFilesMetadata = async () => {
        setType(type === '' ? prevState => 'none' : prevState => type)

        try {
          console.log('Storing the files metadata in the blockchain...')
          setIsTransactionSucceed(prevState => null)

          const _options = { from: account, gasLimit: 3000000 }

          const _tx = await contract.storeFile(name, size, type, hash, _options)
          // wait for the transaction to be mined
          const _receipt = await _tx.wait()
          console.log('Receipt:', _receipt)

          setIsTransactionSucceed(prevState => true)
          setIsReadyForTransaction(prevState => false)
        } catch (err) {
          console.log('Cannot make a transaction to store files\' metadata:', err.message)
          setIsTransactionSucceed(prevState => false)
        } finally {
          setIsReadyForTransaction(prevState => false)
          console.log('Done.')
        }
      }
      __storeFilesMetadata()
    }
  }, [isReadyForTransaction])

  const captureFiles = (e) => {
    e.preventDefault()
    try {
      console.log('Capturing the file...')
      const _file = e.target.files[0]
      const _reader = new window.FileReader()
      _reader.readAsArrayBuffer(_file)

      _reader.onloadend = () => {
        setRowData(prevState => Buffer.from(_reader.result))
        setType(prevState => _file.type)
        setName(prevState => _file.name)
      }
    } catch (error) {
      console.log('Cannot capture the file:', error.message)
    // TODO: handle error
    }
  }

  const uploadFiles = async (e) => {
    // e.preventDefault()

    try {
      console.log('Encrypting & Uploading file to IPFS...')
      setIsUploading(prevState => true)

      const crypto = getCrypto()
      const ipfs = getIpfs()

      const bufferWordArray = crypto.lib.WordArray.create(rowData)
      const encryptedBufferWordArray = await crypto.AES.encrypt(bufferWordArray, '123').toString()
      console.log('encrypted', encryptedBufferWordArray)

      const response = await ipfs.add(Buffer.from(encryptedBufferWordArray))

      setSize(prevState => response.size)
      setHash(prevState => response.path)

      setIsReadyForTransaction(prevState => true)
    } catch (error) {
      console.log('Cannot upload file to IPFS:', error.message)
    // TODO: show error message
    } finally {
      setIsUploading(prevState => false)
    }
  }

  const saveFilesLocally = (fileUint8ArrayBuffer, fileName, fileMimeType) => {
    const blob = new Blob([fileUint8ArrayBuffer], {
      type: fileMimeType
    })

    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = fileUint8ArrayBuffer
    a.download = fileName
    document.body.appendChild(a)
    a.style = 'display: none'
    a.click()
    a.remove()

    setTimeout(function () {
      return window.URL.revokeObjectURL(url)
    }, 1000)
  }

  const downloadFiles = async (_name, _hash, _type) => {
    try {
      console.log('Retrieving & decrypting the file...')
      setIsDownloading(prevState => true)

      const ipfs = getIpfs()
      const crypto = getCrypto()

      console.log(_hash)
      for await (const buf of ipfs.get(_hash)) {
        console.log(buf.toString('utf-8'))

        const decrypted = crypto.AES.decrypt(buf.toString('utf8'), '123')
        console.log(decrypted)

        saveFilesLocally(decrypted, _name, _type)
      }
    } catch (error) {
      console.log('Cannot download file from IPFS:', error.message)
    // TODO: handle error
    } finally {
      setIsDownloading(prevState => false)
    }
  }

  return (
    <>
      <FileContext.Provider value={fileContextValue}>
        <ProcessContext.Provider value={processContextValue}>
          <div className={styles.main}>
            <div className={'container ' + `${styles.container}`}>
              <div className={'row ' + `${styles.row}`}>
                {account
                  ? (
                    <>
                      <div className={'col col-12 ' + `${styles.readData}`}>
                        <UploadForm
                          captureFiles={captureFiles}
                          uploadFiles={uploadFiles}
                        />
                        <hr className={styles.devider} />
                      </div>
                      <div className='col col-12 '>
                        {files.length > 0
                          ? (
                            <FilesList
                              files={files}
                              downloadFiles={downloadFiles}
                            />)
                          : <><NoFilesAddedYet /></>}
                      </div>
                    </>
                    )
                  : (<></>)}
              </div>
            </div>
          </div>
        </ProcessContext.Provider>
      </FileContext.Provider>
    </>
  )
}
