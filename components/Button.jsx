import React from "react";

const Button = ({ variant = "Shadow", text = "Click Me" }) => {
  const styles = {
    Shadow:
      "px-8 py-2 text-sm rounded shadow transition-colors ease-in-out duration-300 shadow-black dark:shadow-white dark:hover:bg-white dark:hover:text-black dark:text-white hover:text-white hover:bg-black",

    Solid:
      "px-8 py-2 my-4 dark:hover:bg-white/80 bg-black dark:bg-white dark:text-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg",

    "Gradient Border":
      "relative inline-flex items-center justify-center sm:w-auto group",

    "Classic Primary":
      "px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1",

    "Soft Style":
      "px-6 py-3 bg-blue-100 text-blue-600 font-medium rounded-lg hover:bg-blue-200 transition duration-300",

    "Ring Style":
      "px-6 py-3 bg-emerald-500 text-white font-semibold rounded-full ring-2 ring-emerald-300 ring-offset-2 hover:bg-emerald-600 transition duration-300",

    "3D Effect":
      "px-6 py-3 bg-yellow-500 text-white font-bold rounded-lg shadow-[0_4px_0_rgb(202,138,4)] hover:shadow-[0_2px_0_rgb(202,138,4)] hover:translate-y-0.5 transition-all duration-200",

    Cyber:
      "px-6 py-3 bg-black text-white font-mono rounded-lg overflow-hidden group relative",

    "Slide Effect":
      "px-6 py-3 bg-transparent border border-blue-400 text-blue-400 font-bold rounded-lg relative overflow-hidden group hover:text-white transition-colors duration-300",

    "Nebula Glow":
      "px-6 py-3 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-600 text-white font-bold rounded-lg relative group",

    Matrix:
      "px-6 py-3 bg-black text-emerald-400 font-mono rounded-lg border border-emerald-400 hover:bg-emerald-400 hover:text-black transition-all duration-300 group",

    Holographic:
      "px-6 py-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white font-bold rounded-lg relative group overflow-hidden",

    Pulse:
      "px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg group relative",

    Geometric:
      "px-6 py-3 bg-transparent border-2 border-gray-800 text-gray-800 font-bold rounded-none hover:rounded-lg transition-all duration-300 group relative",

    "Neon Frame":
      "px-6 py-3 bg-black text-white font-bold rounded-lg relative group",

    "Liquid Flow":
      "px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold rounded-lg relative group overflow-hidden",

    Circuit:
      "px-6 py-3 bg-gray-900 text-emerald-400 font-mono rounded-lg border border-emerald-400 relative group",

    "Cosmic Portal":
      "px-6 py-3 bg-gradient-to-r from-violet-600 via-purple-800 to-violet-600 text-white font-bold rounded-lg relative group overflow-hidden",

    Echo: "px-6 py-3 bg-white text-gray-800 font-bold rounded-lg group relative",

    Aurora:
      "px-6 py-3 bg-gradient-to-r from-green-400 via-teal-500 to-purple-600 text-white font-bold rounded-lg relative group",

    "Cyber Pulse":
      "relative px-8 py-3 font-medium text-lg text-cyan-400 rounded-md border border-cyan-500 bg-gray-900 before:absolute before:inset-0 before:rounded-md before:bg-cyan-400/20 before:scale-x-[1.05] before:scale-y-[1.15] before:animate-[pulse_2s_infinite] hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-95 transition-all duration-300",

    "Neon Gradient":
      "px-8 py-3 font-medium text-lg text-white rounded-md bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] animate-[gradient_3s_linear_infinite] hover:shadow-[0_0_25px_rgba(192,132,252,0.5)] active:scale-95 transition-all duration-300",

    "Digital Surge":
      "px-8 py-3 font-medium text-lg text-emerald-400 rounded-md border-2 border-emerald-500 bg-gray-900 hover:bg-emerald-500 hover:text-gray-900 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-95 transition-all duration-300",

    "Energy Field":
      "relative px-8 py-3 font-medium text-lg rounded-md bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text border border-blue-500 before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-r before:from-blue-600/20 before:to-violet-600/20 hover:before:opacity-100 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] active:scale-95 transition-all duration-300",

    "Tech Pulse":
      "relative px-8 py-3 font-medium text-lg text-white rounded-md bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 overflow-hidden group hover:border-gray-500 hover:shadow-[0_0_20px_rgba(107,114,128,0.4)] active:scale-95 transition-all duration-300",

    "Plasma Glow":
      "px-8 py-3 font-medium text-lg text-white rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 shadow-[0_0_15px_rgba(192,38,211,0.3)] hover:shadow-[0_0_30px_rgba(192,38,211,0.5)] hover:from-fuchsia-500 hover:to-pink-500 active:scale-95 transition-all duration-300",

    "Digital Matrix":
      "relative px-8 py-3 font-medium text-lg text-white rounded-md border border-teal-500 bg-gray-900/80 backdrop-blur-sm before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-r before:from-teal-500/20 before:to-cyan-500/20 hover:before:opacity-100 hover:border-teal-400 hover:shadow-[0_0_25px_rgba(20,184,166,0.4)] active:scale-95 transition-all duration-300",

    "Cyberpunk Edge":
      "px-8 py-3 font-medium text-lg text-yellow-400 rounded-none border-l-2 border-r-2 border-yellow-400 hover:border-yellow-300 hover:text-yellow-300 hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] active:scale-95 transition-all duration-300",

    "Neural Network":
      "relative px-8 py-3 font-medium text-lg text-white rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 overflow-hidden group hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] active:scale-95 transition-all duration-300",
  };

  const renderButton = () => {
    if (variant === "Gradient Border") {
      return (
        <button className={styles[variant]}>
          <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50 dark:group-hover:shadow-lg dark:group-hover:shadow-cyan-500/50"></div>
          <div className="relative text-sm inline-flex items-center justify-center bg-white px-8 py-3 font-normal dark:text-white dark:bg-black border border-transparent rounded-full">
            {text}
          </div>
        </button>
      );
    }

    if (variant === "Cyber") {
      return (
        <button className={styles[variant]}>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          <span className="relative z-10 flex items-center justify-center">
            {text}
          </span>
        </button>
      );
    }

    return (
      <button className={styles[variant] || styles["Shadow"]}>{text}</button>
    );
  };

  return renderButton();
};

export default Button;
