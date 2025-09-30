"use client";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const BorderRayCard = ({ icon, heading, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-b inline-block w-96 from-neutral-50 dark:from-neutral-950 to-neutral-100 dark:to-neutral-900 rounded-xl p-8 border border-gray-300 dark:border-gray-800  transition-all duration-300 group relative overflow-hidden"
    >
      <div className="relative z-10 col-span-11 flex flex-col justify-between h-full">
        <div>
          {/* <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Briefcase className="w-8 h-8 text-purple-500 mb-4" />
          </motion.div> */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-violet-400"
          >
            {heading}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="dark:text-gray-400 text-gray-700"
          >
            {description}
          </motion.p>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 20"
        className="absolute -top-2"
      >
        <motion.path
          d="M0 10 L400 10"
          stroke="url(#upper)"
          stroke-width="1"
          fill="none"
        />
        <defs>
          <motion.linearGradient
            id="upper"
            gradientUnits="userSpaceOnUse"
            x1="100%"
            x2="0%"
            y1="0%"
            y2="0%"
            animate={{
              x1: ["100%", "-10%", "0%"],
              x2: ["105%", "-5%", "0%"],
            }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="20%" stopColor="#7d12ff" stopOpacity="1" />
            <stop offset="50%" stopColor="#ab20fd" stopOpacity="1" />
            <stop offset="80%" stopColor="#200589" stopOpacity="1" />
            <stop offset="100%" stopColor="#fbf8fd" stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 20"
        className="absolute  -bottom-2"
      >
        <motion.path
          d="M0 10 L400 10"
          stroke="url(#lower)"
          stroke-width="1"
          fill="none"
        />
        <defs>
          <motion.linearGradient
            id="lower"
            gradientUnits="userSpaceOnUse"
            x1="100%"
            x2="0%"
            y1="0%"
            y2="0%"
            animate={{
              x1: ["0%", "-10%", "100%"],
              x2: ["0%", "-5%", "105%"],
            }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="20%" stopColor="#7d12ff" stopOpacity="1" />
            <stop offset="50%" stopColor="#ab20fd" stopOpacity="1" />
            <stop offset="80%" stopColor="#200589" stopOpacity="1" />
            <stop offset="100%" stopColor="#fbf8fd" stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </svg>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        whileHover={{ opacity: 0.2 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-indigo-600/20"
      />
    </motion.div>
  );
};

export default BorderRayCard;
