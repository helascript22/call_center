import { Search, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header({ title }) {
  return (
    <header className="border-b border-gray-800 p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      {/* Title */}
      <h1 className="text-xl font-bold text-white text-center md:text-left w-full md:w-auto">
        {title}
      </h1>

      {/* Search */}
      <div className="flex justify-center w-full md:justify-center md:w-auto">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
          <Input
            placeholder="Search Caller"
            className="pl-10 w-full bg-gray-700 border-gray-700 focus-visible:ring-blue-600 placeholder-white text-white"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center md:justify-end gap-4 w-full md:w-auto">
        <Button size="icon" className="rounded-full bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 border-2 border-blue-600">
            <AvatarImage
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NokkbjbHaW7DJopeum9V7GswAl7F6K.png"
              alt="Nicole Jorgie"
            />
            <AvatarFallback className="bg-blue-600 text-white">NJ</AvatarFallback>
          </Avatar>
          {/* Hide text on small screens */}
          <div className="hidden sm:block text-sm">
            <p className="font-medium text-white">Nicole Jorgie</p>
            <p className="text-xs text-white">Sales Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
}
