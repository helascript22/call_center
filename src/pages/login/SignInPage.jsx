import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"
import { Phone } from "lucide-react"
import { FaRegEnvelope } from "react-icons/fa"
import { IoLockClosedOutline } from "react-icons/io5"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:3001/user/login", { email, password })
  
      const token = res?.data?.user?.token || res?.data?.token
      const isActivate = res?.data?.user?.user?.isActivate
      const state = res?.data?.user?.user?.state
      const userId = res?.data?.user?.user?.id
  
      if (!state) {
        toast.error("Login failed. Your account is not allowed to sign in.")
        return
      }
  
      if (!isActivate) {
        Cookies.set("token", token, {
          expires: rememberMe ? 7 : 1 / 24,
          secure: true,
          sameSite: "strict",
        })
        toast.success("Login successful. Redirecting to dashboard...")
        navigate("/dashboard")
      } else {
        toast.info("Please change your password before accessing the dashboard.")
        setTimeout(() => {
          navigate("/change-password", { state: { userId } })
        }, 2000)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Something went wrong.")
    }
  }
  

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <ToastContainer position="bottom-left" autoClose={3000} />
      
      <header className="border-b border-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-xl">Sale.com</span>
          </div>
          <Link to="/signup">
            <Button variant="primary" className="border text-white hover:bg-gray-700 border-white">
              Sign Up
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-black border-none">
          <CardHeader className="text-center space-y-1 pb-2">
            <CardTitle className="text-2xl font-bold text-white">Welcome to Zegocloud</CardTitle>
            <CardTitle className="text-2xl font-bold text-white">Sign In to get started</CardTitle>
            <CardDescription className="text-white">Enter your details to proceed further</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-1">
                <label className="text-sm text-gray-400 block">Email</label>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="abcd@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent border-b border-t-0 border-x-0 rounded-none focus-visible:ring-0 focus-visible:border-blue-500 pl-0 text-white"
                  />
                  <div className="absolute right-2 top-2 text-gray-500">
                    <FaRegEnvelope />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-400 block">Password</label>
                <div className="relative">
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent border-b border-t-0 border-x-0 rounded-none focus-visible:ring-0 focus-visible:border-blue-500 pl-0 text-white"
                    placeholder="............"
                  />
                  <div className="absolute right-2 top-2 text-gray-500">
                    <IoLockClosedOutline />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked)}
                    className="rounded-full data-[state=checked]:bg-blue-600 border-gray-600"
                  />
                  <label htmlFor="remember" className="text-sm">
                    Remember me
                  </label>
                </div>
                <Link to="/recover-password" className="text-blue-500 hover:underline">
                  Recover Password
                </Link>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
