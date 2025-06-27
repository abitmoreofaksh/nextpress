"use client";
import axios from "axios";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const AddDialog = ({ isOpen, onClose, onSuccess }) => {
  const [url, setUrl] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/nextpress/add-url`,
        { url },
        { withCredentials: true }
      );

      toast.success(data.message);
      setUrl("");
      await onSuccess();
      onClose();
    } catch (err) {
      console.log(err);
      if (err?.response?.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Server Error");
      }
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/70 dark:bg-black/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-full max-w-md mx-auto"
          >
            <div className="bg-neutral-900 rounded-3xl border border-black  shadow-dark overflow-hidden">
              {/* Header */}
              <div className="relative px-6 pt-6 pb-2">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all duration-200 group"
                >
                  <X className="w-5 h-5 text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-300 dark:group-hover:text-neutral-500 transition-colors duration-200" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Content */}
                <div className="px-6 pb-6 ">
                  <h2 className="text-2xl font-bold text-white dark:text-neutral-900 mb-4">
                    Add New Page
                  </h2>

                  <div className="text-left">
                    <label
                      htmlFor="url"
                      className="block text-sm font-medium text-neutral-300 dark:text-neutral-700 mb-2"
                    >
                      Page URL Slug
                    </label>
                    <motion.input
                      id="url"
                      whileHover={{ scale: 1.01 }}
                      whileFocus={{ scale: 1.01 }}
                      className="w-full px-4 py-3 rounded-2xl border dark:bg-neutral-800/50 dark:border-neutral-600 dark:text-neutral-900 dark:placeholder-neutral-500 bg-neutral-800/50 border-neutral-600 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 transition-all duration-300"
                      placeholder="e.g., about-us, contact, blog"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="px-8 pb-8 pt-4">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-6 py-3.5 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 rounded-2xl hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all duration-200 font-semibold border border-gray-200 dark:border-neutral-700 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3.5 border bg-neutral-800 shadow-dark border-black text-white rounded-2xl transition-all duration-200 font-semibold hover:bg-neutral-900 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      disabled={!url.trim()}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Add Page
                      </div>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default AddDialog;
