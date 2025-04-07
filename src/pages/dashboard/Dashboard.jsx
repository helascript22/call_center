
import { Tag, Calendar, Download, Clock, ArrowUpRight, ArrowDownLeft, MoreVertical, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Header } from "@/components/header/Header"
import { AppSidebar } from "@/components/sidebar/AppSidebar"
import CallManagementChart from "@/components/others/CallManagementChart "

export default function Dashboard() { 
  return (
    <>
     <div className="flex h-screen bg-black">
        <AppSidebar />
      <div className="flex-1 flex flex-col">
        <Header title="Dashboard" />
      <main className="flex-1 overflow-auto p-6">
        {/* Filters */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="text-sm text-white">Filter by:</span>

            <Select>
              <SelectTrigger className="w-[180px] bg-transparent border-gray-500">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <SelectValue placeholder="Tag" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                <SelectItem value="important">Important</SelectItem>
                <SelectItem value="follow-up">Follow Up</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="border-gray-500 bg-transparent text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              Date
            </Button>
          </div>

          <Button variant="outline" className="border-gray-500 bg-transparent text-gray-500">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Call Management Chart */}
          <Card className="col-span-2 bg-gray-900 border-gray-800">
            <CardHeader className="text-white">
                <CardTitle>Call management</CardTitle>
            </CardHeader>
            <CallManagementChart/>
            </Card>

          {/* Overview */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                    <span className="text-white">Total calls</span>
                  </div>
                  <span className="text-2xl font-bold text-white">60</span>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded">
                      <ArrowDownLeft className="h-5 w-5" />
                    </div>
                    <span className="text-white">Missed calls</span>
                  </div>
                  <span className="text-2xl font-bold text-white">60</span>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-white" />
                      <span className="text-xl text-white ml-2">20s</span>
                    </div>
                    <p className="text-xs text-white">Avg. call duration</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-white" />
                      <span className="text-xl text-white ml-2">10s</span>
                    </div>
                    <p className="text-xs text-white">Avg. waiting time</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call History */}
        <Card className="mt-6 bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-gray-300">Call history</CardTitle>
            <Pagination>
              <PaginationContent>
                <PaginationItem className="text-gray-500 ">
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <span className="text-sm text-gray-500">1 of 10</span>
                </PaginationItem>
                <PaginationItem className="text-gray-500">
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-transparent">
                  <TableHead className="text-gray-400">Type</TableHead>
                  <TableHead className="text-gray-400">Contact</TableHead>
                  <TableHead className="text-gray-400">Notes</TableHead>
                  <TableHead className="text-gray-400">Date</TableHead>
                  <TableHead className="text-gray-400 w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { type: "outgoing", name: "Nick Joushua", hasNotes: true },
                  { type: "inbound", name: "Nick Joushua", hasNotes: false },
                  { type: "outgoing", name: "Nick Joushua", hasNotes: true },
                  { type: "inbound", name: "Nick Joushua", hasNotes: false },
                ].map((call, i) => (
                  <TableRow key={i} className="border-gray-800">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-2 rounded-full ${call.type === "outgoing" ? "bg-teal-500/50" : "bg-blue-500/50"}`}
                        >
                          {call.type === "outgoing" ? (
                            <ArrowUpRight
                              className={`h-4 w-4 ${call.type === "outgoing" ? "text-teal-500" : "text-blue-500"}`}
                            />
                          ) : (
                            <ArrowDownLeft
                              className={`h-4 w-4 ${call.type === "outgoing" ? "text-teal-500" : "text-blue-500"}`}
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-white">{call.type === "outgoing" ? "Outgoing call" : "Inbound call"}</p>
                          <p className="text-xs text-white">00 : 00 : 00</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${i}`} />
                          <AvatarFallback className="bg-orange-500">NJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white">{call.name}</p>
                          <p className="text-xs text-white">+94 123 4444 444</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" className="text-white hover:bg-transparent">
                        <ClipboardList className="h-4 w-4 mr-2" />
                        {call.hasNotes ? "View" : "No Notes"}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-white">March 27,2025</p>
                        <p className="text-xs text-white">6 : 30 am</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-transparent">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      </div>
    </div>
    </>
  )
}

