import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@components/layout'
import { ThemeProvider } from '@mui/material'
import theme from '@src/lib/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout> 
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
