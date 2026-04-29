import type { Variants } from "framer-motion";

export function slideInLeft(isMobile: boolean): Variants {
  const xDistance = isMobile ? -18 : -30;

  return {
    hidden: { opacity: 0, x: xDistance },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: isMobile ? 0.2 : 0.32,
        ease: [0.22, 1, 0.36, 1],
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
  amount: 0.18,
} as const;
