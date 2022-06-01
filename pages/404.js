import { useEffect } from 'react'
import { useRouter } from 'next/router'

import Error404 from '../components/Errors/Error404'
import BGParticles from '../components/Animation/BGParticles'

import styles from '../styles/Page404.module.css'

export default function Page404 () {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 10000)
  }, [])

  return (
    <>
      <Error404 />
      <BGParticles />
    </>
  )
}
