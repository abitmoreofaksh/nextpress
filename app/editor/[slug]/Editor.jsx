"use client";
import { Puck } from "@measured/puck";
import { config } from "@/puck.config";
import "@measured/puck/puck.css";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Editor = ({ initialData, slug }) => {
  const router = useRouter();
  const handlePublish = async (data) => {
    try {
      const request = { content: data.content, root: data.root };
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/nextpress/update-specific/${slug}`,
        request,
        {
          withCredentials: true,
        }
      );
      toast.success("Added Successfully");
      router.push(`/preview/${slug}`);
    } catch (err) {
      console.log(err);
      toast.error("Failed");
    }
  };
  return (
    <div className="h-screen">
      <Puck config={config} data={initialData} onPublish={handlePublish} />
    </div>
  );
};

export default Editor;
