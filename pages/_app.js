import 'bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css'
import '../styles/globals.css'

import * as React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'

import Layout from '../components/Layouts/Layout'
import theme from '../themes/dark'
import createEmotionCache from '../src/createEmotionCache'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function DeVa (props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (

    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default DeVa

DeVa.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired
}
