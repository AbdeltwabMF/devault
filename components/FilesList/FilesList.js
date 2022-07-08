import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faDownload, faEllipsisVertical, faShareNodes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useContext } from 'react'

import FontAwesomeMimeTypeIcon from '../Icons/FontAwesomeMimeTypeIcon'
import { UNSET, TRUE, FALSE } from '../../utils/states'
import calculateTimeFromUnixStamp from '../../utils/calculateTimeFromUnixStamp'
import formatBytes from '../../utils/convertByteToHumanReadable'

import WarnModal from '../Modals/WarnModal'
import AskPassphrase from '../Modals/AskPassphrase'
import TakeAddress from '../Modals/TakeAddress'
import InfoModal from '../Modals/InfoModal'
import { ProcessContext } from '../../pages/vault'

import styles from './FilesList.module.css'

export default function FilesList (props) {
  const { files, downloadFiles, shareFile, removeFile } = props
  const {
    setIsRemoved,
    setIsShared,
    isRemoved,
    isShared,
    isTransactionSucceed,
    setIsTransactionSucceed
  } = useContext(ProcessContext)

  const [askingPassphrase, setAskingPassphrase] = useState(UNSET)
  const [selectedFileIndex, setSelectedFileIndex] = useState(UNSET)
  const [selectedFileName, setSelectedFileName] = useState(UNSET)
  const [selectedFileHash, setSelectedFileHash] = useState(UNSET)
  const [selectedFileType, setSelectedFileType] = useState(UNSET)
  const [selectedFileSize, setSelectedFileSize] = useState(UNSET)
  const [isReadyForDownloading, setIsReadyForDownloading] = useState(UNSET)
  const [isReadyToShare, setIsReadyToShare] = useState(UNSET)
  const [isReadyForRemoving, setIsReadyForRemoving] = useState(UNSET)
  const [toAddress, setToAddress] = useState(UNSET)

  useEffect(() => {
    if (askingPassphrase === FALSE && isReadyForDownloading === TRUE) {
      setAskingPassphrase(prevState => UNSET)
      console.log(isReadyForDownloading)
      downloadFiles(selectedFileName, selectedFileHash, selectedFileType, selectedFileSize)
    }
  }, [askingPassphrase, isReadyForDownloading, selectedFileName, selectedFileHash, selectedFileSize, downloadFiles, selectedFileType])

  const removeFileHandler = () => {
    try {
      console.log('selected file index:', selectedFileIndex)
      removeFile(selectedFileIndex)
    } catch (err) {
      console.log('Can not delete the file', err)
    } finally {
      setIsReadyForRemoving(prevState => UNSET)
    }
  }

  const shareFileHandler = (e) => {
    e.preventDefault()
    try {
      console.log('selected file index:', selectedFileIndex)
      shareFile(toAddress, selectedFileIndex)
    } catch (err) {
      console.log('Can not share file', err.message)
    } finally {
      setIsReadyToShare(prevState => UNSET)
    }
  }

  return (
    <>
      {askingPassphrase === TRUE && <AskPassphrase
        isEncryption={false}
        setAskingPassphrase={setAskingPassphrase}
        setIsReadyForDownloading={setIsReadyForDownloading}
        header='Decrypt file'
        message='Enter your passphrase to decrypt the file'
        onClose={() => setAskingPassphrase(prevState => UNSET)}
                                    />}

      {isReadyForRemoving === TRUE && <WarnModal
        header='Remove file permanently'
        message='Are you sure you want to remove this file?'
        buttonText='Remove'
        buttonAction={removeFileHandler}
        onClose={() => {
          setIsRemoved(prevState => UNSET)
          setIsReadyForRemoving(prevState => UNSET)
        }}
                                      />}

      {isReadyToShare === TRUE && <TakeAddress
        header='Share file'
        message='Enter the address you want to share the file with'
        buttonText='Share'
        buttonAction={shareFileHandler}
        setToAddress={setToAddress}
        toAddress={toAddress}
        onClose={() => {
          setIsShared(prevState => UNSET)
          setIsReadyToShare(prevState => UNSET)
        }}
                                  />}

      {isRemoved === TRUE && isTransactionSucceed === TRUE && <InfoModal
        header='File removed'
        message={`File ${selectedFileName} has been removed`}
        buttonText='OK'
        buttonAction={() => {
          setIsRemoved(prevState => UNSET)
          setIsTransactionSucceed(prevState => UNSET)
        }}
        onClose={() => {
          setIsRemoved(prevState => UNSET)
          setIsTransactionSucceed(prevState => UNSET)
        }}
                                                              />}

      {isShared === TRUE && isTransactionSucceed === TRUE && <InfoModal
        header='File shared'
        message={`File ${selectedFileName} has been shared to address ${toAddress}`}
        buttonText='OK'
        buttonAction={() => {
          setIsShared(prevState => UNSET)
          setIsTransactionSucceed(prevState => UNSET)
        }}
        onClose={() => {
          setIsShared(prevState => UNSET)
          setIsTransactionSucceed(prevState => UNSET)
        }}
                                                             />}

      <table className={'table table-borderless ' + `${styles.table}`}>
        <thead className={styles.tableHead} key='fs'>
          <tr>
            <th className={styles.thName}>
              <span className={styles.headerText}>Name</span>
              <FontAwesomeIcon icon={faSort} className={styles.sortIcon} />
            </th>
            <th className={styles.thSize}>
              <span className={styles.headerText}>File Size</span>
              <FontAwesomeIcon icon={faSort} className={styles.sortIcon} />
            </th>
            <th className={styles.thTime}>
              <span className={styles.headerText}>Last Modified</span>
              <FontAwesomeIcon icon={faSort} className={styles.sortIcon} />
            </th>
            <th className={styles.thDownload} />
            <th className={styles.thAction} />
          </tr>
        </thead>
        {files && files.map((file, index) => (
          <tbody className={styles.tableBody} key={index}>
            <tr className={styles.tableRow}>
              <td className={styles.tdName} title={file.name}>
                <FontAwesomeMimeTypeIcon mimeType={file.mimeType} />
                <span className={styles.nameText}>{file.name}</span>
              </td>
              <td className={styles.tdSize}>
                <div className={styles.size}>{formatBytes(file.size)}</div>
              </td>
              <td className={styles.tdTime}>
                <div className={styles.time}>{calculateTimeFromUnixStamp(file.uploadTime)}</div>
              </td>
              <td className={styles.tdDownload}>
                <button
                  onClick={() => {
                    setAskingPassphrase(prevState => TRUE)
                    setSelectedFileName(prevState => file.name)
                    setSelectedFileHash(prevState => file.hash)
                    setSelectedFileType(prevState => file.mimeType)
                    setSelectedFileSize(prevState => file.size)
                  }}
                  className={styles.downloadButton}
                >
                  <FontAwesomeIcon icon={faDownload} className={styles.downloadIcon} />
                </button>
              </td>
              <td className={styles.tdAction}>
                <div className={styles.actionDropdown + ' dropup-center dropup'}>
                  <button
                    className={styles.actionButton + ' dropdown-toggle'}
                    type='button'
                    id='fileActions'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    <FontAwesomeIcon icon={faEllipsisVertical} className={styles.actionIcon} />
                  </button>
                  <ul
                    className={styles.actionDropdownMenu + ' dropdown-menu'}
                    aria-labelledby='fileActions'
                  >
                    <li>
                      <button
                        className={styles.actionDropdownItem + ' dropdown-item'}
                        onClick={() => {
                          setIsReadyToShare(prevState => TRUE)
                          setSelectedFileName(prevState => file.name)
                          setSelectedFileIndex(prevState => file.index)
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faShareNodes}
                          className={styles.shareIcon}
                          size='3x'
                        />
                        <span className={styles.shareText}>
                          Share
                        </span>
                      </button>
                    </li>
                    <li>
                      <button
                        className={styles.actionDropdownItem + ' dropdown-item'}
                        onClick={() => {
                          setIsReadyForRemoving(prevState => TRUE)
                          setSelectedFileName(prevState => file.name)
                          setSelectedFileIndex(prevState => file.index)
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className={styles.deleteIcon}
                          size='3x'
                        />
                        <span className={styles.deleteText}>
                          Delete
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  )
}
