"use client";
import { Render } from "@measured/puck";
import { config } from "@/puck.config";
import { useState, useEffect } from "react";

export default function Preview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Load your saved data from API/database
    // For now, using placeholder data
    const data = localStorage.getItem("content");
    const jsonData = JSON.parse(data);

    setData(jsonData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <Render config={config} data={data} />
    </div>
  );
}
