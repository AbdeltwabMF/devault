import { useEffect } from 'react'
import { useRouter } from 'next/router'

import Error404 from '../components/AssistantPages/Error404'
import styles from '../styles/Page404.module.css'

export default function Page404 () {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 60000)
  })

  return (
    <>
      <div className={styles.main}>
        <Error404 />
      </div>
    </>
  )
}
