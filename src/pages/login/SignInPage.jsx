import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"
import { Phone } from "lucide-react"
import { FaGoogle, FaTwitter, FaRegEnvelope } from "react-icons/fa"
import { RiFacebookLine } from "react-icons/ri"
import { IoLockClosedOutline } from "react-icons/io5"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:3001/user/login", { email, password })

      const token = res.data?.user?.token || res.data?.token
      const isActivate = res.data?.user?.user?.isActivate
      const userId = res.data?.user?.user?.id;

      Cookies.set("token", token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      })

      if (isActivate) {
        toast({
          title: "Login successful",
          description: "Redirecting to dashboard...",
          variant: "success",
        })
        navigate("/dashboard")
      } else {
        toast({
          title: "Account deactivated",
          description: "Your account is deactivated. Redirecting to recovery page.",
          variant: "destructive",
        })
        setTimeout(() => {
          navigate("/change-password", { state: { userId } });
        }, 2000)
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
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
                  <Checkbox id="remember" className="rounded-full data-[state=checked]:bg-blue-600 border-gray-600" />
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

              <div className="flex items-center gap-2">
                <Separator className="flex-1 bg-gray-700" />
                <span className="text-gray-500 text-sm">Or</span>
                <Separator className="flex-1 bg-gray-700" />
              </div>

              <div className="space-y-3">
                <Button
                  variant="primary"
                  className="w-full border border-white hover:bg-gray-800 text-white justify-start flex items-center gap-2 px-4 py-2"
                >
                  <span className="border-r border-white pr-2 flex items-center">
                    <FaGoogle />
                  </span>
                  <span>Sign In with Google</span>
                </Button>

                <Button
                  variant="primary"
                  className="w-full border border-white hover:bg-gray-800 text-white justify-start flex items-center gap-2 px-4 py-2"
                >
                  <span className="border-r border-white pr-2 flex items-center">
                    <RiFacebookLine />
                  </span>
                  <span>Sign In with Facebook</span>
                </Button>

                <Button
                  variant="primary"
                  className="w-full border border-white hover:bg-gray-800 text-white justify-start flex items-center gap-2 px-4 py-2"
                >
                  <span className="border-r border-white pr-2 flex items-center">
                    <FaTwitter />
                  </span>
                  <span>Sign In with Twitter</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
