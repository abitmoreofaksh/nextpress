"use client";
import axios from "axios";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export const Dialog = ({ isOpen, onClose, onSuccess }) => {
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
      await onSuccess();
      onClose();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
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
            className="absolute inset-0 bg-black/70 dark:bg-black/85 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{
              duration: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-full max-w-md mx-auto"
          >
            <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-neutral-800 overflow-hidden">
              {/* Header */}
              <div className="relative px-6 pt-6 pb-4">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-neutral-400" />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                {/* Order Summary */}
                <div className="px-6 pb-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2"
                    >
                      URL
                    </label>
                    <motion.input
                      whileHover={{ scale: 1.01 }}
                      whileFocus={{ scale: 1.01 }}
                      className="w-full px-4 py-3 rounded-md border dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      placeholder="Page Slug"
                      onChange={(e) => setUrl(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6">
                  <div className="flex gap-3">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onClose();
                      }}
                      className="flex-1 px-4 py-3 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 rounded-2xl hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all duration-200 font-medium"
                    >
                      Cancel
                    </button>
                    <button className="flex-1 px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 font-medium shadow-lg">
                      Add Page
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
