import { useState } from "react"
import { Phone, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AppSidebar } from "@/components/sidebar/AppSidebar"
import { Header } from "@/components/header/Header"
import InCallScreen from "@/components/others/InCallScreen"

const contacts = [
  { name: "Nick Joushua", phone: "+941235444444", seed: "nick" },
  { name: "Haylie Workman", phone: "+94 123 4444 444", seed: "haylie" },
  { name: "Wilson Herwitz", phone: "+94 123 4444 444", seed: "wilson" },
  { name: "Kianna Dokidis", phone: "+94 123 4444 444", seed: "kianna" },
  { name: "Roger Kenter", phone: "+94 123 4444 444", seed: "roger" },
  { name: "Jaylon Herwitz", phone: "+94 123 4444 444", seed: "jaylon" },
  { name: "Jaylon Gouse", phone: "+94 123 4444 444", seed: "jaylonG" },
  { name: "James Mango", phone: "+94 123 4444 444", seed: "james" },
  { name: "Maria Geidt", phone: "+94 123 4444 444", seed: "maria" },
  { name: "Davis Geidt", phone: "+94 123 4444 444", seed: "davis" },
  { name: "Ashlynn Kenter", phone: "+94 123 4444 444", seed: "ashlynn" },
  { name: "Cheyenne Gouse", phone: "+94 123 4444 444", seed: "cheyenne" },
]

export default function DialPad() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [IS_CALLING, setIsCalling] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)

  const START_CALL = (contact) => {
    setSelectedContact(contact)
    setIsCalling(true)
  }
  
  const endCall = () => {
    setIsCalling(false)
    setPhoneNumber("")
  }

  const handleNumberClick = (num) => {
    setPhoneNumber((prev) => prev + num)
  }

  const HANDLE_BACKSPACE = () => {
    setPhoneNumber((prev) => prev.slice(0, -1))
  }

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery)
  )

  return (
    <div className="flex flex-col h-screen bg-black md:flex-row">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <Header title="Dial Pad" />

        <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
          {/* Dial Pad */}
          {IS_CALLING ? (
            <InCallScreen contact={selectedContact} onEndCall={endCall} />
          ) : (
            <div className="w-full md:w-1/2 flex items-center justify-center p-4">
              <Card className="w-full max-w-md bg-black border-gray-500 shadow-none">
                <CardContent className="p-6">
                  <div className="mb-8">
                    <Input
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="text-center text-white text-4xl sm:text-5xl bg-transparent border-0 border-b border-gray-200 dark:border-gray-800 rounded-none focus-visible:ring-0 focus-visible:border-primary"
                      placeholder="Phone number"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#", "+"].map((num) => (
                      <Button
                        key={num}
                        variant="ghost"
                        className="h-16 text-xl sm:text-2xl bg-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => handleNumberClick(num.toString())}
                      >
                        {num}
                      </Button>
                    ))}

                    <Button
                      key="x"
                      variant="ghost"
                      className="h-16 text-xl sm:text-2xl bg-red-500 text-white rounded-full hover:bg-red-600 dark:hover:bg-red-700"
                      onClick={HANDLE_BACKSPACE}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      size="icon"
                      className="h-16 w-16 rounded-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => START_CALL({ name: phoneNumber, phone: phoneNumber, seed: "unknown" })}
                    >
                      <Phone className="h-6 w-6" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Contact List */}
          <div className="w-full md:w-1/2 bg-gray-900 overflow-y-auto">
            <div className="p-4 sticky top-0 bg-gray-900 z-10">
              <div className="relative">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800 border-0 pl-4 pr-10 py-4 sm:py-6 text-white placeholder:text-gray-400"
                  placeholder="Search name or phone number"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="divide-y divide-gray-800">
              {filteredContacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 hover:bg-gray-800"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-transparent">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/personas/svg?seed=${contact.seed}`}
                      />
                      <AvatarFallback className="bg-blue-600">
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-white">{contact.name}</p>
                      <p className="text-sm text-gray-400">{contact.phone}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-blue-600/100 rounded-full"
                    onClick={() => START_CALL(contact)}
                  >
                    <Phone className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
