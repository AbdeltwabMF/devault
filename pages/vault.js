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
import Storage from '../artifacts/contracts/storage.sol/Storage.json'
import Web3 from 'web3'
import FilesTable from '../components/Tables/FilesTable'
import ReadData from '../components/ReadData/ReadData'
import styles from '../styles/Vault.module.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { create } from 'ipfs-http-client'

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

export default function Vault () {
  const [account, setAccount] = useState('')
  const [filesCount, setFilesCount] = useState(0)
  const [files, setFiles] = useState([])
  const [buffer, setBuffer] = useState(null)
  const [type, setType] = useState('')
  const [CID, setCID] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
  const smartContractAddress = 	'0x5FbDB2315678afecb367f032d93F642f64180aa3'
  const smartContract = new web3.eth.Contract(Storage.abi, smartContractAddress)

  try {
    const getAccount = async () => {
      const accounts = await web3.eth.getAccounts()
      console.log('getAccount: ', accounts[0])
      setAccount(accounts[0])
    }
    getAccount()
  } catch (error) {
    console.log('Connection Error: ', error)
  }

  /**
    * @description Getting the Owner Files Count.
    */
  const getFilesCount = async () => {
    try {
      const filesCount = await smartContract.methods.getFilesCount().call()
      console.log(filesCount)
      setFilesCount(filesCount)
    } catch (error) {
      console.log(error)
    }
  }

  /**
    * @description Getting the Owner actual Files.
    */
  const fetchFiles = async () => {
    try {
      const files = await smartContract.methods.getAllFiles().call()
      console.log(files)
      setFiles(files)
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  useEffect(() => {
    const componentDidMount = async () => {
      await getFilesCount()
      await fetchFiles()
    }
    componentDidMount()
  }, [])

  /**
  * @description Reading contents of files (or raw data buffers) stored on the user's computer.
  */
  const captureFile = async (e) => {
    try {
      const file = e.target.files[0]
      const reader = new window.FileReader()
      reader.readAsArrayBuffer(file)

      reader.onloadend = () => {
        console.log('reader.onloadend: ', Buffer.from(reader.result))
        setBuffer(Buffer.from(reader.result))
        setType(file.type)
        setName(file.name)
      }
    } catch (error) {
      console.log(error)
    }
    e.preventDefault()
  }

  const uploadFile = async (e) => {
    e.preventDefault()
    try {
      console.log('uploading file...')
      const result = await ipfs.add(buffer)
      console.info('IPFS respond: ', result)

      setIsLoading(true)
      if (type === '') { setType('none') }

      await smartContract.methods.storeFile(name, result.size, type, result.path).send({ from: account }).on('TransactionHash', (hash) => {
        console.log(hash)
        setIsLoading(false)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Container className={styles.container}>
        <Row>
          <Col xs={12} className={styles.readData}>
            <ReadData captureFile={captureFile} uploadFile={uploadFile} />
            <hr className={styles.devider} />
          </Col>
          <Col xs={12}>
            <FilesTable files={files} />
          </Col>
        </Row>
      </Container>
    </>
  )
}
