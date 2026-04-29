"use client";

import { useLayoutEffect } from "react";

export function ScrollToTopOnReload() {
  useLayoutEffect(() => {
    const [entry] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    const isReload =
      entry?.type === "reload" ||
      // Fallback for browsers that still expose the legacy navigation API.
      (typeof performance !== "undefined" &&
        "navigation" in performance &&
        // @ts-expect-error legacy API support check
        performance.navigation?.type === 1);

    if (!isReload) return;

    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const resetToTop = () => {
      window.scrollTo(0, 0);
    };

    resetToTop();
    const frame = window.requestAnimationFrame(resetToTop);
    const timeout = window.setTimeout(resetToTop, 0);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  return null;
}
