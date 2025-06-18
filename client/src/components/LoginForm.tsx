import { Button } from "./ui/button"
import { Input } from "./ui/input"

export const LoginForm = () => {
    return (
        <>
            <form className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm text-gray-700 font-medium ">Email</label>
                    <Input type="email" placeholder="you@example.com"/>
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Enter Your Password</label>
                    <Input type="password" placeholder="*******"/>
                </div>
                <Button type="submit" className="w-full">Login</Button>
            </form>
        </>
    )
}