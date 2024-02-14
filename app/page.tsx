import Image from 'next/image'
import App from './components/main/App'
import Head from 'next/head'
import Form from './components/UI_menu/Form'

export default function Home() {
  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
      <App/>
    </>

  )
}
