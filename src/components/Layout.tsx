// src/components/Layout.tsx
import React, { useState, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  ChevronUp,
} from "lucide-react";
import { NavigationItem } from "../types";

interface LayoutProps {
  children: ReactNode;
}


const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const location = useLocation();

  const navigation: NavigationItem[] = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/products", icon: Package },
    {
      name: "Services",
      href: "#",
      icon: Package,
      children: [
        { name: "Web Development", href: "/services/web-development" },
        { name: "App Development", href: "/services/app-development" },
        { name: "SEO Optimization", href: "/services/seo-optimization" },
      ],
    },
    { name: "Partnerships", href: "/partnerships", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Search", href: "/search", icon: Search },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const [isOpen, setIsOpen] = useState(false);

              return (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      isActive
                        ? "bg-primary-100 text-primary-700 border-r-2 border-primary-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                    {item.children && (
                      <ChevronUp
                        className={`ml-auto h-5 w-5 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-black" : "text-gray-400"
                        }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && (
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-auto opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="flex flex-col pl-12 pr-4 py-2 space-y-1 bg-gray-50 border-l border-gray-200 mb-3">
                        {item.children.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className="text-sm  block text-gray-600 hover:text-primary-700 transition-colors duration-200 mb-3"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 w-full ">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4 justify-between w-full ">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="flex">
                <button className="p-2 rounded-md hover:bg-gray-100">
                  <Bell className="h-5 w-5 text-gray-600" />
                </button>

                <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
