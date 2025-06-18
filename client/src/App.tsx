
import './App.css'
import './index.css'
import { Header } from './components/layout/Header'
import { Home } from './components/Home'
import { Toaster } from 'sonner'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Toaster richColors position="top-right" />
      <div>
        <Header />
        <Home />
      </div>
    </>
  )
}

export default App
