"use client";
import axios from "axios";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

const DeleteDialog = ({ isOpen, onClose, onSuccess, id }) => {
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/nextpress/delete-url/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      onSuccess();
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
            className="absolute inset-0 bg-black/30 dark:bg-black/85 backdrop-blur-sm"
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
            <div className="bg-neutral-900 rounded-3xl border border-black  shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative px-6 pt-6 pb-2">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-50  hover:text-red-600  transition-all duration-200 group"
                >
                  <X className="w-5 h-5 text-neutral-400 dark:text-neutral-600 group-hover:text-red-600  transition-colors duration-200" />
                </button>

                {/* Warning Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-950 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-red-600 dark:text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-6 text-center">
                <h2 className="text-xl font-semibold text-white dark:text-neutral-900 mb-2">
                  Delete Confirmation
                </h2>
                <p className="text-neutral-300 dark:text-neutral-600 leading-relaxed">
                  Are you sure you want to delete this item? This action cannot
                  be undone and all associated data will be permanently removed.
                </p>
              </div>

              {/* Actions */}
              <div className="px-6 pb-6">
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-3 bg-neutral-800 dark:bg-neutral-100 text-neutral-200 dark:text-neutral-700 rounded-2xl hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-all duration-200 font-medium border border-neutral-700 dark:border-neutral-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-4 py-3 bg-red-600 dark:bg-red-600 text-white rounded-2xl hover:bg-red-700 dark:hover:bg-red-700 transition-all duration-200 font-medium shadow-lg hover:shadow-red-500/25 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteDialog;
