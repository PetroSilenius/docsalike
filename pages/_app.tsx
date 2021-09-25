import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'
import '../styles.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Docsalike - A Google Docs clone</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
        <meta name="theme-color" content="#60a5fa" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
