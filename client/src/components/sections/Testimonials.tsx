"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"

const testimonials = [
  {
    name: "Arjun Mehta",
    position: "Tech Founder",
    quote: "Rekall is the best knowledge tool I’ve used. It’s beautiful and efficient.",
    image: "https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-6.jpg",
  },
  {
    name: "Sanya Kapoor",
    position: "Product Designer",
    quote: "I save Twitter threads and YouTube videos with Rekall every day. Love the UI!",
    image: "https://cdn.prod.website-files.com/624ac40503a527cf47af4192/654b536c8c46e155141a426d_ai-face-generator-how.png",
  },
  {
    name: "Ravi Verma",
    position: "EdTech Creator",
    quote: "Makes learning smooth. I finally found a tool that fits my habit.",
    image: "https://static.vecteezy.com/system/resources/thumbnails/047/462/735/small_2x/positive-man-on-clean-background-photo.jpg",
  },
  {
    name: "Tina Shah",
    position: "Startup Operator",
    quote: "Rekall is faster than Notion and prettier too!",
    image: "https://cdn.cgdream.ai/_next/image?url=https%3A%2F%2Fapi.cgdream.ai%2Frails%2Factive_storage%2Fblobs%2Fredirect%2FeyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMm53ZHc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ%3D%3D--878658de88111a0a12ea28e39885a77502ab8184%2F40f19be0-1ab7-4d2b-be76-be710ce28bf3_0.png&w=1080&q=95",
  },
]

export const Testimonials = () => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 60,
        ease: "linear",
        repeat: Infinity,
      },
    })
  }, [controls])

  return (
    <section className="relative overflow-hidden py-24 bg-[#211652] text-white">
      <h2 className="text-3xl font-bold text-center mb-16">
        Loved by Learners & Creators
      </h2>

      {/* Fade gradient overlays */}
      <div className="absolute left-0 top-0 w-1/5 h-full bg-gradient-to-r from-[#211652] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-1/5 h-full bg-gradient-to-l from-[#211652] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex w-max gap-8 px-4 md:px-12"
        animate={controls}
      >
        {[...testimonials, ...testimonials].map((t, i) => (
          <motion.div
            key={i}
            className="relative w-[320px] shrink-0 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-xl"
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.015, 1],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <div className="flex items-center gap-4 mb-3">
              <img
                src={t.image}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover border border-white/20"
              />
              <div>
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-sm text-white/60">{t.position}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/80">“{t.quote}”</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
