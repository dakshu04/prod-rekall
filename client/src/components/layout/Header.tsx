import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import RegisterForm from "../RegisterForm"
import LoginForm from "../LoginForm"
import { useAuth } from "@/context/AuthContext"
import { Link } from "react-router-dom"

const Header = () => {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<"login" | "register">("login")

  const { isAuthenticated, logout } = useAuth()
  const closeDialog = () => setOpen(false)

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl 
      bg-white/20 dark:bg-white/10 backdrop-blur-xl 
      border-white/30 dark:border-white/20 
      px-6 py-3 rounded-full flex items-center justify-between 
      shadow-lg z-50 transition-all duration-300"
    >
      {/* Logo */}
      <div className="font-semibold text-2xl text-white">Rekall 🧠</div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">
              <Button className="text-sm px-4 py-2">Profile</Button>
            </Link>
            <Button variant="outline" onClick={logout} className="text-sm px-4 py-2">
              Logout
            </Button>
          </>
        ) : (
          <Dialog open={open} onOpenChange={setOpen}>
            {/* Login Button */}
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                onClick={() => {
                  setMode("login")
                  setOpen(true)
                }}
                className="text-sm px-4 py-2"
              >
                Login
              </Button>
            </DialogTrigger>

            {/* Register Button */}
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setMode("register")
                  setOpen(true)
                }}
                className="text-sm px-4 py-2"
              >
                Register
              </Button>
            </DialogTrigger>

            {/* Modal Dialog */}
            <DialogContent className="sm:max-w-[425px] bg-white text-black">
              <DialogHeader>
                <DialogTitle className="text-xl">
                  {mode === "login" ? "Login to Rekall" : "Create Your Account"}
                </DialogTitle>
              </DialogHeader>

              {mode === "login" ? (
                <LoginForm closeDialog={closeDialog} />
              ) : (
                <RegisterForm closeDialog={closeDialog} />
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </header>
  )
}

export default Header
