import { motion } from "framer-motion"

// Two sets of company names: one for the top row, one for the bottom row
const companiesTop = ["Notion", "Google", "YouTube", "Slack", "Figma", "Dropbox", "Amazon", "Twitter", "Linear", "Spotify"]
const companiesBottom = ["Dropbox", "Amazon", "Twitter", "Linear", "Spotify", "Notion", "Google", "YouTube", "Slack", "Figma", "Dropbox"]

const LogoMarquee = () => {
  return (
    <div className="relative overflow-hidden pt-30 w-full flex flex-col gap-6 items-center">
      
      {/* ---------- Top Row (Scrolls left to right) ---------- */}
      <div className="w-[30%] relative mask-fade">
        <motion.div
          className="flex gap-12 whitespace-nowrap text-white text-lg font-medium"
          // Animate x-axis from -30% to 30% continuously to simulate floating scroll
          animate={{ x: ["-30%", "30%"] }}
          transition={{
            repeat: Infinity,      // Loop the animation
            duration: 20,          // Control the speed
            ease: "linear",        // Smooth, constant motion
          }}
        >
          {/* Duplicate the array to ensure a continuous loop */}
          {companiesTop.concat(companiesTop).map((name, i) => (
            <span
              key={i}
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ---------- Bottom Row (Scrolls right to left) ---------- */}
      <div className="w-[30%] relative mask-fade">
        <motion.div
          className="flex gap-12 whitespace-nowrap text-white text-lg font-medium"
          // Animate in opposite direction (right to left)
          animate={{ x: ["30%", "-30%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {/* Duplicate this row too for continuous scroll */}
          {companiesBottom.concat(companiesBottom).map((name, i) => (
            <span
              key={i}
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default LogoMarquee
