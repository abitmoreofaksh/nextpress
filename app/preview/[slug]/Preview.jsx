"use client";
import { Render } from "@measured/puck";
import { config } from "@/puck.config";

const Preview = ({ data }) => {
  return (
    <div className="container mx-auto p-4">
      <Render config={config} data={data} />
    </div>
  );
};

export default Preview;
