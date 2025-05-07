import { Link, NavLink } from "react-router-dom";
import {
  BarChart3,
  FileTextIcon,
  Home,
  LayoutDashboard,
  Menu,
  PlaneTakeoff,
  Settings,
  User,
} from "lucide-react";
import { Button } from "../ui/button";

const navItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/dashboard",
  },
  {
    title: "Profile",
    icon: <User size={20} />,
    path: "/dashboard/profile",
  },
  {
    title: "Flights",
    icon: <PlaneTakeoff size={20} />,
    path: "/dashboard/flights",
  },
  {
    title: "Log a Flight",
    icon: <FileTextIcon size={20} />,
    path: "/dashboard/log-flight",
  },
  {
    title: "Statistics",
    icon: <BarChart3 size={20} />,
    path: "/dashboard/statistics",
  },
  {
    title: "Settings",
    icon: <Settings size={20} />,
    path: "/dashboard/settings",
  },
];

export default function Sidebar({
  open,
  onMenuClick,
}: {
  open: boolean;
  onMenuClick: void;
}) {
  return (
    <aside
      className={`${
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
      } bg-sidebar text-sidebar-foreground fixed md:relative z-30 inset-y-0 left-0 w-64 transition-all duration-300 ease-in-out border-r border-sidebar-border flex flex-col`}
    >
      <div className="h-16 px-4 flex items-center border-b border-sidebar-border justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="bg-sidebar-primary p-1.5 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-sidebar-primary-foreground"
            >
              <path d="M2 22h20"></path>
              <path d="M12 11l-8.29 4.44c-.8.43-1.15.99-.64 1.79.51.8 1.51.92 2.31.49L12 15"></path>
              <path d="M8.5 8.5 12 11l8.29-4.44c.8-.43 1.15-.99.64-1.79-.51-.8-1.51-.92-2.31-.49L12 7"></path>
              <path d="m12 11 2.5-2.5"></path>
            </svg>
          </div>
          <span
            className={`text-lg font-bold transition-all duration-300 ${
              !open && "md:hidden"
            }`}
          >
            SkyBound
          </span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="mr-2 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center py-2 px-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  }`
                }
              >
                <span className="mr-3 flex-shrink-0">{item.icon}</span>
                <span
                  className={`transition-opacity duration-300 ${
                    !open && "md:hidden"
                  }`}
                >
                  {item.title}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <NavLink
          to="/dashboard/help"
          className="flex items-center py-2 px-3 rounded-md transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
        >
          <span className="mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-help-circle"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
          </span>
          <span
            className={`transition-opacity duration-300 ${
              !open && "md:hidden"
            }`}
          >
            Help & Support
          </span>
        </NavLink>
      </div>
    </aside>
  );
}
