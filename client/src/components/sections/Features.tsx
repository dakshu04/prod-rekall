'use client'

import { motion } from "framer-motion"

const benefits = [
  {
    title: "⚡ Fast & Seamless",
    description: "Save a link in seconds — no clutter, no setup. Just drop and go. Speed you’ll actually feel.",
  },
  {
    title: "🧠 Built for Your Mind",
    description: "Organize your saved content by topic, tags, or source — tailored for how you think and recall.",
  },
  {
    title: "🔐 Private by Default",
    description: "Rekall keeps your data safe. No ads, no tracking. Your saved content is yours — always.",
  },
  {
    title: "📱 Works Everywhere",
    description: "Mobile-first design means your saved threads and videos are just a tap away — anytime, anywhere.",
  },
  {
    title: "🎯 Built for Creators",
    description: "Stay focused, research smarter, and revisit goldmine content while building your next big thing.",
  },
  {
    title: "💾 Save Once. Recall Forever.",
    description: "No more searching through DMs or tweets — Rekall gives you instant access to what you saved, forever.",
  },
]

export const Features = () => {

  return (
    <section className="w-full py-20 px-4 md:px-8 bg-transparent relative z-10">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
        >
        Why Rekall?
        </motion.h2>
        <motion.p
            className="text-white/80 text-lg max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            Rekall isn't just another bookmarking tool — it's your second brain. Save and recall the most valuable content from Twitter and YouTube, effortlessly.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              className="p-6 rounded-2xl border border-white/10 bg-white/20 backdrop-blur-xl shadow-xl hover:shadow-2xl text-foreground transition-shadow duration-200"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true, amount: 0.3}}
              transition={{ duration: 0.4 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-white/80">{benefit.title}</h3>
              <p className="text-base  text-white/50">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        </div>
    </section>
    )
}
