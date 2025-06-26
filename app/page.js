// // app/dashboard/page.js - Example protected page
// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const fetchUser = async () => {
//     try {
//       const response = await axios.get("/api/get-user");
//       if (response.data.success) {
//         setUser(response.data.user);
//       }
//     } catch (error) {
//       console.error("Failed to fetch user:", error);
//       // Token is invalid, middleware will handle redirect
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       // Clear the cookie by setting it to expire
//       await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
//         {},
//         {
//           withCredentials: true,
//         }
//       );
//       router.refresh("/login");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <nav className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <h1 className="text-xl font-semibold">Dashboard</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               {user && (
//                 <span className="text-gray-700">Welcome, {user.username}</span>
//               )}
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
//             <h2 className="text-2xl font-bold mb-4">Protected Dashboard</h2>
//             <p className="text-gray-600">
//               This page is protected by middleware.
//             </p>
//             {user && (
//               <div className="mt-4 p-4 bg-green-50 rounded-lg">
//                 <p>
//                   <strong>User ID:</strong> {user.id}
//                 </p>
//                 <p>
//                   <strong>Username:</strong> {user.username}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
"use client";
import {
  Search,
  Bell,
  BarChart2,
  HelpCircle,
  Settings,
  X,
  Crown,
  Filter,
  User,
  Calendar,
  Clock,
  CheckCircle,
  Pause,
  CircleGauge,
  CircleDashed,
  TrashIcon,
  ExternalLink,
  Edit,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const projects = [
    {
      id: 1,
      name: "tailwind-buttons",
      status: "Draft",
      published_on: new Date().toDateString(),
      published_by: "Akshit",
    },
    {
      id: 2,
      name: "tailwind-form",
      status: "Published",
      published_on: new Date().toDateString(),
      published_by: "Shiv",
    },
    {
      id: 3,
      name: "tailwind-cards",
      status: "Published",
      published_on: new Date().toDateString(),
      published_by: "Mehul",
    },
    {
      id: 4,
      name: "tailwind-navbar",
      status: "Draft",
      published_on: new Date().toDateString(),
      published_by: "Vishwas",
    },
    {
      id: 5,
      name: "tailwind-sidebar",
      status: "Published",
      published_on: new Date().toDateString(),
      published_by: "Akshit",
    },
    {
      id: 6,
      name: "tailwind-dashboard",
      status: "Draft",
      published_on: new Date().toDateString(),
      published_by: "Shiv",
    },
    {
      id: 7,
      name: "tailwind-modal",
      status: "Published",
      published_on: new Date().toDateString(),
      published_by: "Mehul",
    },
    {
      id: 8,
      name: "tailwind-alerts",
      status: "Draft",
      published_on: new Date().toDateString(),
      published_by: "Vishwas",
    },
    {
      id: 9,
      name: "tailwind-footer",
      status: "Published",
      published_on: new Date().toDateString(),
      published_by: "Akshit",
    },
    {
      id: 10,
      name: "tailwind-carousel",
      status: "Draft",
      published_on: new Date().toDateString(),
      published_by: "Shiv",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Published":
        return <CheckCircle className="w-4 h-4" />;
      case "Draft":
        return <Pause className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-600/20 text-green-600 border-green-600/30";
      case "Draft":
        return "bg-yellow-600/20 text-yellow-600 border-yellow-600/30";
      default:
        return "bg-neutral-500/20 text-neutral-400 border-neutral-500/30";
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-black h-screen flex">
      {/* Sidebar */}
      <TaskplusSidebar />
      {/* Main Component */}
      <div className="h-screen bg-black w-[calc(100vw-280px)] px-6 pt-6 text-neutral-300 overflow-y-scroll">
        {/* Header */}
        <div className="flex items-center justify-between rounded-2xl sticky top-2 z-[999] px-6 py-4 border border-black shadow-dark bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 backdrop-blur-sm mb-8">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm">
              <CircleGauge className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Dashboard</h1>
              <p className="text-sm text-neutral-400">
                Project Management Overview
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-neutral-400" />
              <span className="text-sm text-neutral-300">June 26, 2025</span>
            </div>

            <div className="flex items-center gap-3 border-l border-neutral-700 pl-4">
              <button className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors border border-neutral-700">
                <Bell className="w-5 h-5 text-neutral-300" />
              </button>
              <button className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors border border-neutral-700">
                <Settings className="w-5 h-5 text-neutral-300" />
              </button>
            </div>

            <div className="flex items-center gap-3 pl-4 border-l border-neutral-700">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white to-neutral-300 flex items-center justify-center">
                <User className="w-5 h-5 text-neutral-800" />
              </div>
              <div>
                <div className="text-lg font-semibold text-white">Akshit</div>
                <div className="text-xs text-neutral-400">Admin</div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Table Section */}
        <div className="rounded-2xl border border-black shadow-dark bg-gradient-to-br from-neutral-900 to-neutral-900/50 backdrop-blur-sm overflow-hidden">
          {/* Table Header Controls */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-white">All Pages</h2>
              <span className="px-3 py-1 text-xs bg-neutral-800 text-neutral-300 rounded-full">
                {filteredProjects.length} Pages
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-300 placeholder-neutral-500 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600"
                />
              </div>

              <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filter</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left py-4 px-6 text-sm font-medium text-neutral-400 uppercase tracking-wider">
                    Page Slug
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-neutral-400 uppercase tracking-wider">
                    Published By
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-neutral-400 uppercase tracking-wider">
                    Published On
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-neutral-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-neutral-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project, index) => (
                  <tr
                    key={project.id}
                    className={`border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors ${
                      index % 2 === 0 ? "bg-neutral-900/50" : "bg-transparent"
                    }`}
                  >
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <CircleDashed className="w-4 h-4 text-neutral-400" />
                        <span className="font-medium text-white capitalize">
                          {project.name.replace("-", " ")}
                        </span>
                      </div>
                    </td>

                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-white capitalize">
                          {project.published_by}
                        </span>
                      </div>
                    </td>

                    <td className="py-5 px-6">
                      <span className="text-neutral-300">
                        {project?.published_on}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(
                          project.status
                        )}`}
                      >
                        {getStatusIcon(project.status)}
                        {project.status}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button className="border border-black shadow-dark w-8 h-8 flex items-center justify-center cursor-pointer rounded-lg text-neutral-500 hover:bg-green-600/20 hover:border-green-600/20">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button className="border border-black shadow-dark w-8 h-8 flex items-center justify-center cursor-pointer rounded-lg text-neutral-500 hover:bg-blue-600/20 hover:border-blue-600/20">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="border border-black shadow-dark w-8 h-8 flex items-center justify-center cursor-pointer rounded-lg text-neutral-500 hover:bg-red-600/20 hover:border-red-600/20">
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

export function TaskplusSidebar() {
  const menuItems = [
    { icon: Search, label: "Search", href: "/search" },
    { icon: Bell, label: "Notification", href: "/notifications" },
  ];

  const mainMenuItems = [
    { icon: CircleGauge, label: "Dashboard", href: "/", active: true },
    { icon: BarChart2, label: "Pages", href: "/pages" },
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
                item.active
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
