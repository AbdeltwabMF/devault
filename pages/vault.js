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
import styles from '../styles/Vault.module.css'

export default function Vault () {
  const [account, setAccount] = useState('')
  const [filesCount, setFilesCount] = useState(0)
  const [files, setFiles] = useState([])
  const [buffer, setBuffer] = useState('')
  const [type, setType] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  /**
  * @description This is for connecting to metamask.
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

  /**
  * @description This function is for getting the Owner Files Count.
  */
  const getFilesCount = async () => {
    const filesCount = await smartContract.methods.getOwnerFilesCount().call()
    console.log(filesCount)
    setFilesCount(filesCount)
  }
  getFilesCount()

  /**
  * @description This function is for reading contents of files (or raw data buffers) stored on the user's computer.
  */
  const handleFileReader = (e) => {
    const file = e.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onload = (e) => {
      // The file's text will be printed here
      console.log(e.target.result)
      setBuffer(Buffer(reader.result))
      setType(file.type)
      setName(file.name)
    }
  }

  return (
    <>
      <FilesTable files={files} />
    </>
  )
}
