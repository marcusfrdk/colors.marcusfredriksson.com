import { useEffect } from "react";

const isClient = () =>
  typeof window !== "undefined" && typeof document !== "undefined";

/**
 * A simple hook to calculate the height of the viewport.
 * Useful for browsers with an overlay menu such as
 * Google Chrome or Safari.
 * @returns undefined
 */
const useHeight = () => {
  useEffect(() => {
    const onResize = () => {
      if (isClient()) {
        document.documentElement.style.setProperty(
          "--viewport-height",
          `${window.innerHeight}px`
        );
      }
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return undefined;
};

export default useHeight;
