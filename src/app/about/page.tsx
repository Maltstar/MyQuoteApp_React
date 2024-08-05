import About from '../components/how_to/About'
import AppHeader from '../layout/AppHeader'

export default function Home() {
    return (
      <main >
           <AppHeader instructions={false}/>
           <About/>
      </main>)
  }