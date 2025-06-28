"use client";
import { motion } from "framer-motion";

export default function LayoutHeading({ text, height, width, borderRadius }) {
  return (
    <div className="h-[15rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <h1 className="text-4xl pointer-events-none sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center">
        {text}
      </h1>
      <BackgroundBoxes
        height={height}
        width={width}
        borderRadius={borderRadius}
      />
      <svg
        viewBox="0 0 300 68"
        width="300"
        height="68"
        className="block left-[28%] top-[32%] absolute"
        aria-hidden="true"
      >
        <motion.path
          stroke="url(#gradient)"
          d="M0.5 0.5H89C90.6569 0.5 92 1.84315 92 3.5V29C92 30.6569 93.3431 32 95 32H148.5C150.157 32 151.5 33.3431 151.5 35V64C151.5 65.6569 152.843 67 154.5 67H235.5"
          fill="none"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="motion-reduce:hidden"
        />
        <defs>
          <motion.linearGradient
            id="gradient"
            gradientUnits="userSpaceOnUse"
            x1="100%"
            x2="0%"
            y1="0%"
            y2="0%"
            animate={{
              x1: ["100%", "-10%", "0%"],
              x2: ["150%", "30%", "0%"],
            }}
            transition={{
              duration: 3,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            <stop offset="0%" stopColor="#18CCFC" stopOpacity="0" />
            <stop offset="20%" stopColor="#18CCFC" stopOpacity="1" />
            <stop offset="50%" stopColor="#6344F5" stopOpacity="1" />
            <stop offset="80%" stopColor="#AE48FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </svg>
    </div>
  );
}

import { useState } from "react";

function BackgroundBoxes({
  width = 40,
  height = 40,
  gapX = 10,
  gapY = 10,
  grid = [68, 9],
  className,
  rectClassName,
  borderRadius = 2,
  ...props
}) {
  const [columns, rows] = grid;
  const [hoveredRect, setHoveredRect] = useState(null);

  const totalWidth = columns * (width + gapX);
  const totalHeight = rows * (height + gapY);

  return (
    <svg
      width={totalWidth}
      height={totalHeight}
      className={"absolute inset-0 h-full w-full shadow shadow-neutral-100"}
      {...props}
    >
      {Array.from({ length: columns * rows }).map((_, index) => {
        const col = index % columns;
        const row = Math.floor(index / columns);
        const x = col * (width + gapX);
        const y = row * (height + gapY);

        return (
          <g
            key={index}
            transform={`translate(${x}, ${y}) skewX(-15)`}
            onMouseEnter={() => setHoveredRect(index)}
            onMouseLeave={() => setHoveredRect(null)}
          >
            <rect
              x={0}
              y={0}
              width={width}
              height={height}
              rx={borderRadius}
              ry={borderRadius}
              className={`stroke-neutral-200 dark:stroke-neutral-800 transition-all duration-300 ease-out [&:not(:hover)]:duration-1000 ${
                hoveredRect === index ? "fill-amber-700/40" : "fill-transparent"
              }`}
            />
          </g>
        );
      })}
    </svg>
  );
}
