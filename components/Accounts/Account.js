import { useEffect, useState } from 'react'
import Web3 from 'web3'
import Storage from '../../artifacts/contracts/storage.sol/Storage.json'
import styles from './Account.module.css'

export default function Account ({ children }) {
  const [account, setAccount] = useState('')
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

  return (
    <>
      {children}
    </>
  )
}
