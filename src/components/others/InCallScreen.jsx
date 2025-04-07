import { MicOff, Pause, Volume2, UserPlus, Grid3X3, StickyNote, PhoneOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useState, useEffect } from "react"

export default function InCallScreen({ contact, onEndCall }) {
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setTimer((prev) => prev + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60).toString().padStart(2, "0")
    const seconds = (sec % 60).toString().padStart(2, "0")
    return `${minutes}:${seconds}`
  }

  return (
    <div className="flex flex-col w-full md:w-1/2  items-center justify-between bg-black p-6 text-white border-2 border-gray-600 rounded-xl">
      <div className="flex flex-col items-center border-b-2 border-gray-600 pb-4 mb-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${contact.seed}`} />
          <AvatarFallback>{contact.name[0]}</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-semibold">{contact.name}</h2>
        <p className="text-gray-400">{timer === 0 ? "Calling" : formatTime(timer)}</p>
      </div>

      {/* Ring Animation */}
      <div className="relative border-2 border-blue-400 p-2 rounded-full mb-6">
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-black text-2xl font-bold ring-2 ring-blue-400 ring-offset-2">
          {formatTime(timer)}
        </div>
      </div>

      {/* Call Action Buttons */}
      <div className="grid grid-cols-3 gap-6 bg-[#1e1e1e] p-6 rounded-xl border-2 border-gray-600">
        <Action icon={<MicOff />} label="Mute" />
        <Action icon={<Pause />} label="Hold" />
        <Action icon={<Volume2 />} label="Speaker" />
        <Action icon={<UserPlus className="text-red-500" />} label="Invite" />
        <Action icon={<Grid3X3 />} label="Keypad" />
        <Action icon={<StickyNote />} label="Note" />
        {/* End Call */}
        <Button
          size="icon"
          className="bg-red-600 hover:bg-red-700 rounded-full p-2 border-2 border-gray-600"
          onClick={onEndCall}>
          <PhoneOff className="text-white w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}

function Action({ icon, label }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="bg-[#2a2a2a] p-4 rounded-full border-2 border-gray-600">{icon}</div>
      <span className="text-sm text-white">{label}</span>
    </div>
  )
}
