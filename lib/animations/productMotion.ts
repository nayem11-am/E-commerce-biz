import type { Variants } from "framer-motion";

export function slideInLeft(isMobile: boolean): Variants {
  return {
    hidden: { opacity: 0, x: isMobile ? 0 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: isMobile ? 0.25 : 0.32,
        ease: "easeOut",
      },
    },
  };
}

export function staggerContainer(isMobile: boolean): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isMobile ? 0 : 0.06,
        delayChildren: isMobile ? 0 : 0.04,
      },
    },
  };
}

export const inViewOnce = {
  once: true,
  amount: 0.1,
} as const;
