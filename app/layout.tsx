import type { Metadata } from 'next'
//import { Inter } from 'next/font/google'
import './css/globals.css'
// import Head from 'next/head'
import Nav from './components/navigation/Nav'

//const inter = Inter({ subsets: ['latin'], display: 'swap'})

const ViewportLayout = {

}

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

    <html lang="en">
      {/* <body className={inter.className}>{children}</body> */}
      <body>
      <h1 id='main_title'>Quote App</h1>
      <Nav/>
      {children}</body>
    </html>
    </>
  )
}
