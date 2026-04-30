"use client";

import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";

interface AnimatedSectionProps extends PropsWithChildren {
  delay?: number;
}

export function AnimatedSection({ children, delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className="premium-surface p-6 sm:p-8 space-y-3"
    >
      {children}
    </motion.div>
  );
}
