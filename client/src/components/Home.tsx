
import { Header } from "./layout/Header"
import {Features} from "./sections/Features"
import Footer from "./sections/Footer"
import { Hero } from "./sections/Hero"
import { HowRekallWorks } from "./sections/HowRekallWorks"
import { Testimonials } from "./sections/Testimonials"

export const Home = () => {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Hero />
      <Features />
      <HowRekallWorks />
      <Testimonials />
      <Footer />
    </>
  )
}

