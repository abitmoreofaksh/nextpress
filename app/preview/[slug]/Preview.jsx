"use client";
import { Render } from "@measured/puck";
import { config } from "@/puck.config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Preview = ({ data }) => {
  return (
    <>
      <Navbar />
      <div className=" mb-24">
        <Render config={config} data={data} />
      </div>
      <Footer />
    </>
  );
};

export default Preview;
