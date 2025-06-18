// components/Footer.tsx
"use client"

import { FaGithub, FaLinkedin } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-[#211652] text-white py-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Rekall 🧠</h2>
          <p className="text-sm text-white/70">
            Your personal brain for the internet. Save, recall, and grow — smarter every day.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-2">Product</h3>
          <ul className="text-sm text-white/70 space-y-1">
            <li><a href="#features" className="hover:underline">Features</a></li>
            <li><a href="#benefits" className="hover:underline">Benefits</a></li>
            <li><a href="#testimonials" className="hover:underline">Testimonials</a></li>
            <li><a href="#register" className="hover:underline">Get Started</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-2">Company</h3>
          <ul className="text-sm text-white/70 space-y-1">
            <li><a href="#" onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }} className="hover:underline">About Us</a></li>
            <li><a href="#" onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }} className="hover:underline">Blog</a></li>
                    <li><a href="#" onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }} className="hover:underline">Careers</a></li>
                    <li><a href="#" onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }} className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold mb-2">Connect</h3>
          <div className="flex space-x-4 mt-2">
            <a
                href="https://x.com/DakshPuroh18319"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 mt-1"
                    viewBox="0 0 1200 1227"
                    fill="currentColor"
                >
                    <path d="M1199.8 0H998.9L600 518.8L201.1 0H0l489.4 637.1L0 1227h200.9l399.1-530.3L999.1 1227H1200L709.2 586.3 1199.8 0z" />
                </svg>
                </a>
            <a href="https://github.com/dakshu04" target="_blank" rel="noopener noreferrer">
              <FaGithub className="w-5 h-5 text-white/70 hover:text-white transition" />
            </a>
            <a href="https://www.linkedin.com/in/purohitdaksh/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="w-5 h-5 text-white/70 hover:text-white transition" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-white/50 mt-12">
        © {new Date().getFullYear()} Rekall. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
