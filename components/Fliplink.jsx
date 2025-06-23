"use client";
import { motion } from "motion/react";
import Link from "next/link";

const FlipLink = ({ word = "Type", link = "#" }) => {
  return (
    <Link href={link}>
      <motion.span
        initial="initial"
        whileHover="hovered"
        className="relative block w-32 rounded-full text-center overflow-hidden whitespace-nowrap text-2xl border border-white font-black"
      >
        <div>
          {word.split("").map((item, index) => (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },

                hovered: {
                  y: "-100%",
                },
              }}
              transition={{
                duration: 0.4,
                type: "spring",
                delay: 0.025 * index,
              }}
              className="inline-block"
              key={index}
            >
              {item}
            </motion.span>
          ))}
        </div>

        <div className="absolute inset-0">
          {word.split("").map((item, index) => (
            <motion.span
              variants={{
                initial: {
                  y: "100%",
                },

                hovered: {
                  y: 0,
                },
              }}
              transition={{
                duration: 0.4,
                type: "spring",
                delay: 0.025 * index,
              }}
              className="inline-block"
              key={index}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </motion.span>
    </Link>
  );
};

export default FlipLink;
