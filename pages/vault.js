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

import { create } from 'ipfs-http-client'

import { useState, useEffect, useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import FilesList from '../components/FilesList/FilesList'
import UploadFiles from '../components/UploadFiles/UploadFiles'

import { AccountContext } from './_app'
import Error404 from '../components/Errors/Error404'
import BGParticles from '../components/Animation/BGParticles'

import styles from '../styles/Vault.module.css'

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

export default function Vault () {
  const { contract, account, Initialize } = useContext(AccountContext)
  const [files, setFiles] = useState([])
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

  useEffect(() => {
    console.log('From Vault Before:', contract)

    if (contract) {
      const getActualFiles = async () => {
        const filesIndex = await contract.getFilesCount()
          .then(filesIndex => filesIndex.toNumber())

        if (filesIndex !== 0) {
          setIsFetching(true)
          console.log('Fetching Files...')

          try {
            const files = await contract.getAllFiles()
            setFiles(files)
            setIsFetching(false)
          } catch (err) {
            console.log('Cannot fetch files from blockchain:', err.message)
          }
        }
      }

      getActualFiles()
    }
  }, [isMakingTransaction])

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

  const uploadFile = async (e) => {
    e.preventDefault()

    console.log('Uploading file to IPFS...')
    setIsUploading(true)

    await ipfs.add(buffer).then(async (response) => {
      setSize(prevState => response.size)
      setHash(prevState => response.path)

      console.log('File uploaded successfully!')
    })

    setIsUploading(false)
    storeMetadata()
  }

  const downloadFile = async (password) => {
    console.log('Retrieving & decrypting the file...')
    setIsDownloading(true)

    setIsDownloading(false)
  }

  const storeMetadata = async () => {
    setType(type === '' ? 'none' : type)

    console.log('Making a transaction...')
    setIsMakingTransaction(true)

    await contract.storeFile(name, size, type, hash)
      .then(async (res) => {
        console.log('Transaction made successfully!')
      }).catch(err => {
        console.log(err)
      })

    setIsMakingTransaction(false)
  }

  return (
    <>
      {account && contract
        ? (
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
          </Container>)
        : (
          <div>
            <Error404 />
            <BGParticles />
          </div>
          )}
    </>
  )
}
