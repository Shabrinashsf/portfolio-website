"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import { useEffect } from "react";

export default function ThemeTransition() {
  const { transitioning, transitionTarget, finishTransition } = useTheme();

  useEffect(() => {
    if (!transitioning) return;
    const timer = setTimeout(() => {
      finishTransition();
    }, 2200);
    return () => clearTimeout(timer);
  }, [transitioning, finishTransition]);

  const message = transitionTarget === "light" ? "Welcome To White Space" : "Welcome To Black Space";
  const imageSrc = transitionTarget === "light" ? "/img/white-space.jpg" : "/img/black-space.jpg";
  const bgColor = transitionTarget === "light" ? "#FDF8F2" : "#131317";
  const textColor = transitionTarget === "light" ? "#131317" : "#FDF8F2";

  return (
    <AnimatePresence>
      {transitioning && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: bgColor }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <motion.div
            className="relative w-32 h-32 rounded-full overflow-hidden mb-6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={imageSrc}
              alt={message}
              fill
              className="object-cover"
              sizes="128px"
            />
          </motion.div>
          <motion.h1
            className="font-[Outfit] text-3xl md:text-5xl font-bold tracking-wide"
            style={{ color: textColor }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {message}
          </motion.h1>
          <motion.div
            className="mt-4 w-12 h-[2px] rounded-full"
            style={{ backgroundColor: textColor, opacity: 0.4 }}
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}