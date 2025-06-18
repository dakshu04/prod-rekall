import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "../ui/button"
import RegisterForm from "../RegisterForm"
import { LoginForm } from "../LoginForm";

export const Header = () => {
    return (
        <>
            <div className="fixed top-6 inset-x-0 mx-auto w-[90%] max-w-5xl 
                bg-white/20 dark:bg-white/10 backdrop-blur-xl 
                border-white/30 dark:border-white/20 
                px-6 py-3 rounded-full flex items-center justify-between 
                shadow-lg z-50 transition-all duration-300">
                <div className="text-xl text-white font-bold">Recall  🧠</div>
                <div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={"secondary"} className="mr-3 cursor-pointer shadow-lg rounded-4xl text-black">Login</Button>
                    </DialogTrigger>
                    <DialogContent className="text-black">
                        <DialogHeader>
                            <DialogTitle>
                                Welcome Back
                            </DialogTitle>
                        </DialogHeader>
                        <LoginForm />
                    </DialogContent>
                </Dialog>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={"default"} className="hover:bg-gray-800 rounded-4xl cursor-pointer">Register</Button>
                        </DialogTrigger>
                        <DialogContent className="text-black">
                            <DialogHeader>
                                <DialogTitle>
                                    Create Your Account
                                </DialogTitle>
                            </DialogHeader>
                            <RegisterForm />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </>
    )
}