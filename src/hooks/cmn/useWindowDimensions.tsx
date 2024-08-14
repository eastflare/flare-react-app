import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;

  const topMenuHeight = document.getElementById("topMenu")?.offsetHeight ?? 0;
  const topPageBarHeight = document.getElementById("topBar")?.offsetHeight ?? 0;
  const bodyHeight = windowHeight - (topMenuHeight + topPageBarHeight);

  return {
    windowWidth,
    windowHeight,
    topMenuHeight,
    topPageBarHeight,
    bodyHeight,
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
