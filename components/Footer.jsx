"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const linkGroups = [
    {
      title: "Pages",
      links: [
        { name: "Home", href: "/" },
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Contact", href: "/contact" },
        { name: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Socials",
      links: [
        { name: "Facebook", href: "https://facebook.com" },
        { name: "Instagram", href: "https://instagram.com" },
        { name: "Twitter", href: "https://twitter.com" },
        { name: "LinkedIn", href: "https://linkedin.com" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
      ],
    },
  ];

  return (
    <footer className="border-t border-gray-200 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-6 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
        >
          <motion.div variants={item} className="md:col-span-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="font-bold text-xl text-neutral-800 flex items-center">
                <span className="relative">NextPress</span>
              </div>
            </Link>
            <motion.p variants={item} className="mt-4 text-sm text-gray-500">
              © copyright GenV 2025. All rights reserved.
            </motion.p>
          </motion.div>

          {linkGroups.map((group, idx) => (
            <motion.div
              key={group.title}
              variants={item}
              className="md:col-span-1"
            >
              <h3 className="font-medium text-neutral-700 mb-4 relative">
                {group.title}{" "}
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-amber-800/40 via-transparent to-transparent"
                  initial={{ width: 0 }}
                  whileInView={{ width: "50%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <motion.li key={link.name} variants={item}>
                    <Link
                      href={link.href}
                      className="text-gray-500 hover:text-neutral-700 transition-colors duration-200 text-sm flex items-center group"
                    >
                      {link.name}
                      <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 -translate-y-1 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:translate-y-0 transition-all duration-200" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="flex items-center justify-center pointer-events-none select-none opacity-[0.1] dark:opacity-[0.03]">
        <span className="text-[10vw] font-bold bg-gradient-to-r from-neutral-800 via-amber-800 to-amber-800/40 bg-clip-text text-transparent">
          NextPress
        </span>
      </div>
    </footer>
  );
}
