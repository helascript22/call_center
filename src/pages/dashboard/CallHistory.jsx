"use client"

import {
  ArrowUpRight,
  ArrowDownLeft,
  Tag,
  Calendar,
  FileText,
  MoreVertical,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Header } from "@/components/header/Header"
import { AppSidebar } from "@/components/sidebar/AppSidebar"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const calls = Array(11)
  .fill(null)
  .map((_, i) => ({
    type: i % 5 === 4 || i === 9 || i === 10 ? "missed" : i % 2 === 0 ? "outgoing" : "inbound",
    duration: "00:00:00",
    contact: {
      name: "Nick Joushua",
      phone: "+94 123 4444 444",
      avatar: `https://api.dicebear.com/7.x/personas/svg?seed=nick${i}`,
    },
    hasNotes: i % 3 === 0,
    date: "March 27,2025",
    time: "6 : 30 am",
  }))

export default function CallHistory() {
  const getTypeIcon = (type) => {
    switch (type) {
      case "outgoing":
        return <ArrowUpRight className="h-5 w-5 text-white" />
      case "inbound":
        return <ArrowDownLeft className="h-5 w-5 text-white" />
      case "missed":
        return <ArrowUpRight className="h-5 w-5 text-white" />
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "outgoing":
        return "bg-teal-500"
      case "inbound":
        return "bg-blue-500"
      case "missed":
        return "bg-red-500"
    }
  }

  const getTypeText = (type) => {
    switch (type) {
      case "outgoing":
        return "Outgoing call"
      case "inbound":
        return "Inbound call"
      case "missed":
        return "Missed call"
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-black">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <Header title="Call History" />
        <div className="p-4 md:p-6 flex-1 overflow-y-auto">
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <Select>
                <SelectTrigger className="w-[180px] bg-transparent border-gray-700">
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

              <Button
                variant="outline"
                className="border-gray-700 text-gray-500 hover:text-white bg-transparent hover:bg-gray-800"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Date
              </Button>
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem className="text-gray-500">
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
          </div>

          {/* Table */}
          <Card className="bg-[#121212] border-gray-800 overflow-x-auto">
            <CardContent className="p-0">
              <Table className="min-w-[700px]">
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead className="text-gray-400 w-1/4">Type</TableHead>
                    <TableHead className="text-gray-400 w-1/3">Contact</TableHead>
                    <TableHead className="text-gray-400 w-1/6 hidden sm:table-cell">
                      Notes
                    </TableHead>
                    <TableHead className="text-gray-400 w-1/4">Date</TableHead>
                    <TableHead className="w-[40px] hidden sm:table-cell" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {calls.map((call, i) => (
                    <TableRow key={i} className="border-gray-800">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div
                            className={`${getTypeColor(
                              call.type
                            )} rounded-full p-3 flex items-center justify-center`}
                          >
                            {getTypeIcon(call.type)}
                          </div>
                          <div>
                            <p className="font-medium text-white">{getTypeText(call.type)}</p>
                            <p className="text-xs text-gray-400">{call.duration}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={call.contact.avatar} />
                            <AvatarFallback className="bg-blue-600">NJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-white">{call.contact.name}</p>
                            <p className="text-xs text-gray-400">{call.contact.phone}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Button variant="ghost" className="text-gray-400 hover:bg-transparent px-0">
                          <FileText className="h-4 w-4 mr-2" />
                          {call.hasNotes ? "View" : "No Notes"}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-white">{call.date}</p>
                          <p className="text-xs text-gray-400">{call.time}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Call Back</DropdownMenuItem>
                            <DropdownMenuItem>Add Note</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
