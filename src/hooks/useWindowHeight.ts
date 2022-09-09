import { useEffect, useState } from "react";

export default function useWindowHeight() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const onResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return windowHeight;
}
