import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
  const topMenuHeight = document.getElementById("topMenu")?.offsetHeight ?? 0;
  const pageTabBarHeight = document.getElementById("pageTabBar")?.offsetHeight ?? 0;
  const pageHeight = windowHeight - (topMenuHeight + pageTabBarHeight);

  return {
    windowWidth,
    windowHeight,
    topMenuHeight,
    pageTabBarHeight,
    pageHeight,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
