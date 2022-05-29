/**
  * @fileoverview This file is for my vault page.
  *         it uses web3 library to interact with the blockchain.
  *         connecting to metamask and getting the account address.
  *         and then instantiating the contract.
  *         and then calling its methods.
  * @author Abd El-Twab M. Fakhry <abdeltwab.m.fakhry at gmail dot com>
  * @version v0.1.0
  * @license MIT
  */

import { useState, useEffect } from 'react'
import Web3 from 'web3'
import { create, CID } from 'ipfs-http-client'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Storage from '../artifacts/contracts/storage.sol/Storage.json'
import FilesList from '../components/FilesList/FilesList'
import UploadFiles from '../components/UploadFiles/UploadFiles'

import CryptoJS from 'crypto-js'

import styles from '../styles/Vault.module.css'

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

export default function Vault () {
  const [account, setAccount] = useState('')
  const [files, setFiles] = useState([])
  const [filesCount, setFilesCount] = useState(0)
  const [buffer, setBuffer] = useState(null)
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [size, setSize] = useState(0)
  const [hash, setHash] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)
  const [isMakingTransaction, setIsMakingTransaction] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  /**
  * @description Connecting to metamask.
  */
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')

  /**
  * @description This is for instantiating the contract.
  * @param {string} address - the address of the contract.
  * @param {jsonInterface} contract.abi - Object: The json interface for the contract to instantiate
  * @returns {object} - The contract instance with all its methods and events.
  */
  const smartContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  const smartContract = new web3.eth.Contract(Storage.abi, smartContractAddress)

  useEffect(() => {
    const getAccount = async () => {
      await web3.eth.getAccounts().then(accounts => {
        setAccount(accounts[0])
      })
    }

    getAccount()
  }, [])

  /**
  * @description This is for getting the files count from the blockchain.
  */
  useEffect(() => {
    const getFilesCount = async () => {
      await smartContract.methods
        .getFilesCount().call({ from: account }).then(count => {
          setFilesCount(count)
        })
    }

    getFilesCount()
  }, [isMakingTransaction, account])

  /**
  * @description Getting the Owner actual Files.
  */
  useEffect(() => {
    const fetchFiles = async () => {
      setIsFetching(true)
      console.log('Fetching Files...')
      await smartContract.methods
        .getAllFiles().call({ from: account }, function (error, result) {
          if (error) {
            console.log('Error code: ', error.code)
            console.log('Error message: ', error.message)
          }
          setFiles(result)
          console.log('Files Fetched!')
          setIsFetching(false)
        })
    }

    filesCount > 0 && fetchFiles()
  }, [filesCount])

  /**
  * @description Reading contents of files (or raw data buffers) stored on the user's computer.
  */
  const captureFile = async (e) => {
    try {
      console.log('Capturing File...')
      setIsCapturing(true)
      const file = e.target.files[0]
      const reader = new window.FileReader()
      reader.readAsArrayBuffer(file)

      reader.onloadend = () => {
        setBuffer(Buffer.from(reader.result))
        setType(file.type)
        setName(file.name)
      }
      console.log('File Captured!')
      setIsCapturing(false)
    } catch (error) {
      console.log(error)
    }
    e.preventDefault()
  }

  useEffect(() => {
    const encryptFile = () => {
      // Encrypt
      const ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString()

      // Decrypt
      const bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123')
      const originalText = bytes.toString(CryptoJS.enc.Utf8)

      console.log(originalText) // 'my message'
    }
    encryptFile()
  }, [])

  const uploadFile = async (e) => {
    e.preventDefault()
    console.log('Uploading File...')
    setIsUploading(true)
    await ipfs.add(buffer).then(async (response) => {
      setSize(prevState => response.size)
      setHash(prevState => response.path)

      console.log('File Uploaded')
    })

    setIsUploading(false)
    storeMetaData()
  }

  const downloadFile = async (password) => {
    console.log('Downloading & decrypting the file...')
    setIsDownloading(true)
    await ipfs.get(CID.parse(hash), async (err, res) => {
      if (err) {
        console.log(err)
      }
      res.forEach((file) => {
        console.log('File hash: ', file.path)
        console.log(file.content.toString('utf8'))
        const decrypted = CryptoJS.AES.decrypt(file.content.toString('utf8'), password)
        console.log(decrypted.toString(CryptoJS.enc.Utf8))
      })
      console.log('File downloaded & decrypted successfully!')
    })
    setIsDownloading(false)
  }

  const storeMetaData = async () => {
    if (type === '') { setType('none') }
    console.log('Making a transaction...')
    setIsMakingTransaction(true)
    await smartContract.methods
      .storeFile(name, size, type, hash)
      .send({ from: account, gas: '3000000' })
      .then((receipt) => {
        console.log('Transaction made successfully!')
        console.log('Transaction receipt: ', receipt)
      }).catch((error) => {
        console.log('Sorry, file could not be stored. Please try again.')
        console.log('Error code: ', error.code)
        console.log('Error message: ', error.message)
      })
    setIsMakingTransaction(false)
  }

  return (
    <>
      <Container className={styles.container}>
        <Row>
          <Col xs={12} className={styles.readData}>
            <UploadFiles
              captureFile={captureFile}
              isCapturing={isCapturing}
              uploadFile={uploadFile}
              isUploading={isUploading}
              isMakingTransaction={isMakingTransaction}
            />
            <hr className={styles.devider} />
          </Col>
          <Col xs={12}>
            <FilesList
              files={files}
              downloadFile={downloadFile}
              isFetching={isFetching}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}
