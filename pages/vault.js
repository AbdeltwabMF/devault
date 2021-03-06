/**
  * @fileoverview This file is for my vault page.
  *         it uses web3 library to interact with the blockchain.
  *         connecting to metamask and getting the account address.
  *         and then instantiating the contract.
  *         and then calling its methods.
  * @author Abd El-Twab M. Fakhry <abdeltwab.m.fakhry at gmail dot com>
  * @version v0.3.0
  * @license GPL-3.0
  */

import { useState, useEffect, useContext, createContext } from 'react'
import { ethers } from 'ethers'
import Head from 'next/head'

import FilesList from '../components/FilesList/FilesList'
import UploadForm from '../components/UploadForm/UploadForm'
import SearchFiles from '../components/Search/SearchFiles'
import NoFilesAddedYet from '../components/AssistantPages/NoFilesAddedYet'
import HorizontalDivider from '../components/Dividers/HorizontalDivider'
import SpinnerModal from '../components/Modals/SpinnerModal'
import ErrorModal from '../components/Modals/ErrorModal'
import Pagination from '../components/Pagination/Pagination'

import getIpfs from '../utils/getIpfs'
import { encryptAES256, decryptAES256 } from '../utils/cryptoHandlers'
import { downloadBlob } from '../utils/downloadHandlers'
import { UNSET, TRUE, FALSE } from '../utils/states'

import { Web3Context } from './_app'

import styles from '../styles/Vault.module.css'

import all from 'it-all'
import { concat } from 'uint8arrays/concat'

export const FileContext = createContext()
export const ProcessContext = createContext()
export const PagingContext = createContext()

