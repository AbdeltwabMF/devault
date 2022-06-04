import styles from './FilesList.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faDownload } from '@fortawesome/free-solid-svg-icons'

import FontAwesomeMimeTypeIcon from '../Icons/FontAwesomeMimeTypeIcon'

export default function FilesList ({ files, downloadFile }) {
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
      <table className={'table table-borderless ' + `${styles.table}`}>
        <thead className={styles.tableHead} key='fs'>
          <tr>
            <th>
              <span className={styles.headerText}>Name</span>
              <FontAwesomeIcon icon={faSort} className={styles.sortIcon} />
            </th>
            <th>
              <span className={styles.headerText}>File Size</span>
              <FontAwesomeIcon icon={faSort} className={styles.sortIcon} />
            </th>
            <th>
              <span className={styles.headerText}>Last Modified</span>
              <FontAwesomeIcon icon={faSort} className={styles.sortIcon} />
            </th>
            <th />
          </tr>
        </thead>
        {
          files && files.map((file, index) => (
            <tbody className={styles.tableBody} key={index}>
              <tr className={styles.tableRow}>
                <td className={styles.name}>
                  <FontAwesomeMimeTypeIcon mimeType={file.mimeType} />
                  <span className={styles.nameText}>{file.name}</span>
                </td>
                <td className={styles.size}>{formatBytes(file.size)}</td>
                <td className={styles.time}>{timeConvertUnixStamp(file.uploadTime)}</td>
                <td className={styles.action}>
                  <button onclick={() => {
                    downloadFile(file.hash)
                  }}
                  >
                    <span className={styles.downloadText}>Download</span>
                    <FontAwesomeIcon icon={faDownload} className={styles.downloadIcon} />
                  </button>
                </td>
              </tr>
            </tbody>
          ))
}
      </table>
    </>
  )
}

// <Link href={'https://ipfs.infura.io/ipfs/' + file.hash}>
//   <a className={styles.anchor}>{file.name}</a>
// </Link>
