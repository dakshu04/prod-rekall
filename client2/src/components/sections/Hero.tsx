import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import LogoMarquee from "./LogoMarquee"

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center pt-30 px-4">
      <motion.h1
        className="text-xl sm:text-xl md:text-6xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Capture Ideas Instantly,<br />Access Knowledge Seamlessly
      </motion.h1>

      <motion.p
        className="text-white/80 max-w-2xl text-base sm:text-lg mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Build your digital second brain to manage notes, bookmarks, tasks, and ideas —
        all in one place. Stay organized, focused, and in flow.
      </motion.p>

      <motion.div
        className="flex flex-wrap items-center gap-4 justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Button className="text-base px-6 py-3">Start Building Your Brain 🧠</Button>
        <Button variant="secondary" className="text-base px-6 py-3">Explore a Live Demo</Button>
      </motion.div>

      <LogoMarquee />
    </section>
    
  )
}

export default Hero
