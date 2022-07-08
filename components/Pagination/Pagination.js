import styles from './Pagination.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'

import { PagingContext } from '../../pages/vault'

export default function Pagination () {
  const { currentPage, setCurrentPage, setLastIndex, setFirstIndex, totalPages, pageSize } = useContext(PagingContext)

  const nextPageHandler = () => {
    console.log('next page')
    if (currentPage < totalPages) {
      setCurrentPage(currentPage => currentPage + 1)
      setFirstIndex(firstIndex => firstIndex + pageSize)
      setLastIndex(lastIndex => lastIndex + pageSize)
    }
  }

  const prevPageHandler = () => {
    console.log('prev page')
    if (currentPage > 1) {
      setCurrentPage(currentPage => currentPage - 1)
      setFirstIndex(firstIndex => firstIndex - pageSize)
      setLastIndex(lastIndex => lastIndex - pageSize)
    }
  }

  return (
    <div className={styles.main}>
      <button className={styles.button} onClick={prevPageHandler}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className={styles.icon}
        />
        <span className={styles.prev}>Prev</span>
      </button>
      <span className={styles.ratio}>
        {currentPage} of {totalPages}
      </span>
      <button className={styles.button} onClick={nextPageHandler}>
        <span className={styles.next}>Next</span>
        <FontAwesomeIcon
          icon={faChevronRight}
          className={styles.icon}
        />
      </button>
    </div>
  )
}
