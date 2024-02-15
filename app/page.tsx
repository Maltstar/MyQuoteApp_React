import Image from 'next/image'
import App from './components/main/App'
import Instructions from './components/how_to/Instructions'

export default function Home() {
  return (
    <>
      <Instructions/>
      <App/>
    </>

  )
}