export default function Vault () {
  const {
    provider,
    contract,
    account,
    chainId,
    setBlockNumber,
    setBalance
  } = useContext(Web3Context)

  const [files, setFiles] = useState([])

  const [fileBuffer, setFileBuffer] = useState(UNSET)
  const [name, setName] = useState(UNSET)
  const [type, setType] = useState(UNSET)
  const [size, setSize] = useState(UNSET)
  const [hash, setHash] = useState(UNSET)
  const [passphrase, setPassphrase] = useState(UNSET)

  const [isRequestingPassphrase, setIsRequestingPassphrase] = useState(UNSET)
  const [isUploading, setIsUploading] = useState(UNSET)
  const [isUploadCanceled, setIsUploadCanceled] = useState(UNSET)
  const [isDownloading, setIsDownloading] = useState(UNSET)
  const [isSameSession, setIsSameSession] = useState(UNSET)
  const [isTransactionSucceed, setIsTransactionSucceed] = useState(UNSET)
  const [isReadyForTransaction, setIsReadyForTransaction] = useState(UNSET)
  const [isAuthorized, setIsAuthorized] = useState(UNSET)
  const [isRemoved, setIsRemoved] = useState(UNSET)
  const [isShared, setIsShared] = useState(UNSET)

  const [pageSize, setPageSize] = useState(10)
  const [firstIndex, setFirstIndex] = useState(1)
  const [lastIndex, setLastIndex] = useState(1 + pageSize)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalFiles, setTotalFiles] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const processContextValue = {
    isRequestingPassphrase,
    setIsRequestingPassphrase,
    isUploading,
    setIsUploading,
    isUploadCanceled,
    setIsUploadCanceled,
    isTransactionSucceed,
    setIsTransactionSucceed,
    isAuthorized,
    setIsAuthorized,
    isDownloading,
    setIsDownloading,
    isSameSession,
    setIsSameSession,
    isReadyForTransaction,
    setIsReadyForTransaction,
    isRemoved,
    setIsRemoved,
    isShared,
    setIsShared
  }

  const fileContextValue = {
    fileBuffer,
    setFileBuffer,
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

  const pagingContextValue = {
    currentPage,
    setCurrentPage,
    firstIndex,
    setFirstIndex,
    lastIndex,
    setLastIndex,
    totalPages,
    setTotalPages,
    pageSize,
    setPageSize,
    totalFiles,
    setTotalFiles
  }

  const shareFile = async (_address, _fileIndex) => {
    const _options = {
      from: account,
      gasLimit: 3000000
    }
    try {
      const res = await contract.shareFile(_address, _fileIndex, _options)
      console.log(res)
      setIsTransactionSucceed(prevState => TRUE)
      setIsShared(prevState => TRUE)
    } catch (err) {
      console.log('Cannot share the file:', err.message)
      setIsTransactionSucceed(prevState => FALSE)
      setIsShared(prevState => FALSE)
    }
  }

  const removeFile = async (_fileIndex) => {
    const _options = {
      from: account,
      gasLimit: 3000000
    }
    try {
      const res = await contract.removeFile(_fileIndex, _options)
      console.log(res)
      setIsTransactionSucceed(prevState => TRUE)
      setIsRemoved(prevState => TRUE)
    } catch (err) {
      console.log('Cannot delete the file:', err.message)
      setIsTransactionSucceed(prevState => FALSE)
      setIsRemoved(prevState => FALSE)
    }
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

    const __resetForm = () => {
      const resetInput = document.getElementById('resetForm')
      resetInput.click()
    }

    if (isTransactionSucceed === FALSE) {
      __resetForm()
    }
  }, [isTransactionSucceed, provider, account, setBalance, setBlockNumber])

  useEffect(() => {
    const fetchFilesMetadata = async () => {
      if (window.sessionStorage.getItem('is_connected') === 'true') {
        setIsSameSession(prevState => TRUE)
        setIsAuthorized(prevState => TRUE)
      } else {
        setIsSameSession(prevState => FALSE)
        setIsAuthorized(prevState => FALSE)
      }
      console.log(isAuthorized)

      if (contract && account) {
        const _options = { from: account }

        try {
          const _filesCount = await contract.getFilesCount(_options)
          setTotalFiles(prevState => _filesCount)
          setTotalPages(prevState => Math.ceil(_filesCount / pageSize))

          console.log(firstIndex, lastIndex)
          console.log('Fetching files metadata form blockchain...')
          const _files = await contract.getRangeOfFiles(firstIndex, lastIndex, _options)
          setFiles(prevState => _files)
        } catch (err) {
          console.log('Cannot fetch files from blockchain:', err.message)
          // TODO: handle error
        }
      }
    }
    fetchFilesMetadata()
  }, [isTransactionSucceed, chainId, account, contract, isAuthorized, firstIndex, lastIndex, currentPage, isRemoved, isShared, pageSize])

  useEffect(() => {
    if (isReadyForTransaction === TRUE) {
      const __storeFilesMetadata = async () => {
        setType(type === '' ? prevState => 'none' : prevState => type)

        try {
          console.log('Storing the files metadata in the blockchain...')
          setIsTransactionSucceed(prevState => UNSET)

          const _options = { from: account, gasLimit: 3000000 }

          const _tx = await contract.storeFile(name, size, type, hash, _options)
          // wait for the transaction to be mined
          const _receipt = await _tx.wait()
          console.log('Receipt:', _receipt)

          setIsTransactionSucceed(prevState => TRUE)
          setIsReadyForTransaction(prevState => FALSE)
        } catch (err) {
          console.log('Cannot make a transaction to store files\' metadata:', err.message)
          setIsTransactionSucceed(prevState => FALSE)
          setIsReadyForTransaction(prevState => UNSET)
        }
      }
      __storeFilesMetadata()
    }
  }, [isReadyForTransaction, account, contract, name, size, type, hash])

  const captureFiles = (e) => {
    e.preventDefault()
    try {
      console.log('Capturing the file...')
      const _file = e.target.files[0]
      const _reader = new window.FileReader()
      _reader.readAsArrayBuffer(_file)

      _reader.onloadend = () => {
        console.log('result:', _reader.result)
        console.log('result buffer', Buffer.from(_reader.result))
        setFileBuffer(prevState => _reader.result)
        setType(prevState => _file.type)
        setName(prevState => _file.name)
      }

      const fileCapturer = document.getElementById('fileCapturer')
      const fileSelect = document.getElementById('fileSelect')

      if (fileCapturer) {
        fileSelect.click()
      }
    } catch (error) {
      console.log('Cannot capture the file:', error.message)
    // TODO: handle error
    }
  }

  const uploadFiles = async () => {
    try {
      console.log('Encrypting & Uploading file to IPFS...')
      setIsUploading(prevState => TRUE)

      const _options = { from: account, gasLimit: 3000000 }
      const ipfs = getIpfs()
      // fileBuffer = ArrayBuffer
      const encryptedFileBufferWordArray = encryptAES256(fileBuffer, passphrase)

      const response = await ipfs.add(Buffer.from(encryptedFileBufferWordArray))

      console.log('response:', response.path)
      const isFilePresent = await contract.isFilePresent(response.path, _options)
      console.log(isFilePresent)
      if (isFilePresent) {
        console.log('File already exists')
        setIsUploading(prevState => FALSE)
        return
      }

      setSize(prevState => response.size)
      setHash(prevState => response.path)

      setIsUploading(prevState => FALSE)
      setIsReadyForTransaction(prevState => TRUE)
    } catch (error) {
      console.log('Cannot upload file to IPFS:', error.message)
      // TODO: show error message
      setIsUploading(prevState => UNSET)
      setIsReadyForTransaction(prevState => UNSET)
    }
  }

  const downloadFiles = async (_name, cid, _type, _size) => {
    try {
      console.log('Retrieving & decrypting the file...')
      console.log('name:', _name)
      console.log('cid:', cid)
      console.log('type:', _type)
      console.log('size:', _size)
      setSize(prevState => _size)
      setIsDownloading(prevState => TRUE)

      const ipfs = getIpfs()
      console.log('cid:', cid)

      // Get the data in one large uint8array
      const data = concat(await all(ipfs.cat(cid)))

      const decryptedUint8Array = decryptAES256(data, passphrase)
      downloadBlob(decryptedUint8Array, _name, _type)
      setIsDownloading(prevState => FALSE)
    } catch (error) {
      console.log('Cannot download file from IPFS:', error.message)
      // TODO: handle error
      setIsDownloading(prevState => UNSET)
    }
  }

  return (
    <>
      <Head>
        <title>The vault | Where your files live</title>
      </Head>
      <FileContext.Provider value={fileContextValue}>
        <ProcessContext.Provider value={processContextValue}>
          <PagingContext.Provider value={pagingContextValue}>
            {isAuthorized === FALSE && (
              <ErrorModal
                header='You are not authorized to access this page'
                message='Please connect with your Ethereum wallet.'
                onClose={() => {
                }}
              />)}

            {isUploading === TRUE
              ? (
                <SpinnerModal
                  header='Encrypting & Uploading your file...'
                  message={size > 10000000 ? 'This may take several minutes...' : 'This may take a few seconds...'}
                  onClose={() => setIsUploading(prevState => FALSE)}
                />
                )
              : <></>}

            {isReadyForTransaction === TRUE
              ? (
                <SpinnerModal
                  header='Confirming your transaction...'
                  message='This may take several minutes...'
                  onClose={() => {
                    isReadyForTransaction(prevState => FALSE)
                  }}

                />
                )
              : <></>}

            {isDownloading === TRUE
              ? (
                <SpinnerModal
                  header='Retrieving & decrypting your file...'
                  message={size > 10000000 ? 'This may take several minutes...' : 'This may take a few seconds...'}
                  onClose={() => {
                    isDownloading(prevState => FALSE)
                  }}
                />
                )
              : <></>}
            <div className={styles.main}>
              <div className={'container ' + styles.container}>
                <div className={'row ' + styles.row}>
                  {account && contract
                    ? (
                      <>
                        <div className={'col col-12 ' + styles.searchUpload}>
                          <SearchFiles />
                          <UploadForm
                            captureFiles={captureFiles}
                            uploadFiles={uploadFiles}
                          />
                        </div>
                        <HorizontalDivider />
                        <div className='col col-12 '>
                          {files.length > 0
                            ? (
                              <>
                                <FilesList
                                  files={files}
                                  downloadFiles={downloadFiles}
                                  shareFile={shareFile}
                                  removeFile={removeFile}
                                />
                                <Pagination />
                              </>)
                            : <><NoFilesAddedYet /></>}
                        </div>
                      </>
                      )
                    : <></>}
                </div>
              </div>
            </div>
          </PagingContext.Provider>
        </ProcessContext.Provider>
      </FileContext.Provider>
    </>
  )
}
