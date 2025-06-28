import MainWrapper from "@/components/MainWrapper";
import { BarChart2, BookCheck, BookDashed } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <MainWrapper>
      <div className="grid grid-cols-3">
        <div className="border border-black shadow-dark bg-gradient-to-br from-neutral-900 to-neutral-800 h-40 rounded-2xl p-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
              <BarChart2 className="w-6 h-6 text-white" />
            </div>
            <div className="text-white text-2xl font-black">Total Pages</div>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-4">
            <div className="border border-neutral-600 bg-neutral-900 shadow-dark h-14 rounded-xl  flex items-center justify-center gap-4 font-black">
              <div className="flex items-center gap-1">
                <BookDashed className="w-4 h-4" />
                <div>Draft : </div>
              </div>
              <div>8 Pages</div>
            </div>
            <div className="border border-neutral-600 bg-neutral-900 shadow-dark h-14 rounded-xl flex items-center justify-center gap-4 font-black">
              <div className="flex items-center gap-1">
                <BookCheck className="w-4 h-4" />
                <div>Published : </div>
              </div>
              <div>8 Pages</div>
            </div>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
};

export default page;
