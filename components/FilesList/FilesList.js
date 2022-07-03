import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faDownload, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'

import FontAwesomeMimeTypeIcon from '../Icons/FontAwesomeMimeTypeIcon'
import { UNSET, TRUE, FALSE } from '../../utils/states'
import calculateTimeFromUnixStamp from '../../utils/calculateTimeFromUnixStamp'
import formatBytes from '../../utils/convertByteToHumanReadable'

import AskPassphrase from '../Modals/AskPassphrase'

import styles from './FilesList.module.css'

export default function FilesList ({ files, downloadFiles }) {
  const [askingPassphrase, setAskingPassphrase] = useState(UNSET)
  const [selectedFileName, setSelectedFileName] = useState(UNSET)
  const [selectedFileHash, setSelectedFileHash] = useState(UNSET)
  const [selectedFileSize, setSelectedFileSize] = useState(UNSET)
  const [isReadyForDownloading, setIsReadyForDownloading] = useState(UNSET)

  useEffect(() => {
    if (askingPassphrase === FALSE && isReadyForDownloading === TRUE) {
      setAskingPassphrase(prevState => UNSET)
      console.log(isReadyForDownloading)
      downloadFiles(selectedFileName, selectedFileHash, selectedFileSize)
    }
  }, [askingPassphrase, isReadyForDownloading, selectedFileName, selectedFileHash, selectedFileSize, downloadFiles])

  const getPassphrase = () => {
    setAskingPassphrase(prevState => TRUE)
  }

  return (
    <>
      {askingPassphrase === TRUE && <AskPassphrase
        isEncryption={false}
        setAskingPassphrase={setAskingPassphrase}
        setIsReadyForDownloading={setIsReadyForDownloading}
        header='Decrypt file'
        message='Enter your passphrase to decrypt the file'
                                    />}
      <table className={'table table-borderless ' + `${styles.table}`}>
        <thead className={styles.tableHead} key='fs'>
          <tr>
            <th>
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
            <th />
            <th />
          </tr>
        </thead>
        {files && files.map((file, index) => (
          <tbody className={styles.tableBody} key={index}>
            <tr className={styles.tableRow}>
              <td className={styles.tdName}>
                <div className={styles.name} title={file.name}>
                  <FontAwesomeMimeTypeIcon mimeType={file.mimeType} />
                  <span className={styles.nameText}>{file.name}</span>
                </div>
              </td>
              <td className={styles.tdSize}>
                <div className={styles.size}>{formatBytes(file.size)}</div>
              </td>
              <td className={styles.tdTime}>
                <div className={styles.time}>{calculateTimeFromUnixStamp(file.uploadTime)}</div>
              </td>
              <td className={styles.tdDownload}>
                <div className={styles.download}>
                  <button onClick={() => {
                    getPassphrase()
                    setSelectedFileName(prevState => file.name)
                    setSelectedFileHash(prevState => file.hash)
                    setSelectedFileSize(prevState => file.size)
                  }}
                  >
                    <span className={styles.downloadText}>Download</span>
                    <FontAwesomeIcon icon={faDownload} className={styles.downloadIcon} />
                  </button>
                </div>
              </td>
              <td className={styles.tdAction}>
                <div className={styles.action}>
                  <button
                    className={styles.actionButton}
                    onClick={() => {
                    }}
                  >
                    <FontAwesomeIcon icon={faEllipsisVertical} className={styles.actionIcon} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  )
}
