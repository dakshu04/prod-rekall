import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const RegisterForm = () => {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <Input id="username" placeholder="Enter your name" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <Input id="password" type="password" placeholder="••••••••" />
      </div>
      <Button type="submit" className="w-full">Register</Button>
    </form>
  )
}

export default RegisterForm
