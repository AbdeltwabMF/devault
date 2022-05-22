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
import { create, CID } from 'ipfs-http-client'

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

export default function Vault () {
  const [account, setAccount] = useState('')
  const [filesCount, setFilesCount] = useState(0)
  const [files, setFiles] = useState([])
  const [buffer, setBuffer] = useState('')
  const [type, setType] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [Cid, setCid] = useState('')
  const [path, setPath] = useState('')
  const [smartContract, setSmartContract] = useState('')
  const [smartContractAddress, setSmartContractAddress] = useState('')

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
  const instantiateContract = async () => {
    setSmartContractAddress('0x5FbDB2315678afecb367f032d93F642f64180aa3')
    setSmartContract(new web3.eth.Contract(Storage.abi, smartContractAddress))

    /**
  * @description Getting the Owner Files Count.
  */
    const filesCount = await smartContract.methods.getOwnerFilesCount().call()
    console.log(filesCount)
    setFilesCount(filesCount)
    const files = []
    for (let i = 0; i < filesCount; i++) {
      const file = await smartContract.methods.getOwnerFile(i).call()
      files.push(file)
    }
    console.log(files)
    setFiles(files)
  }
  console.log(instantiateContract)

  /**
  * @description Reading contents of files (or raw data buffers) stored on the user's computer.
  */
  const captureFile = async (e) => {
    e.preventDefault()
    // Read only the first file
    try {
      const file = e.target.files[0]
      const reader = new window.FileReader()
      reader.onload = async (e) => {
        console.log(e.target.result)
        setBuffer('File Buffer: ', Buffer.from(reader.result))
        setType(file.type)
        setName(file.name)
      }
      reader.readAsArrayBuffer(file)
    } catch (error) {
      console.log(error)
    }
  }

  const uploadFile = async () => {
    const result = await ipfs.add(buffer, (err, res) => {
      if (err) {
        console.log('Error IPFS: ', err)
      } else {
        console.log('IPFS respond: ', res)
        setCid(res[0].hash)
        setPath(res[0].path)
        setIsLoading(true)

        if (type === '') { setType('none') }
        smartContract.methods.storeFile(name, res[0].size, type, path).send({ from: account }).on('TransactionHash', (hash) => {
          console.log(hash)
          setIsLoading(false)
          setType('')
          setName('')
          // window.location.reload()
        }).on('error', (error) => {
          console.log(error)
          setIsLoading(false)
        })
      }
    })
    console.log(result)
  }

  return (
    <>
      <Container className={styles.container}>
        <Row>
          <Col xs={12} className={styles.readData}>
            {isLoading
              ? <div id='loader' className='text-center mt-5'><p>Loading...</p></div>
              : <ReadData captureFile={captureFile} uploadFile={uploadFile} />}
            <hr className={styles.devider} />
          </Col>
          <Col xs={12}>
            <FilesTable files={files} />
          </Col>
        </Row>
      </Container>
      <div>
        {!ipfs && (
          <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
        )}
      </div>
    </>
  )
}
