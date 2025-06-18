import { Button } from "../ui/button"
import { motion } from "framer-motion"

export const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 px-4 flex flex-col items-center justify-center text-center text-white overflow-hidden">
      
      {/* Gradient Glow Background */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-purple-700 opacity-20 blur-3xl rounded-full pointer-events-none z-0" />

      {/* Hero Content */}
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Capture Ideas Instantly,
        
      </motion.h1>
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-snug tracking-tight z-10"
        initial={{ opacity: 0, y: 45 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Access Knowledge Seamlessly
      </motion.h1>

      <motion.p
        className="text-white/80 max-w-2xl text-base sm:text-lg mb-8 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
      >
        Build your digital second brain to manage notes, bookmarks, tasks, and ideas —
        all in one place. Stay organized, focused, and in flow.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-wrap items-center gap-4 justify-center z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Button className="text-base px-6 py-3">
          Start Building Your Brain 🧠
        </Button>
        <Button variant="secondary" className="text-base px-6 py-3">
          Explore a Live Demo
        </Button>
      </motion.div>

      {/* Feature Grid */}
      <motion.div
        className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-white/80 max-w-6xl w-full px-4 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {[
          { icon: "📝", title: "Notes", desc: "Capture thoughts instantly with rich formatting." },
          { icon: "🔖", title: "Bookmarks", desc: "Save and revisit links, articles, and videos." },
          { icon: "📋", title: "Tasks", desc: "Stay productive with your daily to-do lists." },
          { icon: "🔍", title: "Search", desc: "Quickly find anything in your brain vault." },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/5 hover:bg-white/10 transition border border-white/10 p-5 rounded-2xl text-center shadow-sm"
          >
            <p className="text-xl mb-2">{item.icon}</p>
            <p className="text-lg font-semibold mb-1">{item.title}</p>
            <p className="text-sm text-white/70">{item.desc}</p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
