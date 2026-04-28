"use client";

import { useEffect } from "react";

export function ScrollToTopOnReload() {
  useEffect(() => {
    const [entry] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    const isReload = entry?.type === "reload";

    if (isReload) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

  return null;
}
