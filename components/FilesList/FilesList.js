import styles from './FilesList.module.css'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import { useState } from 'react'
import PasswordModal from '../Modals/PasswordModal'

export default function FilesList ({ files, downloadFile }) {
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  /** @description Formats the bytes in terms of KB, MB, GB, etc.
    * @param {number} bytes - The number of bytes to format
    * @returns {string} - The formatted bytes
    */
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }

  /** @description Formats the unix timestamp in terms of days, hours, minutes, etc.
    * @param {number} timestamp - The unix timestamp to format
    * @returns {string} - The formatted timestamp
    */
  const timeConvertUnixStamp = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const year = date.getFullYear()
    const month = months[date.getMonth()]
    const day = date.getDate()
    let hour = date.getHours() - 2
    if (hour < 10) {
      hour = '0' + hour
    }
    let min = date.getMinutes()
    if (min < 10) {
      min = '0' + min
    }

    let sec = date.getSeconds()
    if (sec < 10) {
      sec = '0' + sec
    }
    const time = day + ' ' + month + ' ' + hour + ':' + min + ':' + sec + ' ' + year
    return time
  }

  return (
    <>
      <Table striped bordered hover className={styles.table}>
        <thead className={styles.tableHead} key='fs'>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Date</th>
            <th>Type</th>
            <th>Size</th>
            <th>IPFS Hash</th>
          </tr>
        </thead>
        {
          files.map((file, index) => (
            <tbody className={styles.tableBody} key={index}>
              <tr>
                <td className={styles.index}>{index + 1}</td>
                <td className={styles.name}>
                  <Link href={'https://ipfs.infura.io/ipfs/' + file.hash}>
                    <a className={styles.anchor}>{file.name}</a>
                  </Link>
                </td>
                {/* <td className={styles.name}>
                  <Button onClick={() => {
                    setShowPasswordModal(prevState => !prevState)
                  }}
                  >
                    {file.name}
                  </Button>
                </td> */}
                <td className={styles.date}>{timeConvertUnixStamp(file.uploadTime)}</td>
                <td className={styles.type}>{file.mimeType}</td>
                <td className={styles.size}>{formatBytes(file.size)}</td>
                <td className={styles.hash}>{file.hash}</td>
              </tr>
            </tbody>
          ))
}
      </Table>
    </>
  )
}
