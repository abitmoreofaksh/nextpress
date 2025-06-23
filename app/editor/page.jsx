"use client";
import { Puck } from "@measured/puck";
import { config } from "@/puck.config";
import "@measured/puck/puck.css";
import { useRouter } from "next/navigation";

export default function Editor() {
  const router = useRouter();
  const initialData = {
    content: [],
    root: {},
  };
  const handlePublish = async (data) => {
    try {
      localStorage.setItem("content", JSON.stringify(data));
      console.log("Done");
      router.push("/preview");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="h-screen">
      <Puck config={config} data={initialData} onPublish={handlePublish} />
    </div>
  );
}
