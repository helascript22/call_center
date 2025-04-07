"use client"

import { useState } from "react"
import { Tag, Search, Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AppSidebar } from "@/components/sidebar/AppSidebar"
import { Header } from "@/components/header/Header"

const initialNotes = [
  {
    id: 1,
    contactName: "Jette Joushua",
    phoneNumber: "+94 123 4444 444",
    date: "March 29, 2025",
    time: "10:30 AM",
    content: "Discussed pricing details. Need follow-up call next week. Also, confirm discount eligibility & send proposal for approval.",
  },
  {
    id: 2,
    contactName: "Chan Dokidis",
    phoneNumber: "+94 123 4444 444",
    date: "March 29, 2025",
    time: "10:30 AM",
    content: "Discussed pricing details. Need follow-up call next week. Also, confirm discount eligibility & send proposal for approval.",
  },
  {
    id: 3,
    contactName: "Chey Baptista",
    phoneNumber: "+94 123 4444 444",
    date: "March 29, 2025",
    time: "10:30 AM",
    content: "Discussed pricing details. Need follow-up call next week. Also, confirm discount eligibility & send proposal for approval.",
  },
  {
    id: 4,
    contactName: "Hanna Gouse",
    phoneNumber: "+94 123 4444 444",
    date: "March 29, 2025",
    time: "10:30 AM",
    content: "Discussed pricing details. Need follow-up call next week. Also, confirm discount eligibility & send proposal for approval.",
  },
  {
    id: 5,
    contactName: "Emma Gray",
    phoneNumber: "+94 123 4444 444",
    date: "March 29, 2025",
    time: "10:30 AM",
    content: "Discussed pricing details. Need follow-up call next week. Also, confirm discount eligibility & send proposal for approval.",
  },
]

export default function Notes() {
  const [notes, setNotes] = useState(initialNotes)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [newNote, setNewNote] = useState({
    contactName: "",
    phoneNumber: "",
    content: "",
  })

  const filteredNotes = notes.filter(
    (note) =>
      note.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddNote = () => {
    const currentDate = new Date()
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    const formattedTime = currentDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })

    const newNoteObj = {
      id: notes.length + 1,
      contactName: newNote.contactName,
      phoneNumber: newNote.phoneNumber || "+94 123 4444 444",
      date: formattedDate,
      time: formattedTime,
      content: newNote.content,
    }

    setNotes([...notes, newNoteObj])
    setNewNote({ contactName: "", phoneNumber: "", content: "" })
    setIsAddNoteOpen(false)
  }

  const handleEditNote = () => {
    if (!editingNote) return
    setNotes(notes.map((note) => (note.id === editingNote.id ? editingNote : note)))
    setEditingNote(null)
  }

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <AppSidebar />
      <div className="flex-1 flex flex-col h-full overflow-auto">
        <Header title="Notes" />
        <div className="p-4 sm:p-6">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
              {/* Tag Select */}
              <div className="w-full sm:w-[180px]">
                <Select>
                  <SelectTrigger className="w-full sm:w-[180px] bg-transparent border-gray-700">
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
              </div>

              {/* Search Input */}
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Note"
                  className="pl-10 w-full sm:w-[300px] dark:bg-transparent border-gray-500"
                />
              </div>
            </div>

            {/* Add Note Button */}
            <Dialog open={isAddNoteOpen} onOpenChange={setIsAddNoteOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Note</DialogTitle>
                  <DialogDescription>Create a new note for your call or contact.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="contact-name">Contact Name</Label>
                    <Input
                      id="contact-name"
                      value={newNote.contactName}
                      onChange={(e) => setNewNote({ ...newNote, contactName: e.target.value })}
                      placeholder="Enter contact name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone-number">Phone Number</Label>
                    <Input
                      id="phone-number"
                      value={newNote.phoneNumber}
                      onChange={(e) => setNewNote({ ...newNote, phoneNumber: e.target.value })}
                      placeholder="+94 123 4444 444"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="note-content">Note</Label>
                    <Textarea
                      id="note-content"
                      value={newNote.content}
                      onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                      placeholder="Enter your note here"
                      rows={4}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddNoteOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddNote}>Save Note</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Edit Note Dialog */}
            <Dialog open={!!editingNote} onOpenChange={(open) => !open && setEditingNote(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Note</DialogTitle>
                  <DialogDescription>Update the note details.</DialogDescription>
                </DialogHeader>
                {editingNote && (
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-contact-name">Contact Name</Label>
                      <Input
                        id="edit-contact-name"
                        value={editingNote.contactName}
                        onChange={(e) =>
                          setEditingNote({ ...editingNote, contactName: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-phone-number">Phone Number</Label>
                      <Input
                        id="edit-phone-number"
                        value={editingNote.phoneNumber}
                        onChange={(e) =>
                          setEditingNote({ ...editingNote, phoneNumber: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-note-content">Note</Label>
                      <Textarea
                        id="edit-note-content"
                        value={editingNote.content}
                        onChange={(e) =>
                          setEditingNote({ ...editingNote, content: e.target.value })
                        }
                        rows={4}
                      />
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setEditingNote(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleEditNote}>Update Note</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <div key={note.id} className="bg-[#2A2A2A] rounded-lg overflow-hidden shadow">
                <div className="p-4 sm:p-6 relative">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      className="h-8 w-8 rounded-full bg-[#3A3A3A] hover:bg-[#4A4A4A] flex items-center justify-center"
                      onClick={() => setEditingNote(note)}
                    >
                      <Edit className="h-4 w-4 text-blue-400" />
                    </button>
                    <button
                      className="h-8 w-8 rounded-full bg-[#3A3A3A] hover:bg-[#4A4A4A] flex items-center justify-center"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      <Trash2 className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-white mb-1">{note.contactName}</h3>
                  <p className="text-sm text-gray-400 mb-2">{note.phoneNumber}</p>
                  <div className="flex flex-wrap text-xs text-gray-500 mb-4 gap-x-4">
                    <span>{note.date}</span>
                    <span>{note.time}</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-300">{note.content}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredNotes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No notes found. Try a different search or add a new note.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
