// https://vincentgarreau.com/particles.js/#default

import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import particlesConfig from '../config/particles.config'
import styles from '../styles/404.module.css'

const Error404 = () => {
  const particlesInit = async (main) => {
    console.log(main)

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main)
  }

  const particlesLoaded = (container) => {
    console.log(container)
  }
  return (
    <>
      <Particles
        id='tsparticles'
        init={particlesInit}
        loaded={particlesLoaded}
        params={particlesConfig}
      />
      <div className={`${styles.container}`}>
        <h1 className={`${styles.title}`}>404</h1>
        <p className={`${styles.message}`}>The server can not find the requested page.</p>
      </div>
    </>
  )
}

export default Error404
