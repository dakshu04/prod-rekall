
import { useState } from "react"
import { Header } from "./layout/Header"
import {Features} from "./sections/Features"
import Footer from "./sections/Footer"
import { Hero } from "./sections/Hero"
import { HowRekallWorks } from "./sections/HowRekallWorks"
import { Testimonials } from "./sections/Testimonials"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import RegisterForm from "./RegisterForm"
export const Home = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

  return (
    <>
      <Header  onRegisterClick={() => setIsRegisterOpen(true)} />
      <Hero  onRegisterClick={() => setIsRegisterOpen(true)} />
      <Features />
      <HowRekallWorks />
      <Testimonials />
      <Footer />

      {/* Shared Register Modal */}
      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogContent className="text-black">
          <DialogHeader>
            <DialogTitle>Create Your Account</DialogTitle>
          </DialogHeader>
          <RegisterForm onSuccess={() => setIsRegisterOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  )
}

