import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { cookies } from "next/headers";
import axios from "axios";
import { getUser } from "@/lib/getUser";

const MainWrapper = async ({ children }) => {
  const cookieStore = await cookies();
  const data = getUser(cookieStore.toString());

  return (
    <div className="bg-black h-screen flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Component */}
      <div className="h-screen bg-black w-[calc(100vw-280px)] px-6 pt-6 text-neutral-300 overflow-y-scroll">
        {/* Header */}
        <Header user={data} />
        {/* Projects Table Section */}
        {children}
      </div>
    </div>
  );
};

export default MainWrapper;
