import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileAlt,
  faFileCode,
  faFileExcel,
  faFilePdf,
  faFilePowerpoint,
  faFileVideo,
  faFileWord,
  faFileImage,
  faFileAudio,
  faFileArchive
} from '@fortawesome/free-solid-svg-icons'

import styles from './fontAwesomeMimeTypeIcon.module.css'

export default function fontAwesomeMimeTypeIcon ({ mimeType }) {
  if (!mimeType) {
    return <FontAwesomeIcon icon={faFileAlt} className={styles.iconMime} size='2x' />
  }

  if (mimeType.includes('image/')) {
    return <FontAwesomeIcon icon={faFileImage} className={styles.iconMime} size='2x' />
  } else if (mimeType.includes('video/')) {
    return <FontAwesomeIcon icon={faFileVideo} className={styles.iconMime} size='2x' />
  } else if (mimeType.includes('audio/')) {
    return <FontAwesomeIcon icon={faFileAudio} className={styles.iconMime} size='2x' />
  } else if (mimeType.includes('text/')) {
    if (mimeType.includes('plain')) {
      return <FontAwesomeIcon icon={faFileAlt} className={styles.iconMime} size='2x' />
    } else {
      return <FontAwesomeIcon icon={faFileCode} className={styles.iconMime} size='2x' />
    }
  }

  switch (mimeType) {
    case 'application/pdf':
      return <FontAwesomeIcon icon={faFilePdf} className={styles.iconMime} size='2x' />
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return <FontAwesomeIcon icon={faFileWord} className={styles.iconMime} size='2x' />
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return <FontAwesomeIcon icon={faFileExcel} className={styles.iconMime} size='2x' />
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return <FontAwesomeIcon icon={faFilePowerpoint} className={styles.iconMime} size='2x' />
    case 'application/zip':
      return <FontAwesomeIcon icon={faFileArchive} className={styles.iconMime} size='2x' />
    case 'application/x-7z-compressed':
      return <FontAwesomeIcon icon={faFileArchive} className={styles.iconMime} size='2x' />
    case 'application/x-zip-compressed':
      return <FontAwesomeIcon icon={faFileArchive} className={styles.iconMime} size='2x' />
    case 'application/x-bzip2':
      return <FontAwesomeIcon icon={faFileArchive} className={styles.iconMime} size='2x' />
    case 'application/x-gzip':
      return <FontAwesomeIcon icon={faFileArchive} className={styles.iconMime} size='2x' />
    case 'application/x-tar':
      return <FontAwesomeIcon icon={faFileArchive} className={styles.iconMime} size='2x' />
    case 'application/x-xz':
      return <FontAwesomeIcon icon={faFileArchive} className={styles.iconMime} size='2x' />
    case 'application/x-zip':
      return <FontAwesomeIcon icon={faFileArchive} className={styles.iconMime} size='2x' />
    case 'application/msword':
      return <FontAwesomeIcon icon={faFileWord} className={styles.iconMime} size='2x' />
    case 'application/vnd.oasis.opendocument.text':
      return <FontAwesomeIcon icon={faFileWord} className={styles.iconMime} size='2x' />
    case 'application/vnd.oasis.opendocument.spreadsheet':
      return <FontAwesomeIcon icon={faFileExcel} className={styles.iconMime} size='2x' />
    case 'application/vnd.oasis.opendocument.presentation':
      return <FontAwesomeIcon icon={faFilePowerpoint} className={styles.iconMime} size='2x' />
    case 'application/vnd.oasis.opendocument.graphics':
      return <FontAwesomeIcon icon={faFileImage} className={styles.iconMime} size='2x' />
    default:
      return <FontAwesomeIcon icon={faFileAlt} className={styles.iconMime} size='2x' />
  }
}
// List of official MIME Types: http://www.iana.org/assignments/media-types/media-types.xhtml
