import { motion } from "framer-motion"
import { Sparkles, Bookmark, Tags, Share } from "lucide-react"

const steps = [
  {
    title: "Save in One Click",
    description: "Add Twitter threads or YouTube links instantly.",
    icon: <Bookmark size={28} />,
  },
  {
    title: "Smart Tagging",
    description: "Organize content by tags, topics, or type.",
    icon: <Tags size={28} />,
  },
  {
    title: "Access Anytime",
    description: "View your saved gems anytime, anywhere.",
    icon: <Sparkles size={28} />,
  },
  {
    title: "Share with Friends",
    description: "Generate shareable links for your notes.",
    icon: <Share size={28} />,
  },
]

export const HowRekallWorks = () => {
  return (
    <section className="w-full py-24 px-4 md:px-8 bg-[#211652]">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          How Rekall Works
        </motion.h2>
        <motion.p
          className="text-white/80 text-lg max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Simple, intuitive, and powerful — Rekall is your second brain in three easy steps.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="p-6 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl text-white shadow-md"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="mb-4  text-white/50">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className=" text-white/50">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
