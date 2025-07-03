"use client";
import { createUsePuck, Puck } from "@measured/puck";
import { config } from "@/puck.config";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const usePuck = createUsePuck();

const Editor = ({ initialData, slug }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePublish = async (data, published) => {
    if (isLoading) return;
    const status = published ? "Published" : "Draft";
    setIsLoading(true);
    try {
      const request = { content: data.content, root: data.root, status };
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/nextpress/update-specific/${slug}`,
        request,
        {
          withCredentials: true,
        }
      );

      toast.success(`${status} successfully!`);
      router.replace(`/preview/${slug}`);
    } catch (err) {
      console.error("API Error:", err);

      if (err.response?.status === 401) {
        toast.error("Unauthorized. Please log in again.");
      } else if (err.response?.status === 404) {
        toast.error("Content not found.");
      } else if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Failed to save. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const DraftButton = () => {
    const appState = usePuck((s) => s.appState);
    return (
      <button
        onClick={() => {
          handlePublish(appState.data, false);
        }}
        disabled={isLoading}
        className={`px-4 py-1 text-white shadow-dark rounded-sm font-semibold transition-colors ${
          isLoading
            ? "bg-neutral-500 cursor-not-allowed"
            : "bg-neutral-700 hover:bg-neutral-900"
        }`}
      >
        {isLoading ? "Saving..." : "Save Draft"}
      </button>
    );
  };
  return (
    <Puck
      config={config}
      data={initialData}
      overrides={{
        headerActions: ({ children }) => {
          return (
            <>
              <DraftButton />
              {children}
            </>
          );
        },
      }}
      onPublish={(data) => handlePublish(data, true)}
    />
  );
};

export default Editor;
