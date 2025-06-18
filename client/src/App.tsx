
import './App.css'
import './index.css'
import { Home } from './components/Home'
import { Toaster } from 'sonner'

function App() {

  return (
    <>
      <Toaster richColors position="top-center" />
      <div>
        <Home />
      </div>
    </>
  )
}

export default App
