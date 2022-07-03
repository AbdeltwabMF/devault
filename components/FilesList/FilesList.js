import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faDownload, faEllipsisVertical, faShareNodes, faTrash } from '@fortawesome/free-solid-svg-icons'
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
  const [selectedFileType, setSelectedFileType] = useState(UNSET)
  const [selectedFileSize, setSelectedFileSize] = useState(UNSET)
  const [isReadyForDownloading, setIsReadyForDownloading] = useState(UNSET)

  useEffect(() => {
    if (askingPassphrase === FALSE && isReadyForDownloading === TRUE) {
      setAskingPassphrase(prevState => UNSET)
      console.log(isReadyForDownloading)
      downloadFiles(selectedFileName, selectedFileHash, selectedFileType, selectedFileSize)
    }
  }, [askingPassphrase, isReadyForDownloading, selectedFileName, selectedFileHash, selectedFileSize, downloadFiles, selectedFileType])

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
                    setSelectedFileType(prevState => file.mimeType)
                    setSelectedFileSize(prevState => file.size)
                  }}
                  >
                    <FontAwesomeIcon icon={faDownload} className={styles.downloadIcon} />
                    <span className={styles.downloadText}>Download</span>
                  </button>
                </div>
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
                      <a
                        className={styles.actionDropdownItem + ' dropdown-item'}
                        href='#'
                      >
                        <FontAwesomeIcon
                          icon={faShareNodes}
                          className={styles.shareIcon}
                          size='3x'
                        />
                        <span className={styles.shareText}>
                          Share
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        className={styles.actionDropdownItem + ' dropdown-item'}
                        href='#'
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className={styles.deleteIcon}
                          size='3x'
                        />
                        <span className={styles.deleteText}>
                          Delete
                        </span>
                      </a>
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
