import React, { useState } from "react";
import { NavigationItem } from "../../types";
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
import { Link } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }: any) {
  const navigation: NavigationItem[] = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/products", icon: Package },
    // {
    //   name: "Services",
    //   href: "#",
    //   icon: Package,
    //   children: [
    //     { name: "Web Development", href: "/services/web-development" },
    //     { name: "App Development", href: "/services/app-development" },
    //     { name: "SEO Optimization", href: "/services/seo-optimization" },
    //   ],
    // },
  ];

  // Keep track of which menu is open
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <>
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
              const isOpen = openMenu === item.name;

              return (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setOpenMenu(item.name)}
                  onMouseLeave={() => setOpenMenu(null)}
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

                  {item.children && (
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "max-h-screen opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="flex flex-col pl-12 pr-4 py-2 space-y-1 bg-gray-50 border-l border-gray-200 mb-3">
                        {item.children.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className="text-sm block text-gray-600 hover:text-primary-700 transition-colors duration-200 mb-3"
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
    </>
  );
}
