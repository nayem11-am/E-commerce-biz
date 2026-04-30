import type { Variants } from "framer-motion";

export function slideInLeft(isMobile: boolean): Variants {
  return {
    hidden: { opacity: 0, y: 15, x: isMobile ? 0 : -10 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: isMobile ? 0.4 : 0.5,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };
}

export function staggerContainer(isMobile: boolean): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isMobile ? 0.04 : 0.08,
        delayChildren: 0.02,
      },
    },
  };
}

export const inViewOnce = {
  once: true,
  amount: 0.1,
} as const;
