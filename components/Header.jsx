"use client";
import axios from "axios";
import {
  Bell,
  Calendar,
  CircleGauge,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Header = ({ user }) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      router.refresh("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Server Error");
    }
  };
  return (
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
          <button
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors border border-neutral-700"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 text-neutral-300" />
          </button>
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-neutral-700">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white to-neutral-300 flex items-center justify-center">
            <User className="w-5 h-5 text-neutral-800" />
          </div>
          <div>
            <div className="text-lg font-semibold text-white">
              {user.user.username}
            </div>
            <div className="text-xs text-neutral-400">Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
