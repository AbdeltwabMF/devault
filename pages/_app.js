import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from '../components/Layouts/Layout'
import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css'

function DeVa ({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default DeVa
