import { NavLink, useNavigate } from 'react-router-dom';
import {
  Phone,
  LayoutDashboard,
  Hash,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';
import Cookies from 'js-cookie';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

export function AppSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <div className="w-16 md:w-64 h-screen bg-gray-900 text-white flex flex-col border-r border-gray-800 transition-all duration-300">
      {/* Sidebar Header */}
      <div className="flex items-center justify-center md:justify-start p-4 border-b border-gray-800">
        <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center">
          <Phone className="w-4 h-4 text-white" />
        </div>
        <span className="ml-3 text-lg font-semibold hidden md:inline">Sale.com</span>
      </div>

      {/* Sidebar Content */}
      <nav className="flex-1 p-2 md:p-4">
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center md:justify-start justify-center w-full p-2 rounded ${
                  isActive ? 'bg-gray-800' : 'hover:bg-gray-700'
                }`
              }
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="ml-2 hidden md:inline">Dashboard</span>
            </NavLink>
          </li>
        </ul>

        <div className="mt-6">
          <h3 className="text-sm text-gray-400 mb-2 hidden md:block">Company</h3>
          <ul>
            <li>
              <NavLink
                to="/dialpad"
                className={({ isActive }) =>
                  `flex items-center md:justify-start justify-center w-full p-2 rounded ${
                    isActive ? 'bg-gray-800' : 'hover:bg-gray-700'
                  }`
                }
              >
                <Hash className="h-5 w-5" />
                <span className="ml-2 hidden md:inline">Dial Pad</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/call-history"
                className={({ isActive }) =>
                  `flex items-center md:justify-start justify-center w-full p-2 rounded ${
                    isActive ? 'bg-gray-800' : 'hover:bg-gray-700'
                  }`
                }
              >
                <Phone className="h-5 w-5" />
                <span className="ml-2 hidden md:inline">Call History</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/notes"
                className={({ isActive }) =>
                  `flex items-center md:justify-start justify-center w-full p-2 rounded ${
                    isActive ? 'bg-gray-800' : 'hover:bg-gray-700'
                  }`
                }
              >
                <ClipboardList className="h-5 w-5" />
                <span className="ml-2 hidden md:inline">Notes</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/daily-usage"
                className={({ isActive }) =>
                  `flex items-center md:justify-start justify-center w-full p-2 rounded ${
                    isActive ? 'bg-gray-800' : 'hover:bg-gray-700'
                  }`
                }
              >
                <BarChart3 className="h-5 w-5" />
                <span className="ml-2 hidden md:inline">Daily Usage</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-2 md:p-4 border-t border-gray-700">
        <ul>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center md:justify-start justify-center w-full p-2 rounded ${
                  isActive ? 'bg-gray-800' : 'hover:bg-gray-700'
                }`
              }
            >
              <Settings className="h-5 w-5" />
              <span className="ml-2 hidden md:inline">Settings</span>
            </NavLink>
          </li>
          <li>
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center md:justify-start justify-center w-full p-2 rounded hover:bg-gray-700">
                  <LogOut className="h-5 w-5" />
                  <span className="ml-2 hidden md:inline">Logout</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="text-sm mb-4">Are you sure you want to log out?</div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </li>
        </ul>
      </div>
    </div>
  );
}
