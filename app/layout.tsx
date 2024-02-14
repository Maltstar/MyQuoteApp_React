import type { Metadata } from 'next'
//import { Inter } from 'next/font/google'
import './css/globals.css'
import Head from 'next/head'

//const inter = Inter({ subsets: ['latin'], display: 'swap'})

export const metadata: Metadata = {
  title: 'My Quote App',
  description: 'A web app to read and write quote on the blockchain mainnet Goerli Test network.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <Head>
      <title>My Quote App</title>
        <meta name="description" content="A simple web app to read and write quote on the blockchain mainnet Goerli Test network."/>   
        <meta name="charset" content="UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>


  </Head>
    <html lang="en">
      {/* <body className={inter.className}>{children}</body> */}
      <body>{children}</body>
    </html>
    </>
  )
}
