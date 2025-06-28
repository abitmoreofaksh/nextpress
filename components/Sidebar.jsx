"use client";
import {
  BarChart2,
  Bell,
  CircleGauge,
  Crown,
  HelpCircle,
  Search,
  Settings,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { icon: Search, label: "Search", href: "/search" },
    { icon: Bell, label: "Notification", href: "/notifications" },
  ];

  const mainMenuItems = [
    { icon: CircleGauge, label: "Dashboard", href: "/" },
    { icon: BarChart2, label: "Pages", href: "/all-pages" },
    { icon: HelpCircle, label: "Help & Center", href: "/help" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="h-[calc(100vh)] w-[280px] bg-neutral-950 rounded-l-xl flex flex-col ml-1">
      {/* Header */}
      <div className="px-6 py-4 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-white font-semibold text-lg">NextPress</span>
          </div>
          <div className="w-6 h-6 bg-gray-700 rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full h-[3px] bg-neutral-800 mt-2 border border-black" />
      </div>

      {/* Top Menu Items */}
      <div className="px-4 pb-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                item.active
                  ? "bg-neutral-800 border border-black text-white shadow-dark"
                  : "text-neutral-400 border border-transparent hover:border-black hover:text-white hover:bg-neutral-800 hover:shadow-dark"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="w-full h-[3px] bg-neutral-800 mt-2 border border-black" />
      </div>
      <div className="flex-1 px-4 pb-4">
        <nav className="space-y-1">
          {mainMenuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                pathname === item.href
                  ? "bg-neutral-800 border border-black text-white shadow-[inset_0px_0px_5px_0px_#171717,0px_0px_5px_0px_#171717,inset_0px_1px_1px_0px_#404040,inset_0px_-1px_1px_0px_#262626]"
                  : "text-neutral-400 border border-transparent hover:border-black hover:text-white hover:bg-neutral-800 hover:shadow-[inset_0px_0px_5px_0px_#171717,0px_0px_5px_0px_#171717,inset_0px_1px_1px_0px_#404040,inset_0px_-1px_1px_0px_#262626]"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Menu Items */}

      {/* Upgrade to Pro Card */}
      <div className="p-4">
        <div className="bg-neutral-950 rounded-lg p-4 relative shadow-dark">
          <button className="absolute top-3 right-3 text-neutral-400 hover:text-gray-300">
            <X className="w-4 h-4" />
          </button>

          <div className="mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-neutral-950 to-neutral-800 rounded-lg flex items-center justify-center mb-3">
              <Crown className="w-6 h-6 text-white" />
            </div>
          </div>

          <h3 className="text-white font-semibold text-lg mb-1">
            Upgrade to Pro!
          </h3>
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
            Unlock Premium Features and Manage Unlimited projects
          </p>

          <button className="w-full border border-black hover:shadow-[inset_0px_0px_5px_0px_#171717,0px_0px_5px_0px_#171717,inset_0px_1px_1px_0px_#404040,inset_0px_-1px_1px_0px_#262626] bg-neutral-900 hover:bg-neutral-800 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
