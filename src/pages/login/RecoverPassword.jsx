import { Phone } from 'lucide-react'
import { FaRegEnvelope } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card"
import { Link } from 'react-router-dom';
import RecoverPassword from '../../assets/recover-password.png'

export default function RecoverPasswordPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-xl">Sale.com</span>
          </div>
          <Link to="/signup">
            <Button
              variant="primary"
              className="border text-white hover:bg-gray-700 border-white"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 space-y-6">
        {/* Image at the top */}
        <img src={RecoverPassword} alt="Recover Password"  />
        
        {/* Card below the image */}
        <Card className="w-full max-w-md bg-black border-none">
          <CardHeader className="text-center space-y-1 pb-2">
            <CardDescription className="text-white text-3xl font-bold">
              Enter Your email to recover your password
            </CardDescription>
            <CardDescription className="text-white">
              Enter your details to proceed further
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-6">
              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-sm text-gray-400 block">Email</label>
                <div className="relative">
                  <Input 
                    type="email" 
                    placeholder="abcd@gmail.com"
                    className="bg-transparent border-b border-t-0 border-x-0 rounded-none focus-visible:ring-0 focus-visible:border-blue-500 pl-0 text-white"
                  />
                  <div className="absolute right-2 top-2 text-gray-500">
                    <FaRegEnvelope/>
                  </div>
                </div>
              </div>

              {/* Recover Button */}
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Recover
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
