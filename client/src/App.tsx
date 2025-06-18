
import './App.css'
import './index.css'
import { Header } from './components/layout/Header'
import { Home } from './components/Home'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-[#211652] min-h-screen'>
        <Header />
        <Home />
      </div>
    </>
  )
}

export default App
