import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { cookies } from "next/headers";
import axios from "axios";

const MainWrapper = async ({ children }) => {
  const cookieStore = await cookies();
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_ORIGIN}/api/get-user`,
    {
      headers: { Cookie: cookieStore },
    }
  );
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
