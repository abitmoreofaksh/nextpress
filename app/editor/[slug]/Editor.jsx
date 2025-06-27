"use client";
import { createUsePuck, Puck } from "@measured/puck";
import { config } from "@/puck.config";
import "@measured/puck/puck.css";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const usePuck = createUsePuck();

const Editor = ({ initialData, slug }) => {
  const router = useRouter();
  const handlePublish = async (data, published) => {
    const status = published ? "Published" : "Draft";
    try {
      const request = { content: data.content, root: data.root, status };
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
      <Puck
        config={config}
        data={initialData}
        overrides={{
          headerActions: ({ children }) => {
            const appState = usePuck((s) => s.appState);

            return (
              <>
                <button
                  onClick={() => {
                    handlePublish(appState.data, false);
                  }}
                  className="px-4 py-1 bg-neutral-700 text-white shadow-dark hover:bg-neutral-900 transition-colors  rounded-sm font-semibold"
                >
                  Save Draft
                </button>

                {/* Render default header actions, such as the default Button */}
                {children}
              </>
            );
          },
        }}
        onPublish={(data) => handlePublish(data, true)}
      />
    </div>
  );
};

export default Editor;
