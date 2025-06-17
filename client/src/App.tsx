import { Toaster } from "sonner"
import "./App.css"
import Header from "./components/layout/Header"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterForm from "./components/RegisterForm"
import Hero from "./components/sections/Hero"
import { LogIn } from "lucide-react"
import { AuthProvider } from "./context/AuthContext"


function App() {
  return (
    <BrowserRouter>
     <AuthProvider>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<RegisterForm closeDialog={function (): void {
          throw new Error("Function not implemented.")
        } } />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
